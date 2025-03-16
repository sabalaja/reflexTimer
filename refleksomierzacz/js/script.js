const colors = ['ff5733', '33ffa2', '3393ff', 'ff337a', '0e7658'];
let clickStart;
let clickStop;
let thisColor;
let clickCounts = 0;
const timeCollection = new Map();
const reactionTimeArr = [];



function start() {
    document.getElementById('stopBtn').style.visibility = "visible";
    document.getElementById('startBtn').style.visibility = "hidden";
    setTimeout(function() {
        document.getElementById('mainContainer').style.backgroundColor = `#${colors[clickCounts]}`;
        clickStart = Date.now();
        clickCounts++;
        thisColor = colors[clickCounts];
        console.log('clickcounta', clickCounts)
        if (clickCounts===5) {
            document.getElementById("fastestScore").innerText = getTheFastest();
            document.getElementById("averageScore").innerText = getAverage();
            document.getElementById("slowestScore").innerText = getTheSlowest();
        }
    }, Math.random()*1000);
}

// do kazdego czasu dajemy poczatek przy zmianie i klikniecie pozniej 
// flaga po zmianie koloru 
// ustawianie timeout po kliknieciu

function containerClick() {
    if(!thisColor) {
        alert("Poczekaj na kolor");
        return;
    }

    clickStop = Date.now();
    let reactionTime = clickStop - clickStart; 
    reactionTimeArr.push(reactionTime);
    clickStart = 0;
    clickStop = 0;
    setTimeout(function() {
        document.getElementById('mainContainer').style.backgroundColor = `#${colors[clickCounts]}`;
        clickStart = Date.now();
        thisColor = colors[clickCounts];
        clickCounts++;
        console.log('clickcount', clickCounts)
        if (clickCounts>=5) {
            document.getElementById("fastestScore").innerText = getTheFastest();
            document.getElementById("averageScore").innerText = getAverage();
            document.getElementById("slowestScore").innerText = getTheSlowest();
        }
    }, Math.random()*1000);
    
}

function getTheFastest() {
    return `${Math.min(...reactionTimeArr)}`;
}

function getAverage() {
    return `${reactionTimeArr.reduce((acc, n) => (acc+n/reactionTimeArr.length))}`;
}

function getTheSlowest() {
    return `${Math.max(...reactionTimeArr)}`;
}

function stop() {
    document.getElementById('startBtn').style.visibility = "visible";
    document.getElementById('stopBtn').style.visibility = "hidden";
}
