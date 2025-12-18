const startBtn = document.getElementById('startBtn')
const higherBtn = document.getElementById('higherBtn')
const lowerBtn = document.getElementById('lowerBtn')
const correctBtn = document.getElementById('correctBtn')
const restartBtn = document.getElementById('restartBtn')
const status = document.getElementById('status')
const guessEl = document.getElementById('guess')
const guessBox = document.getElementById('guessBox')
const rangeEl = document.getElementById('range')
const guessesEl = document.getElementById('guesses')
const historyEl = document.getElementById('history')


let currentGuess = null
let guessesCount = 0


function setControlsForRunning(running){
higherBtn.disabled = !running
lowerBtn.disabled = !running
correctBtn.disabled = !running
startBtn.disabled = running
}


startBtn.addEventListener('click', async ()=>{
const res = await fetch('/start', {method:'POST'})
const data = await res.json()
if(data.guess){
currentGuess = data.guess
showGuess(currentGuess.letter)
updateMeta(data.low, data.high, data.history)
setControlsForRunning(true)
status.innerHTML = 'Is your letter <strong>'+currentGuess.letter.toUpperCase()+'</strong> ?'
}
})


async function sendResponse(action){
if(!currentGuess) return
const res = await fetch('/respond', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action: action, guess_index: currentGuess.index})})
const data = await res.json()


if(data.result === 'correct'){
guessesCount = data.history.length
guessesEl.textContent = guessesCount
status.innerHTML = 'Yay! I guessed <strong>'+data.guess.toUpperCase()+'</strong> in '+guessesCount+' tries 🎉'
guessBox.classList.remove('hidden')
guessEl.textContent = data.guess.toUpperCase()
setControlsForRunning(false)
renderHistory(data.history)
return
}


if(data.result === 'inconsistent'){
status.innerHTML = '<strong>Inconsistent feedback.</strong> Please restart and try carefully.'
setControlsForRunning(false)
renderHistory(data.history)
return
}


if(data.guess){
currentGuess = data.guess
showGuess(currentGuess.letter)
updateMeta(data.low, data.high, data.history)
renderHistory(data.history)
}
}


higherBtn.addEventListener('click', ()=>sendResponse('higher'))
lowerBtn.addEventListener('click', ()=>sendResponse('lower'))
correctBtn.addEventListener('click', ()=>sendResponse('correct'))


restartBtn.addEventListener('click', ()=>{
fetch('/start', {method:'POST'}).then(r=>r.json()).then(data=>{
if(data.guess){
currentGuess = data.guess
showGuess(currentGuess.letter)
updateMeta(data.low, data.high, data.history)
setControlsForRunning(true)
status.innerHTML = 'Is your letter <strong>'+currentGuess.letter.toUpperCase()+'</strong> ?'
renderHistory([])
}
})
})


function showGuess(letter){
guessBox.classList.remove('hidden')
guessEl.textContent = letter.toUpperCase()
}


function updateMeta(low, high, history){
const letters = 'abcdefghijklmnopqrstuvwxyz'
rangeEl.textContent = letters[low].toUpperCase() + ' — ' + letters[high].toUpperCase()
guessesEl.textContent = history.length
}


function renderHistory(history){
historyEl.innerHTML = ''
history.forEach((h,i)=>{
const li = document.createElement('li')
li.textContent = (i+1) + '. Guess: ' + h.guess.toUpperCase() + ' → ' + h.action
historyEl.appendChild(li)
})
}
