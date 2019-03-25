import React from 'react';
import Elm from 'react-elm-components'
import { Scoreboard } from '../../Models/scoreboard.js'

function render(props) {
  var gameId = "a60eb72b-13c7-4df5-beb4-0d8f5d26715b" // tmm id
  var score = 80

  var flags = { gameId: gameId, score: score };
  return <Elm src={Scoreboard} flags={flags} />
}
