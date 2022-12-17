import React from "react";
import "./Track.css";

class Track extends React.Component {
    renderAction() {
        return (
            <button className="Track-action"></button>
        )
    }
    
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>trackname</h3>
                    <p>artist | album</p>
                </div>
                <button className="Track-action">plus or minus</button>
            </div>
        )
    }
}

export default Track;