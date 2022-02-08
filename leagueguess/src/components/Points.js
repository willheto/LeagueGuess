import './Points.css'

function Points(props) {
    return (
        <div className="Points">
            {<div className="points">Points: {props.points}</div>}
        </div>
    );
}

export default Points;
