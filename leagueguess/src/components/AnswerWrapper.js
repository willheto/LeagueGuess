import './AnswerWrapper.css'

const GoNext = (props) => {

    const handleType = (event) => {
        event.preventDefault();
        props.setAnswer(event.target.value)
    }

    return (
        <div className="answerWrapper">
            <form onSubmit={props.checkAnswer}>
                <input autoFocus className="inputGuess" onChange={handleType}></input>
            </form>
        </div>
    );
}

export default GoNext;
