import React from 'react';
import { useRosterContext } from '../../state/RsoterProvider';
import PlayerSpot from './PlayerSpot';

function PlayGround() {
  const {
    state: { formation, playerInfo },
    rosterDispatcher,
  } = useRosterContext();
  const handlePlayerInfo = (player) => {
    rosterDispatcher({ type: 'SET_PLAYER_INFO', payload: player });
  };

  return (
    <div className=' w-full relative h-full bg-green-600  rounded-md shadow-2xl p-10 '>
      <div className='h-full radial-bg w-full rounded-md'>
        <div className=' relative border-[1px] bg-blend-lighten 	fieldLines rounded-md'>
          <div className=' absolute top-1/2   '>
            {formation?.goalKeeper?.map((player) => (
              <PlayerSpot
                playerInfo={playerInfo}
                player={player}
                handlePlayerInfo={handlePlayerInfo}
              />
            ))}
          </div>
          <div className=' absolute left-36 inset-x-1/2 flex flex-col items-stretch justify-around h-full text-white '>
            {formation?.defender?.map((player) => (
              <PlayerSpot
                playerInfo={playerInfo}
                player={player}
                handlePlayerInfo={handlePlayerInfo}
              />
            ))}
          </div>
          <div className=' absolute left-1/2  top-6  inset-x-1/2 flex flex-col items-stretch justify-around h-full '>
            {formation?.mid?.map((player) => (
              <PlayerSpot
                playerInfo={playerInfo}
                player={player}
                handlePlayerInfo={handlePlayerInfo}
              />
            ))}
          </div>
          <div className=' absolute left-2/3 flex flex-col items-stretch justify-around h-full '>
            {formation?.forward?.map((player) => (
              <PlayerSpot
                playerInfo={playerInfo}
                player={player}
                handlePlayerInfo={handlePlayerInfo}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayGround;
