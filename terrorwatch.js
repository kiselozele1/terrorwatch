let timer, terrorTimer, problem;
let isRunning = false;
let seconds = 0, minutes = 0, hours = 0;
let currTerror = 0;
let environment = 'normal';

const display = document.getElementById("display");
let terrorP = document.getElementById('terror')
terrorP.textContent = currTerror;
const environmentBtns = Array.from(document.querySelectorAll('.environments button'))
const additionBtns = Array.from(document.querySelectorAll('.additions'))
const reductorBtns = Array.from(document.querySelectorAll('.reductors'))

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
for (const btn of environmentBtns) {
    btn.addEventListener('click', () => changeEnvironment(btn))
}
for (const btn of additionBtns) {
    btn.addEventListener('click', () => addTerror(btn))
}
for (const btn of reductorBtns) {
    btn.addEventListener('click', () => reduceTerror(btn))
}


function updateDisplay() {
    let formattedTime = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
    display.textContent = formattedTime;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    clearInterval(terrorTimer)
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    clearInterval(terrorTimer);
    clearInterval(problem);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    currTerror = 0;
    terrorP.textContent = currTerror;
    terrorP.style.fontWeight = 'normal';
    terrorP.style.fontSize = '2rem';
    terrorP.style.color = 'white'
    updateDisplay();
}

function changeEnvironment(btn) {
    environment = btn.textContent.toLowerCase()
    clearInterval(terrorTimer)
    
    let intervalTime;
    if(environment === 'normal') {
        intervalTime = 600*1000
    } else if(environment === 'eerie') {
        intervalTime = 300*1000
    } else if(environment === 'caligo') {
        intervalTime = 20*1000
    }

    if(intervalTime) {
        terrorTimer = setInterval(() => {
            if(isRunning) {
                currTerror++;
                if(currTerror > 100) {
                    currTerror = 100
                }
                terrorP.textContent = currTerror; 
            }
        }, intervalTime)
    }

}

function addTerror(btn) {
    const ev = btn.id;

    if(ev === 'good-fight') {
        currTerror += 5;
    } else if (ev === 'bad-fight') {
        currTerror += 10
    }  else if (ev === 'misc1') {
        currTerror += 5
    }  else if (ev === 'misc2') {
        currTerror += 10
    }

    if(currTerror > 100) {
        currTerror = 100
    }

    terrorP.textContent = currTerror
    checkTerror(currTerror)
}

function reduceTerror(btn) {
    const ev = btn.id;
    console.log(ev)

    if(ev === 'talk') {
        currTerror -= 5;
    } else if (ev === 'comfort') {
        currTerror -= 10
    }  else if (ev === 'heal') {
        currTerror -= 10
    }  else if (ev === 'eat') {
        currTerror -= 5
    } else if (ev === 'city') {
        currTerror -= 10
    } else if (ev === 'pill') {
        currTerror -= 20
    }

    if(currTerror < 0) {
        currTerror = 0
    }
    terrorP.textContent = currTerror;

    checkTerror(currTerror);
}

function checkTerror(currTerror) {
    clearInterval(problem);

    if(isRunning && currTerror >= 70 && currTerror <= 75 || isRunning && currTerror >= 90 && currTerror <= 95) {
        problem = setInterval(() => {
            let currColor = window.getComputedStyle(terrorP).color
            terrorP.style.fontWeight = 'bold';
            terrorP.style.fontSize = '4rem'
            terrorP.style.color = (currColor === 'rgb(255, 0, 0)') ? 'white' : 'red';
        }, 300)
    } else {
        clearInterval(problem);
        terrorP.style.color = 'white';
        terrorP.style.fontWeight = 'normal'
        terrorP.style.fontSize = '2.5rem'
    }
}


checkTerror(currTerror);
updateDisplay();
