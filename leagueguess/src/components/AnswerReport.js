import './AnswerReport.css'

const AnswerReport = (props) => {

    if (props.gameOver) {
        return (
            <div className="answerReport">
            <h1>Mega Wp! <br></br>You got total of {props.points} points.</h1>
        </div>
        );
    } return (
        <div className="answerReport">
            <h1>Nice, you got that right! <br></br>You now have {props.points} points.</h1>
        </div>
    );
}

export default AnswerReport;
