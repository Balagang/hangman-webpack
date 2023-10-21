import Hangman from './hangman'
import getPuzzle from './requeste'
import '../styles/style.css'

const div = document.querySelector('#main-div')
const puzzleEl = document.querySelector('#puzzle')
const remainingQty = document.querySelector('#guesses')
const p = document.createElement('p')

let game1

div.appendChild(p)
div.appendChild(puzzleEl)
div.appendChild(remainingQty)

window.addEventListener('keypress', (e) => {
    const guess = e.key
    game1.makeGuess(guess)
    render()
})
const render = () => {
    puzzleEl.textContent = ''
    remainingQty.textContent = game1.statusMessage
    p.textContent = game1.status.toUpperCase()
    game1.puzzle.split('').forEach((letter) => {
        const span = document.createElement('span')
        span.textContent = letter
        puzzleEl.appendChild(span)//game1.puzzle
    });
}
const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)
startGame()

fetch(`https://puzzle.mead.io/puzzle`, {}).then((response) => {
    if (response.status === 200) {
        // console.log(response)
        return response.json()
    } else {
        throw new Error('Unable to fetch')
    }
}).then((data) => {
    console.log(`Data from Fetch(${data.puzzle})`)
}).catch((err) => {
    console.log(err)
})
