import { useEffect, useState } from "react";
const Clock = (props) =>{
    return (
      <div className="clock"> 
        <div className="hour">
          <div
            name="hr"
            
            style={{ transform: `rotateZ(${props.hours * 30}deg)` }}
            className="hr"
            id="hr"
          ></div>
        </div>
        <div className="minute">
          <div
            name="min"
            style={{ transform: `rotateZ(${props.minutes * 30}deg)` }}
            className="min"
            id="min"
          ></div>
        </div>
      </div>
    );
}

export default Clock;