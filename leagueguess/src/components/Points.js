import './Points.css'

function Points(props) {
    return (
        <div className="Points">
            {<div className="points">Points: </div>}
            <div className="pointsNumber">{props.points}</div>
        </div>
    );
}

export default Points;
