const client_id="30b400128e154cc99911c972a810ee05";
const redirect_uri = "http://localhost:3000/";
// const state = generateRandomString(16);
const scope = "playlist-modify-public";

let authURL = "https://accounts.spotify.com/authorize";
authURL += "?response_type=token";
authURL += "&client_id=" + encodeURIComponent(client_id);
authURL += "&redirect_uri=" + encodeURIComponent(redirect_uri);
authURL += "&scope=" + encodeURIComponent(scope);
// authURL += "&state=" + encodeURIComponent(state);

let userAccessToken;

const APIEndpoint = "https://api.spotify.com/v1";

let Spotify = {
    getAccessToken() {
        if (userAccessToken) { //If there already exists an access token
            return userAccessToken;
        } else { 
            let tokenRegex = /access_token=([^&]*)/;
            let expireRegex = /expires_in=([^&]*)/;

            let token = window.location.href.match(tokenRegex); //This returns an array with the entire regex expression and the token itself (capturing group) 
            let expiresIn = window.location.href.match(expireRegex); //So need to index its second element
            if (token && expiresIn) { //If a token/expire time was found in the URL already
                userAccessToken = token[1];                
                
                window.setTimeout(() => userAccessToken = '', parseInt(expiresIn[1]) * 1000);
                window.history.pushState("Access Token", null, "/"); //Reset the URL
            } else { //If a token/expire time was not found in the URL, go to the auth URL
                window.location = authURL;
            }
        }
    },

    async search(term) {
        this.getAccessToken()
        try {
            const response = await fetch(APIEndpoint + "/search?type=track&q=" + term, 
            {headers: {Authorization: "Bearer " + this.getAccessToken()}})
    
            if (response.ok) {
                const jsonResponse = await response.json();
                let tracks = jsonResponse.tracks.items.map((track) => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                        preview_url: track.preview_url,
                        popularity: track.popularity,
                        release_date: track.album.release_date,
                    }
                });
                return tracks;
            }
        } catch (error) {
            console.log(error.message);
        }
    },

    async savePlaylist(name, trackURIs) {
        this.getAccessToken()
        if (name && trackURIs) {
            let headers = {Authorization: "Bearer " + this.getAccessToken()};
            try {
                const userProfileRes = await fetch(APIEndpoint + "/me", 
                {headers: headers});
    
                if (userProfileRes.ok) { // GET the User ID
                    let userProfileJSON = await userProfileRes.json();
                    let userID = userProfileJSON.id;
                    
                    const newPlaylistRes = await fetch(APIEndpoint + `/users/${userID}/playlists`, 
                    {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify({
                            name: name
                        })
                    })
                    if (newPlaylistRes.ok && trackURIs.length !== 0) { //POST a new playlist
                        let newPlaylistJSON = await newPlaylistRes.json();
                        let playlistID = newPlaylistJSON.id;
                        
                        const playlistItemsRes =  await fetch(APIEndpoint + `/playlists/${playlistID}/tracks`,
                        {
                            method: "POST",
                            headers: headers,
                            body: JSON.stringify({
                                uris: trackURIs
                            })
                        });
                        if (playlistItemsRes.ok) { //POST the tracks (trackURIs) into the new playlist
                            let playlistItemsJSON = await playlistItemsRes.json();
                            playlistID = playlistItemsJSON.snapshot_id;
                        }
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        } 
        
    }
}

export default Spotify;