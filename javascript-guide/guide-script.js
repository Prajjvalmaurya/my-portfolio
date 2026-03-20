// Project 1: Calculator
function calculate() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let sum = num1 + num2;
    document.getElementById("calcOutput").textContent = "Sum: " + sum;
}

// Project 2: Todo List
function addTodo() {
    let input = document.getElementById("todoInput");
    let list = document.getElementById("todoList");
    let li = document.createElement("li");
    li.textContent = input.value;
    li.onclick = function() { this.remove(); };
    list.appendChild(li);
    input.value = "";
}

// Project 3: Quote Generator
let quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
];
function generateQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById("quoteOutput").textContent = quotes[randomIndex];
}

// Project 4: Weather App (Mock)
function getWeather() {
    let city = document.getElementById("cityInput").value;
    // Mock weather data
    let weather = {
        temperature: Math.floor(Math.random() * 30) + 10,
        condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)]
    };
    document.getElementById("weatherOutput").innerHTML = 
        `Weather in ${city}: ${weather.temperature}°C, ${weather.condition}`;
}

// Project 5: Number Guessing Game
let secretNumber = Math.floor(Math.random() * 100) + 1;
function checkGuess() {
    let guess = parseInt(document.getElementById("guessInput").value);
    let output = document.getElementById("guessOutput");
    if (guess === secretNumber) {
        output.textContent = "Correct! You win!";
    } else if (guess < secretNumber) {
        output.textContent = "Too low!";
    } else {
        output.textContent = "Too high!";
    }
}

// Project 6: Drawing App
document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.getElementById("canvas");
    if (canvas) {
        let ctx = canvas.getContext("2d");
        let drawing = false;

        canvas.addEventListener("mousedown", () => drawing = true);
        canvas.addEventListener("mouseup", () => drawing = false);
        canvas.addEventListener("mousemove", draw);

        function draw(e) {
            if (!drawing) return;
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#000";
            ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        }

        window.clearCanvas = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }
});