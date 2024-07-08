import React from "react";
// class Counter extends React.Component {
// 	// parent class gives us the render method
// 	// every single class componenet needs to have a render method which return JSX'

// 	constructor(props) {
// 		super(props);
// 		this.state = { count: 0 };
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<button>+</button>
// 				<span>{this.state.count}</span>
// 				<button>-</button>
// 			</div>
// 		);
// 	}
// }
class Counter extends React.Component {
	// parent class gives us the render method
	// every single class componenet needs to have a render method which return JSX'

	constructor(props) {
		super(props);
		this.state = { count: 0 };
		this.handleDecrement = this.handleDecrement.bind(this);
		this.handleIncrement = this.handleIncrement.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleDecrement() {
		console.log(this);
		// undefined
		// we need the this keyword to point to the current event bcz that is how we update state
		// when react calls out eventhandler in the render() function, behind the scenes it(react) first creates a copy of this eventhandler function
		// and then the function call is a normal function call that is not bound to any object
		// and because of that, this function loses its binding to the current this keyword
		// which is why the this keyword atm is undefined
		// so keep in mind that any function call inside the render() method will loose its this keyword binding
		// which is why gotta manually bind the this keyword back to the eventhandler function
		// that is done in the constructor method using the bind method
		this.setState((currentState) => {
			return { count: currentState.count - 1 };
		});
	}
	handleIncrement() {
		this.setState((currentState) => {
			return { count: currentState.count + 1 };
		});
	}
	handleReset() {
		this.setState({ count: 0 });
	}
	render() {
		// should be clean, it should contain as little render logic as possible
		// which is why our handler functions are defined as class methods
		const date = new Date("July 4 2024");
		date.setDate(date.getDate() + this.state.count);
		return (
			<div>
				<button onClick={this.handleDecrement}>-</button>
				<span>{this.state.count}</span>
				<button onClick={this.handleIncrement}>+</button>
				<div>
					<button onClick={this.handleReset}>Reset</button>
				</div>
				<div>{date.toDateString()}</div>
			</div>
		);
	}
}
export default Counter;
