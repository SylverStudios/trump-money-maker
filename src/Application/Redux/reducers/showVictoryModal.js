import numeral from 'numeral';
import React from 'react';

export default function (state) {
  const gameTimeSeconds = Math.floor(new Date().getTime() - state.startTime) / 1000;
  const readableGameTime = numeral(gameTimeSeconds).format('00:00:00');
  const devBestTime = numeral(405).format('00:00:00');

  const body =
    (<div>
      You just completely monopolized the United States!
      Who cares about being president when you have your own
      fucking ISS!
      <br></br><br></br>
      It only took you {readableGameTime}
      <br></br><br></br>
      Think you can go faster than the Robbie? The time to beat is {devBestTime}
    </div>);

  // This is a hack. I made modals to be static, and it turns out I forgot this dynamic one
  const victoryModalType = {
    title: 'Congratulations!',
    style: 'simple-modal',
    body: body,
    next: null,
  };

  return victoryModalType;
}
