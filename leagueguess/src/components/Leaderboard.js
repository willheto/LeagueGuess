import './Leaderboard.css'

const Leaderboard = (props) => {


    return (
        <div>
            <div className="lbHeader">
                <h1>Leaderboard</h1>
            </div>
            <div className="highScores">

                <div>
                    {props.hsNames.map(name => <div className="hsNames">{name.name}</div>)}
                </div>
                <div>
                    {props.hsNames.map(name => <div className="hsPoints">{name.points} Points</div>)}
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;
