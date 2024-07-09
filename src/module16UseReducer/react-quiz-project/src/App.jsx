import { useEffect, useReducer } from "react";
import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreem from "./Components/StartScreen";
import Question from "./Components/Question";
import NextButton from "./Components/NextButton";
import Progress from "./Components/Progress";
import FinishQuiz from "./Components/FinishQuiz";
const initialState = {
	questions: [],
	// "loading", "error", "ready", "active", "finished"
	appStatus: "loading",
	questionIndex: 0,
	answer: null,
	userScore: 0,
	highScore: 0,
};
function reducer(state, action) {
	console.table(action.payload);
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, appStatus: "ready" };
		case "dataFailed":
			return { ...state, appStatus: "error" };
		case "start":
			return { ...state, appStatus: "active" };
		case "newAnswer":
			const question = state.questions.at(state.questionIndex);
			return {
				...state,
				answer: +action.payload,
				userScore:
					action.payload === question.correctOption
						? +state.userScore + +question.points
						: +state?.userScore,
			};
		case "nextQuestion":
			return {
				...state,
				questionIndex: state.questionIndex + 1,
				answer: null,
			};
		case "finishQuiz":
			return {
				...state,
				appStatus: "finished",
				highScore:
					state.userScore > state.highScore
						? state.userScore
						: state.highScore,
			};
		// case "incUserScore":
		// 	return {...state, userScore : state.userScore + action.payload}
		case "setHighScore":
			return {
				...state,
				highScore:
					state.userScore > state.highScore
						? state.userScore
						: state.highScore,
			};
		case "restartQuiz":
			return {
				...state,
				answer: null,
				appStatus: "active",
				questionIndex: 0,
				userScore: 0,
			};
		default:
			throw new Error("Action unknown");
	}
}
export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, appStatus, questionIndex, answer, userScore } = state;
	const numberOfQuestions = questions.length;
	const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((err) => {
				dispatch({ type: "dataFailed" });
				console.error(err);
			});
	}, []);
	return (
		<div className="app">
			<Header />
			<Main>
				{appStatus === "loading" && <Loader />}
				{appStatus === "error" && <Error />}
				{appStatus === "ready" && (
					<StartScreem
						numberOfQuestion={numberOfQuestions}
						dispatch={dispatch}
					/>
				)}
				{appStatus === "active" && (
					<>
						<Progress
							questionIndex={questionIndex}
							noOfQuestions={questions.length}
							userScore={userScore}
							maxPoints={maxPoints}
							answer={answer}
						/>
						<Question
							question={questions[questionIndex]}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton
							questionIndex={questionIndex}
							noOfQuestions={questions.length}
							dispatch={dispatch}
							answer={answer}
						></NextButton>
					</>
				)}
				{appStatus === "finished" && (
					<FinishQuiz
						userScore={userScore}
						maxPoints={maxPoints}
						highScore={state.highScore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
