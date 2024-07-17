let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let running = false;

const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

function startStop() {
    if (!running) {
        timer = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
    } else {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    running = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    startStopButton.textContent = 'Start';
    lapsList.innerHTML = '';
}

function lap() {
    const lapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
}

function updateTime() {
    milliseconds += 1;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds += 1;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }
    if (minutes === 60) {
        minutes = 0;
        hours += 1;
    }
    updateDisplay();
}

function updateDisplay() {
    hoursDisplay.textContent = pad(hours);
    minutesDisplay.textContent = pad(minutes);
    secondsDisplay.textContent = pad(seconds);
    millisecondsDisplay.textContent = pad(milliseconds, 2);
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
