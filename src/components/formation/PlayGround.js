import React from 'react';
import { useRosterContext } from '../../state/RsoterProvider';

function PlayGround() {
  const {
    state: { formation, playerInfo },
    rosterDispatcher,
  } = useRosterContext();
  const handlePlayerInfo = (player) => {
    rosterDispatcher({ type: 'SET_PLAYER_INFO', payload: player });
  };

  return (
    <div className=' w-full relative h-full bg-green-600  rounded-md shadow-2xl p-10'>
      <>
        <div className='fieldLines relative border-[1px] bg-blend-lighten	'>
          <div className=' absolute top-1/2   '>
            {formation?.goalKeeper?.map((player) => (
              <div
                className='flex flex-col justify-center items-center text-white'
                onClick={() => handlePlayerInfo(player)}
              >
                <div
                  className={
                    'player-circle ' +
                    [
                      playerInfo?.jerseyNumber === player.jersey
                        ? 'bg-yellow-600'
                        : '',
                    ]
                  }
                >
                  {player?.jersey}
                </div>
                <div>{player.name}</div>
              </div>
            ))}
          </div>
          <div className=' absolute left-36 inset-x-1/2 flex flex-col items-stretch justify-around h-full text-white '>
            {formation?.defender?.map((player) => (
              <div
                className='flex flex-col justify-center items-center'
                onClick={() => handlePlayerInfo(player)}
              >
                <div
                  className={
                    'player-circle ' +
                    [
                      playerInfo?.jerseyNumber === player.jersey
                        ? 'bg-yellow-600'
                        : '',
                    ]
                  }
                >
                  {player?.jersey}
                </div>
                <div className='w-16 text-center'>{player.name}</div>
              </div>
            ))}
          </div>
          <div className=' absolute left-1/2  top-6  inset-x-1/2 flex flex-col items-stretch justify-around h-full '>
            {formation?.mid?.map((player) => (
              <div
                className='flex flex-col justify-center items-center text-white'
                onClick={() => handlePlayerInfo(player)}
              >
                <div
                  className={
                    'player-circle ' +
                    [
                      playerInfo?.jerseyNumber === player.jersey
                        ? 'bg-yellow-600'
                        : '',
                    ]
                  }
                >
                  {player?.jersey}
                </div>
                <div className='w-16 text-center'>{player.name}</div>
              </div>
            ))}
          </div>
          <div className=' absolute left-2/3 flex flex-col items-stretch justify-around h-full '>
            {formation?.forward?.map((player) => (
              <div
                className='flex flex-col justify-center items-center text-white'
                onClick={() => handlePlayerInfo(player)}
              >
                <div
                  className={
                    'player-circle ' +
                    [
                      playerInfo?.jerseyNumber === player.jersey
                        ? 'bg-yellow-600'
                        : '',
                    ]
                  }
                >
                  {player?.jersey}
                </div>
                <div>{player.name}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
}

export default PlayGround;
