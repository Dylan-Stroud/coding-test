var questionArr = [

    {
        question: "What is the most popular coding language in the world?",
        selection: ["Java", "JavaScript", "C#", "Python"],
        answer: "JavaScript"

    },
    {
        question: "Who created the first computer and where?",
        selection: ["F.C. Williams & Tom Kilburn' at Manchester University", "Charles Babbage in London", "John Mauchly at the University of Pennsylvania", "Ada Lovelace in London"],
        answer: "John Mauchly at the University of Pennsylvania"


    },
    {
        question: "What is my favourite Coding Language?",
        selection: ["Java", "C", "Python", "JavaScript"],
        answer: "Java" 


    },
    {
        question: "How do you link a JavaScript file to HTML?",
        selection: ['<script src="script.js"></script>', '<script src="style.cc"></script>','<script src="wingingit,js"></script>','Hello World :)'],
        answer: '<script src="script.js"></script>'

    }
];




var startQuiz = document.querySelector("#startBtn");
var startContainer = document.querySelector("#startCont");
var highScores = document.querySelector("#hscoreBtn");
var gamePane = document.querySelector("#gamePane");
var question = document.querySelector("#question");
var ans1 = document.querySelector("#ans1");
var ans2 = document.querySelector("#ans2");
var ans3 = document.querySelector("#ans3");
var ans4 = document.querySelector("#ans4");
var ansBtn = document.querySelector("#ansBtn");
var hsPane = document.querySelector("#highScorePane");
var hsList = document.querySelector("#hsList");
var hsBtn = document.querySelector("#hscoreBtn");
var timerDisp = document.querySelector("#timerDisp");
var validity = document.querySelector("#validity");
var mainWindow = document.querySelector(".mainWindow");
var mainHeader = document.querySelector("#mainHeader");
var answerBtn = document.querySelector("#ansBtn")
var radios = document.getElementsByTagName('input');
var labels = document.getElementsByTagName('label');
var submitBtn = document.querySelector("#submit");
var initials = document.querySelector("#initials");
var homeBtn = document.querySelector("#home");


var timeLeft = questionArr.length*5;
var timeInterval;
var q = 0;
var score = 0;


// Timer for quiz
function timer() {
    mainHeader.textContent = "Timer: " + timeLeft;
    timeInterval = setInterval(function () {
      timeLeft--;
      mainHeader.textContent = "Timer: " + timeLeft;
  
      if (timeLeft === 0 || q >= questionArr.length) {
        clearInterval(timeInterval);
        gameOver();
      }
    }, 1000);
  }

//display questions from question array
function displayQuestions(){

    if( q < questionArr.length ) {
        question.textContent = questionArr[q].question;
        ans1.textContent = questionArr[q].selection[0];
        ans2.textContent = questionArr[q].selection[1];
        ans3.textContent = questionArr[q].selection[2];
        ans4.textContent = questionArr[q].selection[3];
    }else{
        gameOver();
    }
}
// answer check query
function checkAns(event){
    console.log(event);
    if (q >= questionArr.length){
        gameOver();
        clearInterval(timeInterval);
    } else{
        if(event === questionArr[q].answer){
            timeLeft += 5;
            validity.textContent = "Correct!"
        } else{ 
            timeLeft -= 10;
            validity.textContent = "Incorrect! Try Again!";
        }
        score = timeLeft;
        q++;
        displayQuestions();
    }

}

// Getter Method for score
function getScore(){
    var totalScore = JSON.parse(localStorage.getItem("highScore"));
    if (totalScore !== null){
        scoreList = totalScore;
    }

}

// Save Scores to local File
function saveScore(){
    localStorage.setItem("highScore", JSON.stringify(scoreList));

}

//gameover function changes the state of the game from menu to game to highscore
function gameOver(){
    gamePane.style.display = "none";
    hsPane.style.display = "inline-block";
    
    if(score > 0){
        mainHeader.textContent = "Congratulations! Your Score was: " + score;
    }else{
        mainHeader.textContent = "BOO! Your Score was: " + score;
    }

}

//shows HighScore page
function showHS(){
    mainWindow.style.display = "inline-block";
    startContainer.style.display = "none";
    gamePane.style.display = "none";
    hsPane.style.display = "inline-block";
    score = 0;  
    
   
    

}

//function for calling and recording the leaderboard from storage
function getLeaderBoard(){
    removeFromLeaderBoard();
    addToLeaderBoard();
    scoreList.sort((a,b)=>{

        return b.score-a.score;
    });

    topScorers = scoreList.slice(0,10);

    for(var i = 0; i < topTen.length; i++){
        var gamer = topScorers[i].gamer;
        var score = topScorers[i].score;

        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(gamer + ", " + score));
        hsList.appendChild(entry);       
    }
}
function addToLeaderBoard(score){
    var gamer = initials.value;
    

    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(gamer + ", " + score));
    hsList.appendChild(entry);    
}

function removeFromLeaderBoard(){

}

function returnToHome(){
    startContainer.style.display = "flex";
    gamePane.style.display = "none";
    mainWindow.style.display = "none";
    hsPane.style.display = "none";
    hsBtn.style.display = "inline-block";
    initials.value = "";
    mainHeader.textContent = "Welcome To The Coding Quiz!";

}


// Event listeners
startQuiz.addEventListener('click', function (event) {
    
    
    timeLeft = questionArr.length*5;
    timeInterval;
    q = 0;
    score = 0;  
    console.log("Hi there");
    
    startContainer.style.display = "none";
    gamePane.style.display = "inline-block";
    mainWindow.style.display = "inline-block";
    timer();
    displayQuestions();
    
    hsBtn.style.display = "none";
    
  });

answerBtn.addEventListener('click', function (event) {

    for (var i = 0;i<radios.length;i++){
        if (radios[i].type === 'radio' && radios[i].checked){
            var event = labels[i].textContent;
            console.log("event: " + event);
        }
    }
    
    
    checkAns(event);
  });
submitBtn.addEventListener('click', function (event) {
    addToLeaderBoard(score);
    
  });
homeBtn.addEventListener('click', function (event) {
    

    returnToHome();

    
});
hsBtn.addEventListener('click', function (event) {
    showHS();
    
});
  
  




