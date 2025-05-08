const colors = [
    'ff5733', '33ffa2', '3393ff', 'ff337a', '0e7658',
    'f1c40f', '8e44ad', '1abc9c', 'e67e22', '2ecc71',
    'e74c3c', '3498db', '9b59b6', '16a085', 'f39c12'];
let clickStart;
let clickStop;
let thisColor = null;
let clickCounts = 0;
const reactionTimeArr = [];
let isColorShown = false;
let stopped = false;
let colorTimeout = null;
let clickLimit = 5;
let previousColorIndex = -1;

document.getElementById('counter').addEventListener('input', handleClickLimitChange);

function handleClickLimitChange(event) {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
        clickLimit = value;
        alert(`Liczba kliknięć została ustawiona na ${clickLimit}`);
    } else {
        clickLimit = 5;
        event.target.value = clickLimit;
        alert("Niepoprawna wartość. Ustawiono domyślną wartość 5.");
    }
}

function getRandomColor() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * colors.length);
    } while (newIndex === previousColorIndex);
    previousColorIndex = newIndex;
    return colors[newIndex];
}

function start() {
    document.getElementById('game-is-over').style.visibility = "hidden";
    document.getElementById('stopBtn').style.visibility = "visible";
    document.getElementById('startBtn').style.visibility = "hidden";
    stopped = false;
    clickCounts = 0;
    reactionTimeArr.length = 0;
    showColorAfterDelay();
}

function showColorAfterDelay() {
    if (clickCounts >= clickLimit || stopped) return;

    colorTimeout = setTimeout(() => {
        const randomColor = getRandomColor();
        document.getElementById('mainContainer').style.backgroundColor = `#${randomColor}`;
        clickStart = Date.now();
        thisColor = randomColor;
        isColorShown = true;
    }, Math.random() * 1000);
}

function containerClick() {
    if (!isColorShown || stopped) {
        alert("Poczekaj na kolor");
        return;
    }

    clickStop = Date.now();
    const reactionTime = clickStop - clickStart;
    reactionTimeArr.push(reactionTime);

    isColorShown = false;
    clickStart = 0;
    clickStop = 0;
    thisColor = null;
    clickCounts++;

    if (clickCounts < clickLimit && !stopped) {
        showColorAfterDelay();
    } else if (clickCounts >= clickLimit) {
        showResults();
        document.getElementById('game-is-over').style.visibility = "visible";
        document.getElementById('startBtn').style.visibility = "visible";
        document.getElementById('stopBtn').style.visibility = "hidden";
    }
}

function showResults() {
    document.getElementById("fastestScore").innerText = getTheFastest();
    document.getElementById("averageScore").innerText = getAverage();
    document.getElementById("slowestScore").innerText = getTheSlowest();
}

function getTheFastest() {
    return `${Math.min(...reactionTimeArr)} ms`;
}

function getAverage() {
    const sum = reactionTimeArr.reduce((acc, n) => acc + n, 0);
    return `${(sum / reactionTimeArr.length).toFixed(2)} ms`;
}

function getTheSlowest() {
    return `${Math.max(...reactionTimeArr)} ms`;
}

function stop() {
    stopped = true;
    clearTimeout(colorTimeout);
    document.getElementById('startBtn').style.visibility = "visible";
    document.getElementById('stopBtn').style.visibility = "hidden";
    document.getElementById('mainContainer').style.backgroundColor = "#ffffff";
    document.getElementById('game-is-over').style.visibility = "visible";
    isColorShown = false;
    thisColor = null;
    clickStart = 0;
    clickStop = 0;
}
