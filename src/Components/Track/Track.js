import React from "react";
import "./Track.css";

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    
    renderAction() {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={this.addTrack}>+</button>
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p><span className="artist-name">{this.props.track.artist}</span> | {this.props.track.album}</p>
                    <p>{this.props.track.release_date} | <span className="popularity">Popularity Score: {this.props.track.popularity}</span></p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;