let scoreNode = document.getElementById("score")

const displayScore = () => {
  const savedScore = localStorage.getItem("score")
  scoreNode.innerText = savedScore
}

window.onload = () => {
  displayScore()
}
