import React, { useEffect } from 'react';
import { useRosterContext } from '../../state/RsoterProvider';
import PlaygroundError from '../models/PlaygroundError';
import PlayerInfo from './PlayerInfo';
import PlayGround from './PlayGround';

function Formations() {
  const {
    state: { players, matchError, playerInfo },
    rosterDispatcher,
    actions: { makeFormation },
  } = useRosterContext();

  useEffect(() => {
    const matchPlayers = players.filter((player) => player.starter === 'Yes');
    rosterDispatcher({ type: 'SET_MATCH_PLAYERS', payload: matchPlayers });
    makeFormation(matchPlayers)(rosterDispatcher);
  }, []);

  return (
    <div className=' w-full flex flex-grow space-x-6'>
      {matchError ? <PlaygroundError error={matchError} /> : null}
      <div className='w-3/4   '>
        <PlayGround playerInfo={playerInfo} />
      </div>
      <div className='flex-grow nutral-bg-secondary rounded-md shadow-xl'>
        {playerInfo ? <PlayerInfo playerInfo={playerInfo} /> : ''}
      </div>
    </div>
  );
}

export default Formations;
