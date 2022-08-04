import React, { useState, useEffect } from "react";
import api from "../../api";

function Sidebar() {

  const [topStreams, setTopStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get('https://api.twitch.tv/helix/streams');

      let dataArray = result.data.data;

      // For have the name of game
      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });
      // For have profile image and login of user
      let userIDs = dataArray.map((stream) => {
        return stream.user_id;
      });

      // Creation of personalized urls
      let baseUrlGames = 'https://api.twitch.tv/helix/games?';
      let baseUrlUsers = 'https://api.twitch.tv/helix/users?';

      let queryParamsGame = "";
      let queryParamsUsers = "";

      gameIDs.map(id => {
        return (queryParamsGame = queryParamsGame + `id=${id}&`)
      })      
      userIDs.map(id => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
      })

      // Final URL
      let urlFinalGames = baseUrlGames + queryParamsGame;
      let urlFinalUsers = baseUrlUsers + queryParamsUsers;

      // Call
      let gamesNames = await api.get(urlFinalGames);
      let getUsers = await api.get(urlFinalUsers);

      let gamesNameArray = gamesNames.data.data;
      let arrayUsers = getUsers.data.data;

      // Creation of final array
      let finalArray = dataArray.map(stream => {

        stream.gameName = "";
        stream.truePic = "";
        stream.login = "";

        gamesNameArray.forEach(name => {
          arrayUsers.forEach(user => {
            if(stream.user_id === user.id && stream.game_id === name.id) {
                stream.truePic = user.profile_image_url;
                stream.gameName = name.name;
                stream.login = user.login;
            }
          })
        })
        return stream;
      })
      setTopStreams(finalArray.slice(0,6))
    }
    fetchData();
  },[])

  return (
    <div className="sidebar">
      <h2 className="titreSidebar">Chaînes recommandées</h2>
      <ul className="listeStream">
        {topStreams.map((stream, index) => (
          <li key={index} className="containerFlexSidebar">
            <img src={stream.truePic} alt="logo user" className="profilePicRonde" />
            <div className="streamUser">{stream.user_name}</div>
            <div className="viewerRight">
              <div className="pointRouge"></div>
              <div>{stream.viewer_count}</div>
            </div>
            <div className="gameNameSidebar">{stream.gameName}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar;