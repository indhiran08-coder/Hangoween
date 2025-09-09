const words = [
    { word: "pumpkin", hint: "A round orange fruit associated with Halloween" },
    { word: "vampire", hint: "A creature that drinks blood and avoids sunlight" },
    { word: "zombie", hint: "A reanimated corpse that craves brains" },
    { word: "witch", hint: "A woman with magical powers, often rides a broom" },
    { word: "ghost", hint: "A spirit of the dead, often haunting places" },
    { word: "skeleton", hint: "A framework of bones in a body" },
    { word: "cobweb", hint: "A spider's web, often seen in haunted houses" },
    { word: "haunted", hint: "A place visited by ghosts" },
    { word: "bat", hint: "A flying nocturnal creature, often linked to vampires" },
    { word: "graveyard", hint: "A place where the dead are buried" },
    { word: "werewolf", hint: "A human that turns into a wolf during a full moon" },
    { word: "mummy", hint: "A preserved corpse wrapped in bandages" },
    { word: "horror", hint: "A genre of scary movies and books" },
    { word: "lantern", hint: "A light source, often made from a carved pumpkin" },
    { word: "spooky", hint: "Something eerie or frightening" }
];

let selectedWord = "";
let hintText = "";
let guessedLetters = [];
let incorrectGuesses = 0;
let score = 0;

const wordDisplay = document.querySelector(".word-display");
const keyboard = document.querySelector(".keyboard");
const message = document.querySelector(".message");
const hintElement = document.getElementById("hint-text");
const resetBtn = document.getElementById("reset-btn");
const figureParts = document.querySelectorAll(".figure-part");
const scoreDisplay = document.createElement("div");
scoreDisplay.classList.add("score");
document.querySelector(".game-container").appendChild(scoreDisplay);

const backgroundMusic = new Audio();
const winSound = new Audio("win.mp3");     // ✅ Win sound
const loseSound = new Audio("lose.mp3");   // ✅ Lose sound

backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
winSound.volume = 1;
loseSound.volume = 1;

function updateScore() {
    scoreDisplay.textContent = `🎯 Score: ${score}`;
}

function setupGame() {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => console.log("Autoplay blocked:", error));
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word;
    hintText = words[randomIndex].hint;
    
    guessedLetters = [];
    incorrectGuesses = 0;

    wordDisplay.innerHTML = selectedWord
        .split("")
        .map(() => `<span class="letter"></span>`)
        .join("");
    
    keyboard.innerHTML = "abcdefghijklmnopqrstuvwxyz"
        .split("")
        .map(
            letter => `<button class="key" onclick="handleGuess('${letter}')">${letter}</button>`
        )
        .join("");

    message.textContent = "";
    hintElement.textContent = hintText;
    updateScore();

    figureParts.forEach(part => part.style.display = "none");

    resetBtn.disabled = true;
}

function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);

        const letters = document.querySelectorAll(".letter");
        selectedWord.split("").forEach((char, index) => {
            if (char === letter) {
                letters[index].textContent = char;
            }
        });

        if (!document.querySelector(".letter:empty")) {
            score += 10;
            updateScore();
            message.textContent = "🎉 YOU WIN!";
            winSound.play(); // ✅ Play win sound
            disableKeyboard();
            resetBtn.disabled = false;
        }
    } else {
        incorrectGuesses++;
        figureParts[incorrectGuesses - 1].style.display = "block";

        if (incorrectGuesses === figureParts.length) {
            score = 0;
            updateScore();
            message.textContent = `💀 GAME OVER! THE WORD WAS "${selectedWord}".`;
            loseSound.play(); // ✅ Play lose sound
            disableKeyboard();
            resetBtn.disabled = false;
        }
    }

    const button = [...document.querySelectorAll(".key")].find(btn => btn.textContent === letter);
    if (button) {
        button.disabled = true;
    }
}

function disableKeyboard() {
    document.querySelectorAll(".key").forEach(button => (button.disabled = true));
}

resetBtn.addEventListener("click", setupGame);

setupGame();














