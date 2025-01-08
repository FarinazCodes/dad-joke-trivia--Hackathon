const triviaGkAPI = "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=boolean";  //GK
const triviaMusicAPI = "https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=boolean";// Music
const triviaScienceAPI = "https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=boolean";  //Science
const dadJoke = "https://icanhazdadjoke.com/";

const queryString = window.location.search;               //search url querystring
const urlParams = new URLSearchParams(queryString);      //get parameters of url 
let cat=urlParams.get('category');
console.log(cat);


const btns=document.querySelector(".card__buttons");
const moreJokes = document.getElementById("more-jokes");
const trueButton = document.getElementById ("true-button");
const falseButton = document.getElementById ("false-button");
const trueCount =document.querySelector(".message");
const questionEl = document.getElementById("question");
let true_ans="";

async function getData(){
    try{
        const response = await axios.get(triviaGkAPI);
        const result =response.data.results;
        console.log(result);
        displayQuestion(result);
    }catch(error){
        console.log(error);
        questionEl.textContent="⚠️ Free API, Max attempt reached, Choose another category" ;
        questionEl.classList.add("error");
        btns.classList.add("card__button--joke");        
        trueCount.textContent=" ";
    }
}

async function getMusicData(){
    try{
        const response = await axios.get(triviaMusicAPI);
        const result =response.data.results;
        console.log(result);
        displayQuestion(result);
    }catch(error){
        console.log(error);
        questionEl.textContent="⚠️ Free API, Max attempt reached, Choose another category" ;
        questionEl.classList.add("error");
        btns.classList.add("card__button--joke");
        trueCount.textContent=" ";
    }
}

async function getScienceData(){
    try{
        const response = await axios.get(triviaScienceAPI);
        const result =response.data.results;
        console.log(result);
        displayQuestion(result);
    }catch(error){
        console.log(error);
        questionEl.textContent="⚠️ Free API, Max attempt reached, Choose another category" ;
        questionEl.classList.add("error");
        btns.classList.add("card__button--joke");
        trueCount.textContent=" ";
    }
}

function displayQuestion(result){
    questionEl.classList.remove("error");
    questionEl.classList.remove("card__center");
    btns.classList.remove("card__button--joke");
    for(let i=0; i<result.length; i++){
        const ques = result[i].question;
        true_ans = result[i].correct_answer;
        questionEl.textContent = ques;
    }
}

function getCategory(cat){
    if(cat=="gk"){
        console.log("gk running");
    getData();
    }
    else if (cat=="music"){
        console.log("music running");
        getMusicData();
    }
    else if(cat=="science"){
        console.log("science running");
        getScienceData();
    }
}
getCategory(cat);

async function getDadJoke() {
    try{
        const response = await axios.get(dadJoke, {
        headers:{Accept: "text/plain"}
        });
        console.log(response.data);
        questionEl.classList.add("card__center");
        questionEl.textContent="🎉🎉" +response.data + "🎉🎉";
        btns.classList.add("card__button--joke");
    }catch(error){
        console.log(error);
    }
}
trueButton.addEventListener  ("click", clickhandler);
falseButton.addEventListener  ("click", clickhandler);


function clickhandler(event){
    event.preventDefault();    
    trueCount.textContent=" ";
    const selectAnswer = event.target.value;
    console.log(event.target.value);
    console.log("line 40" + true_ans)
    if(selectAnswer == true_ans){
        trueCount.textContent="✅ Here is your Dad joke";
        getDadJoke();
        moreJokes.classList.remove("card__button--joke");
    }        
    else{
        trueCount.textContent="Ah oh! Wrong Answer, Try Again";
        getCategory(cat);
        moreJokes.classList.add("card__button--joke");
    }
}

function jokesHandler(event){
    event.preventDefault();       
    trueCount.textContent=" ";   
    getCategory(cat);
    btns.classList.remove("card__button--joke");
    moreJokes.classList.add("card__button--joke");
}
moreJokes.addEventListener("click",jokesHandler);





