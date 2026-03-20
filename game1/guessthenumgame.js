console.log("this is the game to get win you have to guess and enter the exact no. to win the game");
console.log("now you can enter the no. to get winning chance");
alert("this is the game to get win you have to guess and enter the exact no. to win the game");
alert("now you can enter the no. from 0 to 50 to get winning chance");
let usernum = 21;
let pro = prompt("guess the number:");
while (pro!=usernum) {
    pro=prompt("you have entered wrong number guess again please:");
}
console.log("you have enterd the exact number",pro);
alert("you win the game");