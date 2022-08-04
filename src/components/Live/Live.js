import React from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import { useParams } from 'react-router-dom';

function Live() {

  let {slug} = useParams();
  console.log(slug);

  return (
    <div className="containerDecale">
      <ReactTwitchEmbedVideo
        height="754"
        width="100%"
        channel={slug}
      />
    </div>
  );
}

export default Live