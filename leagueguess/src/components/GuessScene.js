import React, { useState, useEffect } from 'react';
import './GuessScene.css'
import Champions from '../champions.json'
import Points from './Points.js'
import PlayerInfo from './PlayerInfo';
import Leaderboard from './Leaderboard';
import GoNext from './GoNext';
import AnswerWrapper from './AnswerWrapper';
import AnswerReport from './AnswerReport';
import scoreService from '../services/scores'


function GuessScene() {

    const [answer, setAnswer] = useState();
    const [champion, setChampion] = useState(Champions[Math.floor(Math.random() * (134 - 1)) + 1]);
    const [rightAnswer, setRightAnswer] = useState();
    const [clip, setClip] = useState("rect(0, 100px, 100px, 0)");
    const [clipTimes, setClipTimes] = useState(150);
    const [blur, setBlur] = useState("blur(0px)");
    const [blurTimes, setBlurTimes] = useState(0);
    const [points, setPoints] = useState(1000);
    const [visiblePoints, setVisiblePoints] = useState(0);
    const [rounds, setRounds] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [playerName, setPlayerName] = useState("Bob");

    useEffect(() => {
        let champ = document.getElementById('champion');
        champ.style.clip = clip;
        champ.style.filter = blur;
    });

    const checkAnswer = (event) => {
        event.preventDefault();
        if (answer.toLowerCase() === champion.toLowerCase()) {
            setClip("");
            setRightAnswer(true);
        } else {
            setClip(`rect(0, ${clipTimes}px, ${clipTimes}px, 0)`);
            setClipTimes(clipTimes * 1.2)
            setBlurTimes(blurTimes + 5)
            setBlur(`blur(${blurTimes}px)`)
            setPoints(points - 100)
        }
    }

    const goNext = (event) => {
        if (rounds === 0) {
            setVisiblePoints(points);
            setGameOver(true);
            setClip("");

            const scoreObject = {
                name: playerName,
                points: points
            }

            scoreService
                .create(scoreObject)

        } else {
            setRightAnswer(null);
            setChampion(Champions[Math.floor(Math.random() * (134 - 1)) + 1]);
            setAnswer(null);
            setBlurTimes(0);
            setClip("rect(0, 100px, 100px, 0)");
            setClipTimes(150);
            setBlur("blur(0px)");
            setPoints(points + 1000);
            setVisiblePoints(points);
            setRounds(rounds + 1);
        }
    }


    const IsGameOver = () => {
        if (gameOver === true) {
            return (
                <Leaderboard />
            );
        } return (
            <GoNext goNext={goNext} />
        );
    }

    const newGame = () => {
        setRightAnswer(null);
        setChampion(Champions[Math.floor(Math.random() * (134 - 1)) + 1]);
        setAnswer(null);
        setBlurTimes(0);
        setClip("rect(0, 100px, 100px, 0)");
        setClipTimes(150);
        setBlur("blur(0px)");
        setPoints(1000);
        setVisiblePoints(0);
        setRounds(0);
        setGameOver(false);
    }


    if (gameOver === true) { // If player guessed right or the game ends
        return (
            <div>
                <div className="guessScene">
                    <div className="headerBar">
                        <Points points={visiblePoints}></Points>
                        <h1 className="header">LeagueGuess</h1>
                        <PlayerInfo setPlayerName={setPlayerName} playerName={playerName}></PlayerInfo>
                    </div>
                    <IsGameOver />

                    <div className="playAgain" onClick={newGame}><h1 className="playAgainFont">Play again</h1></div>
                    <div className="championSquare">
                        <img alt="a champion to be guessed" id="champion" src={""}></img>
                    </div>
                </div>
            </div>
        );
    }

    if (rightAnswer === true) { // If player guessed right
        return (
            <div>
                <AnswerReport points={points} gameOver={gameOver} />
                <div className="guessScene">
                    <div className="headerBar">
                        <Points points={visiblePoints}></Points>
                        <h1 className="header">LeagueGuess</h1>
                        <PlayerInfo setPlayerName={setPlayerName} playerName={playerName}></PlayerInfo>
                    </div>


                    <div className="guessScene">
                        <div className="championSquare">
                            <img alt="a champion to be guessed" id="champion" src={`https://opgg-static.akamaized.net/images/lol/champion/${champion}.png?image=c_scale,q_auto,w_46&v=1643767689`}></img>
                        </div>
                        <IsGameOver />

                    </div>
                </div>
            </div>
        );
    }

    return ( // If it's time to guess
        <div>

            <div className="guessScene">
                <div className="headerBar">
                    <Points points={visiblePoints}></Points>
                    <h1 className="header">LeagueGuess</h1>
                    <PlayerInfo setPlayerName={setPlayerName} playerName={playerName}></PlayerInfo>
                </div>

                <div className="championSquare">
                    <img alt="a champion to be guessed" id="champion" src={`https://opgg-static.akamaized.net/images/lol/champion/${champion}.png?image=c_scale,q_auto,w_46&v=1643767689`}></img>
                </div>

                <AnswerWrapper setAnswer={setAnswer} checkAnswer={checkAnswer} />

            </div>
        </div>
    );
}

export default GuessScene;
