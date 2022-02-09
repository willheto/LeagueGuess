import React, { useState, useEffect } from 'react';
import './Leaderboard.css'
import scoreService from '../services/scores'

const Leaderboard = () => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        scoreService
            .getAll()
            .then(response => {
                setScores(response.data.sort((a, b) => b.points - a.points).slice(0,10));
            })

    }, []);


    return (
        <div className="wrapper">
            <div className="lbHeader">
                <h1>Leaderboard</h1>
            </div>
            <div className="highScores">
                <div class>
                    {scores.map((score, index) =>
                        <div className="scoreWrapper">
                            <div className="position">{index + 1}</div>
                            <div className="hsNames">{score.name}</div>
                            <div className="hsPoints">{score.points}</div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Leaderboard;
