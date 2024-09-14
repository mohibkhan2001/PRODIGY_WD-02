let minutes = 0, seconds = 0, milliseconds = 0;
let timerInterval;
let isRunning = false;

const minsDisplay = document.querySelector('.mins');
const secsDisplay = document.querySelector('.sec');
const msecsDisplay = document.querySelector('.msec');
const lapsList = document.getElementById('laps-list');
const lapsSection = document.querySelector('.wrapper2'); // Select laps section

const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const resetBtn = document.querySelector('.reset-btn');
const lapBtn = document.querySelector('.lap-btn');

function updateDisplay() {
    minsDisplay.textContent = minutes < 10 ? `0${minutes}: ` : `${minutes}: `;
    secsDisplay.textContent = seconds < 10 ? `0${seconds}: ` : `${seconds}: `;
    msecsDisplay.textContent = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
}

function startStopwatch() {
    if (!isRunning) {
        timerInterval = setInterval(() => {
            milliseconds += 1;
            if (milliseconds >= 100) {
                milliseconds = 0;
                seconds += 1;
            }
            if (seconds >= 60) {
                seconds = 0;
                minutes += 1;
            }
            updateDisplay();
        }, 10);
        isRunning = true;

        // Disable the Start and Lap buttons when running
        startBtn.disabled = true;
        lapBtn.disabled = true;

        pauseBtn.disabled = false;
        resetBtn.disabled = false;
    }
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;

    // Enable Start (Resume) and Lap buttons when paused
    startBtn.disabled = false;
    lapBtn.disabled = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapsList.innerHTML = ''; // Clear all recorded laps

    startBtn.textContent = 'Start';
    startBtn.disabled = false; // Enable Start button
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;

    // Hide laps section on reset
    lapsSection.style.display = 'none';
}

function recordLap() {
    const lapTime = `${minutes < 10 ? '0' + minutes : minutes}:${
        seconds < 10 ? '0' + seconds : seconds
    }:${milliseconds < 10 ? '0' + milliseconds : milliseconds}`;
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `Lap: <span>${lapTime}</span>`;
    lapsList.appendChild(lapItem);

    // Show the laps section when a lap is recorded
    lapsSection.style.display = 'block';
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);