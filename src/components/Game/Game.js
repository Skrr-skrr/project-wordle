import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { WORDS } from "../../data";
import { sample } from "../../utils";
import GuessInput from "../GuessInput/GuessInput";
import GuessResult from "../GuessResult/GuessResult";
import LostBanner from "../LostBanner/LostBanner";
import WonBanner from "../WonBanner/WonBanner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
	const [gameStatus, setGameStatus] = React.useState("running");
	const [guesses, setGuesses] = React.useState([]);

	function handleAddGuess(userGuess) {
		const nextGuesses = [...guesses, userGuess];
		setGuesses(nextGuesses);

		if (userGuess.toUpperCase() === answer) {
			setGameStatus("won");
		} else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
			setGameStatus("lost");
		}
	}
	return (
		<>
			<GuessResult gameStatus={gameStatus} guesses={guesses} answer={answer} />
			<GuessInput handleAddGuess={handleAddGuess} gameStatus={gameStatus} />

			{gameStatus === "won" && <WonBanner numOfGuess={guesses.length} />}
			{gameStatus === "lost" && <LostBanner answer={answer} />}
		</>
	);
}

export default Game;
