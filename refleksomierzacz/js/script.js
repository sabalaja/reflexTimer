const colors = ['ff5733', '33ffa2', '3393ff', 'ff337a', '0e7658'];
let clickStart;
let clickStop;
let thisColor;
const reactionTimeArr = [];



function start() {
    document.getElementById('stopBtn').style.visibility = "visible";
    document.getElementById('startBtn').style.visibility = "hidden";
    colors.forEach(color => {
        setTimeout(function() {
            clickStart = {color, timeStart: Date.now()};
            thisColor = color;
            document.getElementById('mainContainer').style.backgroundColor = `#${color}`;
        }, Math.random()*10000);

    });


    // setTimeout(() => {

    //     document.getElementById("fastestScore").innerText = getTheFastest();
    //     document.getElementById("averageScore").innerText = getAverage();
    //     document.getElementById("slowestScore").innerText = getTheSlowest();
    // })
    console.log('tu')
}

function containerClick() {
    if(!thisColor) {
        alert("Poczekaj na kolor");
        return;
    }
    clickStop = Date.now();
    console.log('click', thisColor, clickStart)
    let reactionTime = clickStop - clickStart.timeStart; 
    reactionTimeArr.push(reactionTime);
    console.log('reaction time', reactionTime, reactionTimeArr);
}

function getTheFastest() {
    return `${Math.min(reactionTimeArr)}`;
}

function getAverage() {
    return `${reactionTimeArr.reduce((acc, n) => (acc+n/reactionTimeArr.length))}`;
}

function getTheSlowest() {
    return `${Math.max(reactionTimeArr)}`;
}

function stop() {
    document.getElementById('startBtn').style.visibility = "visible";
    document.getElementById('stopBtn').style.visibility = "hidden";
}
