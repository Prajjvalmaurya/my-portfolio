let userscore=0;
let computerscore=0;
let options = document.querySelectorAll(".option");
let msgpara=document.querySelector("#msg");
let usrcore=document.querySelector("#user-score");
let compscore=document.querySelector("#computer-score");

let gencomputerchoice=()=>{
    let choices=["rock","paper","scissor"];
    const randomidx=Math.floor(Math.random()*3);
    return choices[randomidx];
}


let drawGame=()=>{
    console.log("the game was draw");
    msgpara.textContent="the game was draw.play again";
    msgpara.style.backgroundColor="indigo";
}

let showWinner=(userwin,useroption,computerchoice)=>{
    if (userwin) {
        userscore++;
        usrcore.textContent=userscore;
        console.log("you win");
        msgpara.textContent=`you win👍your ${useroption} beats ${computerchoice}`;
        msgpara.style.backgroundColor="green";
    } else {
        computerscore++;
        compscore.textContent=computerscore
       console.log("you lose");
       msgpara.textContent=`you lose👎your ${useroption} beaten by ${computerchoice}`;
       msgpara.style.backgroundColor="red";
    }
}

const playgame = (useroption)=>{
    console.log("user option =",useroption);
    // to generate computer options
    let computerchoice=gencomputerchoice();
    console.log("computer choice=",computerchoice);
    if(useroption===computerchoice){
        //then the game is draw
        drawGame();
    }
    else{
        let userwin=true;
        if(useroption==="rock"){
            //the computer choice will be scissor or paper now you will think what if computer choice will rock we have already done about this code about okkkkk
            userwin=computerchoice==="paper"? false:true;
        }
        else if(useroption==="paper"){
            userwin=computerchoice==="scissor"? false:true;
        }
        else{
            userwin=computerchoice==="rock"? false:true;
        }
        showWinner(userwin,useroption,computerchoice);
    }
};


options.forEach((option)=>{
    option.addEventListener("click",()=>{
        const useroption= option.getAttribute("id");
        playgame(useroption);
    });
});