import './App.css';
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name: "Girls",
        artist: "Aespa",
        album: "Girls",
        id: 1
      }],
      playlistName: "Im so freaky fishy fishy",
      playlistTracks: []
    }
  }
  
  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
        </div>
      </div>
    </div>
  )
 };
}

export default App;
