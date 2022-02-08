import './PlayerInfo.css'

const PlayerInfo = (props) => {

    const handleName = (event) => {
        event.preventDefault();
        props.setPlayerName(event.target.value)
    }

    return (
        <div className="name">
            Name: <input value={props.playerName} className="nameInput" onChange={handleName}>
            </input>
        </div>
    );
}

export default PlayerInfo;
