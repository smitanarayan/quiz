const score = localStorage.getItem("score");
const maxPossibleScore = localStorage.getItem("maxPossibleScore");
finalScore.innerText = "You scored " + score + "/" + maxPossibleScore + ".";

if (score === maxPossibleScore) {
  finalScore.innerText += "You are awesome!";
  play.style.visibility = "hidden";
  banner.style.margin = 0;
}
