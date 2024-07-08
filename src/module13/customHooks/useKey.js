import { useEffect } from "react";
export function useKey(keyId, action) {
	useEffect(
		function () {
			function callback(e) {
				if (e.code.toLowerCase() === keyId.toLowerCase()) {
					// onCloseMovie();
					action?.();
				}
			}

			document.addEventListener("keydown", callback);

			return function () {
				document.removeEventListener("keydown", callback);
			};
		},
		[keyId, action]
	);
}
