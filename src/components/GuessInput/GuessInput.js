import React from "react";

function GuessInput({ gameStatus, handleAddGuess }) {
	const [userInput, setUserInput] = React.useState("");
	function handleSubmit(event) {
		event.preventDefault();
		handleAddGuess(userInput);
		setUserInput("");
	}
	return (
		<form className="guess-input-wrapper" onSubmit={handleSubmit}>
			<label htmlFor="guess-input">Enter guess:</label>
			<input
				required
				disabled={gameStatus !== "running"}
				id="guess-input"
				type="text"
				minLength={5}
				maxLength={5}
				pattern="[a-zA-Z]{5}"
				title="5 letter word"
				value={userInput}
				onChange={(event) => {
					setUserInput(event.target.value.toUpperCase());
				}}
			/>
		</form>
	);
}

export default GuessInput;
