export default function FinishQuiz({
	userScore,
	maxPoints,
	highScore,
	dispatch,
}) {
	const percentage = (userScore / maxPoints) * 100;
	let emoji;
	if (percentage === 100) emoji = "🥇";
	if (percentage >= 80 && percentage < 100) emoji = "🥈";
	if (percentage >= 50 && percentage < 80) emoji = "🥉";
	if (percentage > 0 && percentage < 50) emoji = "🥉";
	if (percentage === 0) emoji = "🔁";
	return (
		<>
			<p className="result">
				You scored <strong>{userScore} </strong>out of {maxPoints}(
				{percentage.toFixed(2)}) ({emoji})
			</p>
			<p className="highscore">your high score : {highScore} points</p>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "restartQuiz" })}
			>
				Restart Quiz
			</button>
		</>
	);
}
