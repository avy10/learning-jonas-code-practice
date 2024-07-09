export default function NextButton({
	dispatch,
	answer,
	questionIndex,
	noOfQuestions,
}) {
	if (answer === null) return null;
	if (questionIndex + 1 < noOfQuestions) {
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "nextQuestion" })}
			>
				Next
			</button>
		);
	} else {
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "finishQuiz" })}
			>
				Finish
			</button>
		);
	}
}
