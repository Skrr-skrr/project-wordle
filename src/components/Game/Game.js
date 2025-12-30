import React from "react";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import { sample } from "../../utils";
import GuessInput from "../GuessInput/GuessInput";
import GuessResult from "../GuessResult/GuessResult";
import Keyboard from "../Keyboard/Keyboard";
import LostBanner from "../LostBanner/LostBanner";
import WonBanner from "../WonBanner/WonBanner";

function Game() {
	const [answer, setAnswer] = React.useState(() => sample(WORDS));
	console.info({ answer });
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

	function handleRestart() {
		const newAnswer = sample(WORDS);
		setAnswer(newAnswer);
		setGuesses([]);
		setGameStatus("running");
	}

	const validatedGuesses = guesses.map((guess) => checkGuess(guess, answer));
	return (
		<>
			<GuessResult validatedGuesses={validatedGuesses} />
			<GuessInput handleAddGuess={handleAddGuess} gameStatus={gameStatus} />
			<Keyboard validatedGuesses={validatedGuesses} />
			{gameStatus === "won" && (
				<WonBanner
					numOfGuesses={guesses.length}
					handleRestart={handleRestart}
				/>
			)}
			{gameStatus === "lost" && (
				<LostBanner answer={answer} handleRestart={handleRestart} />
			)}
		</>
	);
}

export default Game;
