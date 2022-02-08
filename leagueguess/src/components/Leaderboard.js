import React, { useState, useEffect } from 'react';
import './Leaderboard.css'
import scoreService from '../services/scores'

const Leaderboard = () => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        scoreService
            .getAll()
            .then(response => {
                setScores(response.data.sort((a, b) => b.points - a.points));
            })
        
    }, []);


    return (
        <div>
            <div className="lbHeader">
                <h1>Leaderboard</h1>
            </div>
            <div className="highScores">

                <div>
                    {scores.map(name => <div className="hsNames">{name.name}</div>)}
                </div>
                <div>
                    {scores.map(name => <div className="hsPoints">{name.points} Points</div>)}
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;
