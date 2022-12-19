const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "normal",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "hard",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "normal",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
]

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

let score = 0
let questionNumber = 0
let currentIndex = -1

let questionNodes = document.getElementsByClassName("question-container")[0]
let answerContainerNode = document.querySelector(".answer-container")
let mainContainer = document.getElementsByClassName("container")[0]
let scoreNode = document.getElementById("score")
let nextNode = document.getElementById("next")

let difficultyTime = {
  easy: 25,
  normal: 40,
  hard: 60,
}

const nextQuestion = () => {
  checkScore()

  console.log("question")

  if (currentIndex >= questions.length - 1) {
    // quiz done

    mainContainer.innerHTML = ""
    nextNode.style.visibility = "hidden"
    displayScore()

    return
  }
  currentIndex++

  if (currentIndex === questions.length - 1) {
    console.log("next")
    nextNode.value = "Results"
    nextNode.href = "/score.html"
  }

  let question = questions[currentIndex]

  let time = difficultyTime[question.difficulty]

  startTimer(time)

  questionNodes.innerText = question.question
  let answers = []
  answers.push(question.correct_answer, ...question.incorrect_answers)
  shuffle(answers)
  console.log(answers)
  answerContainerNode.innerHTML = ""
  for (let i = 0; i < answers.length; i++) {
    let answerNode = document.createElement("div")
    answerNode.classList.add("answers")
    answerNode.onclick = () => {
      let selectedNodes = document.getElementsByClassName("selected")
      for (let i = 0; i < selectedNodes.length; i++) {
        selectedNodes[i].classList.remove("selected")
      }
      answerNode.classList.add("selected")
    }
    answerNode.innerText = answers[i]
    answerContainerNode.appendChild(answerNode)
  }
  scoreNode.innerText = score
  scoreNode.style.visibility = "hidden"
}

const checkScore = () => {
  if (currentIndex <= 0) {
    return
  }
  let selectedAnswer = document.querySelector(".selected")
  let question = questions[currentIndex]
  if (selectedAnswer && selectedAnswer.innerText === question.correct_answer) {
    score++
  }
}
const displayScore = () => {
  scoreNode.classList.add("score-final")
  mainContainer.appendChild(scoreNode)
  localStorage.setItem("score", score)

  window.location.href = "./score.html"
}

const WARNING_THRESHOLD = 10
// Alert occurs at 5s
const ALERT_THRESHOLD = 5

const COLOR_CODES = {
  info: {
    color: "green",
  },

  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
}

let intervalId = null

const FULL_DASH_ARRAY = 283

const formatTimeLeft = (time) => {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60)

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  // The output in MM:SS format
  return `${minutes}:${seconds}`
}

// Start with an initial value of 20 seconds
// const time = 5

// Initially, no time has passed, but this will count up
// and subtract from the time
let timePassed = 0
let timeLeft = 20

document.getElementById("app").innerHTML = `
<div class="base-timer" style="visibility: hidden">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="500" r="45" />
    </g>
  </svg>
  <span>
  ${formatTimeLeft(timeLeft)}
  </span>
</div>`

// Update the dasharray value as time passes, starting with 283
const setCircleDasharray = (time) => {
  const circleDasharray = `${(
    calculateTimeFraction(time) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray)
}
const updateTime = (time, timeLeft) => {
  document.getElementById("base-timer-label").innerHTML =
    formatTimeLeft(timeLeft)
  setCircleDasharray(time)
  setRemainingPathColor(timeLeft)
}
const startTimer = (time) => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  timePassed = 0
  timeLeft = time
  updateTime(time, timeLeft)
  let baseTimerNode = document.getElementsByClassName("base-timer")[0]
  baseTimerNode.style.visibility = "visible"
  intervalId = setInterval(() => {
    timePassed += 1
    console.log("went in")
    timeLeft = time - timePassed

    updateTime(time, timeLeft)

    if (timeLeft <= 0) {
      nextQuestion()
    }
  }, 1000)
}

let remainingPathColor = COLOR_CODES.info.color

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    ${formatTimeLeft(timeLeft)}
  </span>
</div>
`

const calculateTimeFractiont = (time) => {
  return timeLeft / time
}

const calculateTimeFraction = (time) => {
  const rawTimeFraction = timeLeft / time
  return rawTimeFraction - (1 / time) * (1 - rawTimeFraction)
}

const setRemainingPathColor = (timeLeft) => {
  const { alert, warning, info } = COLOR_CODES
  document.getElementById("base-timer-path-remaining").classList.add(info.color)
  // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color)

    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color)

    // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color)
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color)
  } else {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color, alert.color)
  }
}

window.onload = () => {
  nextQuestion()
}
