import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
import rewriteIcon from "./rewrite-icon.png";

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }
    
    render() {
        return (
            <div className="Playlist">

                    <input defaultValue={this.props.playlistName} onChange={this.handleNameChange}/>
                    <img className="rewrite-icon" src={rewriteIcon} alt="rewrite icon"></img>

                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;