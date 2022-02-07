import React, { useState, useEffect } from 'react';
import './GuessScene.css'
import Champions from '../champions.json'


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


    useEffect(() => {
        let champ = document.getElementById('champion');
        champ.style.clip = clip;
        champ.style.filter = blur;
    });


    const handleType = (event) => {
        console.log(event)
        event.preventDefault();
        setAnswer(event.target.value)
        console.log(answer)
    }

    const checkAnswer = (event) => {
        event.preventDefault();
        console.log(event)
        console.log(champion);
        console.log(answer);
        console.log(answer === champion);
        if (answer === champion) {
            setClip(`rect(1, 200px, 200px, 0)`);
            setRightAnswer(true);
        } else {
            setClip(`rect(0, ${clipTimes}px, ${clipTimes}px, 0)`);
            setClipTimes(clipTimes * 1.2)
            setBlurTimes(blurTimes + 5)
            setBlur(`blur(${blurTimes}px)`)
            setPoints(points - 100)
        }
    }

    const goNext = () => {
        if (rounds === 9) {
            setClip(`rect(1, 200px, 200px, 0)`);
            setGameOver(true);
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

    if (gameOver === true) {
        return (
            <div>
                <div className="points">Points: {visiblePoints}</div>
                <div className="answerReport">
                    <h1>Mega Wp! <br></br>You got total of {points} points.</h1>
                </div>

                <div className="guessScene">
                    <h1 className="header">Who am I?</h1>

                    <div className="championSquare">
                        <img alt="a champion to be guessed" id="champion" src={`https://opgg-static.akamaized.net/images/lol/champion/${champion}.png?image=c_scale,q_auto,w_46&v=1643767689`}></img>
                    </div>
                </div>
            </div>
        );
    }
    if (rightAnswer === true) {
        return (
            <div>
                <div className="points">Points: {visiblePoints}</div>
                <div className="answerReport">
                    <h1>Nice, you got that right! <br></br>You now have {points} points.</h1>
                </div>

                <div className="guessScene">
                    <h1 className="header">Who am I?</h1>

                    <div className="championSquare">
                        <img alt="a champion to be guessed" id="champion" src={`https://opgg-static.akamaized.net/images/lol/champion/${champion}.png?image=c_scale,q_auto,w_46&v=1643767689`}></img>
                    </div>
                    <button className="goNext" onClick={goNext}>
                        <h1>Go Next</h1>
                    </button>
                </div>
            </div>
        );
    } else if (rightAnswer === false) {
        return (
            <div>
                <div className="points">Points: {visiblePoints}</div>
                <div className="answerReport">
                    <h1>Try again tomorrow!</h1>
                </div>
                <div className="guessScene">
                    <h1 className="header">Who am I?</h1>

                    <div className="championSquare">
                        <img alt="a champion to be guessed" id="champion" src={`https://opgg-static.akamaized.net/images/lol/champion/${champion}.png?image=c_scale,q_auto,w_46&v=1643767689`}></img>
                    </div>
                    <div className="answerWrapper">
                        <form onSubmit={checkAnswer}>
                            <input autoFocus className="inputGuess" onChange={handleType}></input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="points">Points: {visiblePoints}</div>
            <div className="guessScene">
                <h1 className="header">Who am I?</h1>

                <div className="championSquare">

                    <img alt="a champion to be guessed" id="champion" src={`https://opgg-static.akamaized.net/images/lol/champion/${champion}.png?image=c_scale,q_auto,w_46&v=1643767689`}></img>
                </div>
                <div className="answerWrapper">
                    <form onSubmit={checkAnswer}>
                        <input autoFocus className="inputGuess" onChange={handleType}></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GuessScene;
