/* eslint-disable no-prototype-builtins */
/**
 * @author Mohammadali Rashidfarokhi
 */

import * as ApiJs from './Api.js'
let name = ''
let control = false
let currentQuestion = ''
let interval
let qnumber = 1
let count
let totalTime = 0

/**
 * Function to get system to sleep for a given time
 * @param {Float} ms - time in milliseconds
 * @returns {object} a promise that resolves after the given time
 */
function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Function to check the quiz time
 */
async function CheckTime () {
  count = 10
  interval = setInterval(function () {
    --count
    document.getElementById('quiz-time-left').innerHTML = 'Time left: ' + count
    if (count === 0) {
      document.getElementById('display-question').innerHTML =
           'Time is up!     <br> better luck at the next time!'
      document.getElementById('divContainer').style.display = 'none'
      clearInterval(interval)
      sleep(4000).then(() => {
        location.reload()
      })
    }
  }, 1000)
}

/**
 * Function to send data to server
 * @param {string} url - url to fetch
 * @param {object} data - data (user answer) to fetch
 * @returns {object} The fetched response from the server
 */
async function postAnswer (url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  })
  if (response.status === 200) {
    control = true
    totalTime += count
  }
  return response.json()
}

/**
 * Remove elements when no alternatives
 * @param {object} selector - The element to be removed
 */
function removeElement (selector) {
  selector.forEach((element) => {
    element.remove()
  })
}

/**
 * Function to remove children of a given element
 * @param {object} id - The element id to be removed
 */
function removeChild (id) {
  id.removeChild(document.getElementById('divContainer').lastChild)
}

/**
 * Get the number of the alternatives
 * @param {number} obj - Number of elements in the object
 * @returns {number}  - The size of the object
 */
Object.size = function (obj) {
  let size = 0
  let key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++
  }
  return size
}

/**
 * Function to createRadios (alternatives)
 * @param {*} result - The fetched data from the server
 */
function createRadios (result) {
  const myObj = result.alternatives
  const size = Object.size(myObj)
  for (let i = size; i > 0; i--) {
    const el = document.createElement('span')
    el.className = 'spanSelector'
    const div = document.getElementById('divContainer')
    insertAfter(div, el)
    el.innerHTML = `<input type="radio" id="option-${i}"   class="radio"  /> <label for="option-one" class="option" id="option-label-${i}"></label> `
  }
  const radio = document.querySelectorAll('.radio')
  const label1 = document.getElementById('option-label-1')
  const label2 = document.getElementById('option-label-2')
  const label3 = document.getElementById('option-label-3')
  const label4 = document.getElementById('option-label-4')
  label1.innerHTML = result.alternatives.alt1
  label2.innerHTML = result.alternatives.alt2
  label3.innerHTML = result.alternatives.alt3
  if (size === 4) {
    label4.innerHTML = result.alternatives.alt4
  }
  for (let i = 0; i < radio.length; i++) {
    radio[i].name = 'alt' + (i + 1)
  }
}
getName()
/**
 *Get user name
 */
function getName () {
  do {
    const namePrompt = window.prompt('Enter your NickName: ')
    name = namePrompt
  } while (name === null || name === '')
}

/**
 * Function to store the user's score and name
 */
function storeInLocalStorage () {
  const users =
       JSON.parse(window.localStorage.getItem('users')) === null
         ? []
         : JSON.parse(window.localStorage.getItem('users'))
  users.push({ name: name, score: totalTime })
  window.localStorage.setItem('users', JSON.stringify(users))
}

/**
 * Function to get the quastions and represent them to the user
 * @param {string} qu - The url to be fetched
 */
function NextQuestion (qu) {
  control = false
  document.getElementById('question-number').innerHTML = qnumber++
  document.getElementById('name').innerHTML = name
  clearInterval(interval)
  CheckTime()
  ApiJs.fetchQuestion(qu)
    .then((result) => {
      return result
    })
    .then((result) => {
      if (result.alternatives === undefined) {
        document.querySelectorAll('.spanSelector').forEach((e) => e.remove())
        const container = document.querySelector('.container')
        container.style.display = 'block'
        container.innerHTML =
             '<div > <input id="userInput" placeholder="Your answer.." type="text"/><button  class="btn-hover color-1" id="answerSubmited" >Next Question</button></div>'
        document
          .getElementById('answerSubmited')
          .addEventListener('click', function () {
            postAnswer(result.nextURL, {
              answer: document.getElementById('userInput').value
            }).then((data) => {
              if (control === true && qnumber < 7) {
                NextQuestion(data.nextURL)
              } else if (control === false) {
                gameOver()
              } else {
                gameWin()
              }
            })
          })
      } else if (result.alternatives !== undefined) {
        if (document.querySelectorAll('.spanSelector').length > 0) {
          removeElement(document.querySelectorAll('.spanSelector'))
        }
        if (document.getElementById('divContainer').children.length > 0) {
          removeChild(document.getElementById('divContainer'))
        }
        createRadios(result)
        const radio = document.querySelectorAll('.radio')
        for (let i = 0; i < radio.length; i++) {
          document
            .getElementsByClassName('option')[i].addEventListener('click', function (event) {
              postAnswer(result.nextURL, { answer: radio[i].name }).then(
                (data) => {
                  if (control === true && qnumber <= 7) {
                    NextQuestion(data.nextURL)
                  } else if (control === false) {
                    document
                      .querySelectorAll('.spanSelector')
                      .forEach((e) => e.remove())
                    gameOver()
                  } else {
                    gameWin()
                  }
                }
              )
            })
        }
      }
      currentQuestion = result.question
      document.getElementById('display-question').innerHTML = currentQuestion
    })
}
/**
 * Function to insert the radio input in divContainer
 * @param {*} referenceNode -- The reference node that will be inserted before
 * @param {*} newNode  -- The new node to be inserted
 */
function insertAfter (referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}
/**
 * Function to show the game over screen
 */
function gameOver () {
  document.getElementById('display-question').innerHTML =
       'Game over!     <br> better luck at the next time!'
  document.getElementById('divContainer').style.display = 'none'
  list()
  clearInterval(interval)
  sleep(4000).then(() => {
    location.reload()
  })
}
/**
 * Function to sort top  scores and represent them to the user
 */
function list () {
  const userScores =
      JSON.parse(window.localStorage.getItem('users')) === null
        ? []
        : JSON.parse(window.localStorage.getItem('users'))
  userScores.sort(function (a, b) {
    return parseInt(a.score, 10) - parseInt(b.score, 10)
  })
  const showBest = userScores.splice(1, 5)
  const p = document.createElement('p')
  p.className = 'bests'
  document.getElementsByClassName('bestScores')[0].appendChild(p)
  p.innerHTML += '<br> Best play <br> '
  showBest.forEach((user, row) => {
    p.innerHTML += user.name + ': ' + user.score + ' seconds <br>'
  })
}

/**
 * Function to show the game win screen
 */
function gameWin () {
  storeInLocalStorage()
  const userScores =
       JSON.parse(window.localStorage.getItem('users')) === null
         ? []
         : JSON.parse(window.localStorage.getItem('users'))
  userScores.sort(function (a, b) {
    return parseInt(a.score, 10) - parseInt(b.score, 10)
  })
  document.getElementById('display-question').innerHTML =
       'Well done ' + name + ' You WON!'
  document.querySelectorAll('.spanSelector').forEach((e) => e.remove())
  list()
  clearInterval(interval)
  sleep(8000).then(() => {
    location.reload()
  })
}
NextQuestion('https://courselab.lnu.se/quiz/question/1')
