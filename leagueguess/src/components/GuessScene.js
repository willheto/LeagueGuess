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

    let testing = [];

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
        if (rounds === 9) {
            setVisiblePoints(points);
            setGameOver(true);
            setClip("");

            const scoreObject = {
                name: playerName,
                points: points
            }

            scoreService
                .create(scoreObject)


            /*window.localStorage.setItem(`${playerName}`, `${points}`)
            const items = { ...localStorage };

            for (let index = 0; index < Object.keys(items).length; index++) {

                let hsNames1 = ({ name: Object.keys(items)[index], points: Object.values(items)[index] });
                testing = testing.concat(hsNames1);
                let tempArray = testing;
                tempArray.sort((a, b) => b.points - a.points);
                setHsNames(tempArray);
            }*/


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


    if (gameOver === true || rightAnswer === true) { // If player guessed right or the game ends
        return (
            <div>
                <Points points={visiblePoints}></Points>
                <PlayerInfo setPlayerName={setPlayerName} playerName={playerName}></PlayerInfo>
                <AnswerReport points={points} gameOver={gameOver} />

                <div className="guessScene">
                    <h1 className="header">Who am I?</h1>

                    <div className="championSquare">
                        <img alt="a champion to be guessed" id="champion" src={`https://opgg-static.akamaized.net/images/lol/champion/${champion}.png?image=c_scale,q_auto,w_46&v=1643767689`}></img>
                    </div>
                    <IsGameOver />
                </div>
            </div>
        );
    }

    return ( // If it's time to guess
        <div>
            <Points points={visiblePoints}></Points>
            <PlayerInfo setPlayerName={setPlayerName} playerName={playerName}></PlayerInfo>
            <div className="guessScene">
                <h1 className="header">Who am I?</h1>

                <div className="championSquare">
                    <img alt="a champion to be guessed" id="champion" src={`https://opgg-static.akamaized.net/images/lol/champion/${champion}.png?image=c_scale,q_auto,w_46&v=1643767689`}></img>
                </div>

                <AnswerWrapper setAnswer={setAnswer} checkAnswer={checkAnswer} />

            </div>
        </div>
    );
}

export default GuessScene;
