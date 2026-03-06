let secretNumber = 0;
let maxAttempts = 3;
let attempts = 0;
let player1Desc = "";
let player2Desc = "";

// ENTER key support
document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        if (document.getElementById("player1-section").style.display !== "none") startGame();
        else if (document.getElementById("player2-section").style.display !== "none") checkGuess();
    }
});

// Hide Player 1 Inputs
function hidePlayer1Inputs() {
    const inputs = [ "secretNumber","hint1","hint2","hint3","description"];
    let allFilled = true;
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el.value === "" && (id === "secretNumber" || id==="hint1" || id==="description")) allFilled = false;
        el.style.display = "none";
    });
    if(allFilled) document.getElementById("hideStatus").innerText = "Done ✅";
}

// Start Game
function startGame() {
    const num = document.getElementById("secretNumber").value;
    const h1 = document.getElementById("hint1").value;
    const h2 = document.getElementById("hint2").value;
    const h3 = document.getElementById("hint3").value;
    const desc = document.getElementById("description").value;

    if (num === "" || h1 === "" || desc === "") {
        document.getElementById("warning1").innerText = "⚠ Secret Number, Hint 1 and Description are required!";
        return;
    }
    document.getElementById("warning1").innerText = "";

    secretNumber = parseInt(num);
    player1Desc = desc;

    document.getElementById("showHint1").innerText = "Hint 1: " + h1;
    document.getElementById("showHint2").innerText = h2 ? "Hint 2: " + h2 : "";
    document.getElementById("showHint3").innerText = h3 ? "Hint 3: " + h3 : "";

    // Show centered loading screen
    document.getElementById("player1-section").style.display = "none";
    document.getElementById("loadingScreen").style.display = "flex";

    const fill = document.getElementById("loadingFill");
    let width = 0;
    const interval = setInterval(() => {
        width += 2;
        fill.style.width = width + "%";
        if(width >= 100) {
            clearInterval(interval);
            document.getElementById("loadingScreen").style.display = "none";
            document.getElementById("player2-section").style.display = "block";
            document.getElementById("chancesLeft").innerText = maxAttempts - attempts;
        }
    }, 100);
}

// Check Guess
function checkGuess() {
    const guessVal = document.getElementById("guessNumber").value;
    if (guessVal === "") {
        document.getElementById("warning2").innerText = "⚠ Please enter a guess!";
        return;
    }
    document.getElementById("warning2").innerText = "";

    const guess = parseInt(guessVal);
    attempts++;
    const remaining = maxAttempts - attempts;
    document.getElementById("chancesLeft").innerText = remaining >= 0 ? remaining : 0;

    // Clear guess input for next chance
    document.getElementById("guessNumber").value = "";

    if (guess === secretNumber) {
        document.getElementById("result").innerText = "🎉 Correct! Player 2 wins!";
        document.getElementById("choiceScreen").style.display = "block";
        document.getElementById("guessNumber").disabled = true;
    } else if (attempts >= maxAttempts) {
        document.getElementById("result").innerText = `❌ Game Over! Number was ${secretNumber}`;
        document.getElementById("choiceScreen").style.display = "block";
        document.getElementById("guessNumber").disabled = true;
    } else {
        document.getElementById("result").innerText = guess > secretNumber ? "📉 Too High!" : "📈 Too Low!";
    }
}

// Player 2 choice to compare
function mindsetChoice(choice) {
    document.getElementById("choiceScreen").style.display = "none";
    if(choice==="no"){
        document.getElementById("result").innerText += "\nCongratulations Player 2!";
        document.getElementById("comparisonScreen").style.display = "block";
        document.getElementById("showDescription1").innerText = player1Desc;
        document.getElementById("showDescription2").innerText = ""; 
        document.getElementById("restartBtn").style.display = "inline-block";
    } else {
        // Show 5s loading then description
        document.getElementById("player2-section").style.display = "none";
        document.getElementById("loadingScreen").style.display = "flex";
        const fill = document.getElementById("loadingFill");
        fill.style.width = "0%";
        let width = 0;
        const interval = setInterval(()=>{
            width += 2;
            fill.style.width = width + "%";
            if(width>=100){
                clearInterval(interval);
                document.getElementById("loadingScreen").style.display = "none";
                document.getElementById("descriptionBox").style.display = "block";
            }
        },100);
    }
}

// Compare mindset
function compareMindset() {
    player2Desc = document.getElementById("player2Desc").value;
    document.getElementById("descriptionBox").style.display = "none";
    document.getElementById("comparisonScreen").style.display = "block";
    document.getElementById("showDescription1").innerText = player1Desc;
    document.getElementById("showDescription2").innerText = player2Desc;
    document.getElementById("restartBtn").style.display = "inline-block";
}

// Restart
function restartGame() {
    location.reload();
}