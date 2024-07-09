export default function Question({ question, dispatch, answer }) {
	return (
		<div>
			<h4>{question?.question}</h4>
			<Options
				optionsArray={question.options}
				dispatch={dispatch}
				answer={answer}
				correctOption={question.correctOption}
			/>
			{/* <p>{answer === question.correctOption ? "CORRECT" : "WRONG"}</p> */}
		</div>
	);
}

function Options({ optionsArray, dispatch, answer, correctOption }) {
	return (
		<div className="options">
			{optionsArray?.map((option, index) => (
				<button
					disabled={answer !== null}
					className={`btn btn-option ${
						index === answer ? "answer" : ""
					} ${
						answer !== null && +index == +correctOption
							? "correct"
							: "wrong"
					}`}
					key={option}
					onClick={() =>
						dispatch({ type: "newAnswer", payload: index })
					}
				>
					{option}
				</button>
			))}
		</div>
	);
}
