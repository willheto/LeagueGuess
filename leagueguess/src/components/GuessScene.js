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
    const [playerName, setPlayerName] = useState("");
    const [hsNames, setHsNames] = useState([{ name: "test", points: "test" }])

    let testing = [{}];

    useEffect(() => {
        let champ = document.getElementById('champion');
        champ.style.clip = clip;
        champ.style.filter = blur;
    });


    const handleType = (event) => {
        event.preventDefault();
        setAnswer(event.target.value)
    }

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
            setGameOver(true);
            setClip("");

            window.localStorage.setItem(`${playerName}`, `${points}`)
            const items = { ...localStorage };

            for (let index = 0; index < Object.keys(items).length; index++) {

                let hsNames1 = ({ name: Object.keys(items)[index], points: Object.values(items)[index] });
                testing = testing.concat(hsNames1);
                let tempArray = testing;
                tempArray.sort((a, b) => b.points - a.points);
                setHsNames(tempArray);
            }


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

    const handleName = (event) => {
        event.preventDefault();
        setPlayerName(event.target.value)
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
                    <div className="lbHeader">
                        <h1>Leaderboard</h1>
                    </div>
                    <div className="highScores">

                        <div>
                            {hsNames.map(name => <div>{name.name}</div>)}
                        </div>
                        <div>
                        {hsNames.map(name => <div>{name.points}</div>)}
                        </div>

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
    }

    return (
        <div>
            <div className="points">Points: {visiblePoints}</div>
            <div className="name">Name: <input value={playerName} className="nameInput" onChange={handleName}></input></div>
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
