import { useHistory } from "react-router-dom";
import "./open.scss"
const Open = () =>{
    const history = useHistory();
    const handleClick = () => {
        history.push("/home");
    }

    return (
      <div className="open">
        <button className="click" onClick={handleClick}>
          <div className="clickText">
            <h1>Start the Game</h1>
            <p>Click to Start</p>
          </div>
          <img
            className="background"
            src="https://wallpaperaccess.com/full/772411.jpg"
            alt=""
          />
        </button>
      </div>
    );
}

export default Open;