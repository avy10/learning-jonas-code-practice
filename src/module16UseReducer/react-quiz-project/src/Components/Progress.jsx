export default function Progress({
	questionIndex,
	noOfQuestions,
	userScore,
	maxPoints,
	answer,
}) {
	return (
		<header className="progress">
			<progress
				max={noOfQuestions}
				value={questionIndex + 1 + Number(answer !== null)}
			/>
			<p>
				Question <strong>{questionIndex + 1}</strong> / {noOfQuestions}
			</p>
			<p>
				<strong>{userScore}</strong> / {maxPoints}
			</p>
		</header>
	);
}
