import React from 'react';

function PlayerSpot({ playerInfo, player, handlePlayerInfo }) {
  return (
    <div
      className='flex flex-col justify-center items-center text-white'
      onClick={() => handlePlayerInfo(player)}
    >
      <div
        className={
          'player-circle ' +
          [playerInfo?.jerseyNumber === player.jersey ? 'bg-yellow-600' : '']
        }
      >
        {player?.jersey}
      </div>
      <div className='w-16 text-center'>{player.name}</div>
    </div>
  );
}

export default PlayerSpot;
