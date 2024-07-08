import { useState, useEffect } from "react";
export function useLocalStorageState(initialState, lsKey) {
	const [value, setValue] = useState(function () {
		// this callback function that is used to set initial state must be a pure
		// and it must not receive any arguments

		const watchFromLS = JSON.parse(localStorage.getItem(lsKey));
		return watchFromLS ? watchFromLS : initialState;
	});
	useEffect(() => {
		localStorage.setItem(lsKey, JSON.stringify(value));
		// to get the watched array back from localStorage we can use an effect which runs on component mount
		// but there is a better way to do that and that is to initialise state with a callback function i.e. lazy state
	}, [value, lsKey]);

	return [value, setValue];
}
