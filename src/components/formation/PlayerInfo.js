import React from 'react';

function PlayerInfo({ playerInfo }) {
  return (
    <>
      {playerInfo ? (
        <div className='flex  h-full  flex-col px-5 text-white '>
          <div className=' flex justify-center relative'>
            <img
              src={playerInfo?.playerImage}
              alt={playerInfo?.playerName}
              className='h-96 '
            />
            <div className=' absolute top-10 left-1 text-5xl primary-yellow-text font-normal'>
              <div className='absolute z-20'>{playerInfo.jerseyNumber}</div>
              <div className='text-9xl absolute -top-10  text-yellow-900 opacity-25 -tracking-wider'>
                {playerInfo.jerseyNumber}
              </div>
            </div>
            <div className='absolute bottom-8 left-2  text-4xl '>
              <div>{playerInfo?.playerName}</div>
              <div className='primary-yellow-text text-2xl font-bold tracking-wider'>
                {playerInfo?.pos}
              </div>
            </div>
          </div>
          <div className='flex justify-between py-5'>
            {playerInfoCell({ title: 'Height', info: playerInfo?.height })}
            {playerInfoCell({ title: 'Weight', info: playerInfo?.wight })}
            {playerInfoCell({
              title: 'Nationality',
              info: playerInfo?.nationality,
            })}
          </div>
          <div className='h-1/4 grid grid-cols-2 grid-rows-2  gap-5 py-3 border-t-2 border-color'>
            {playerScores({
              title: 'Appearence',
              info: playerInfo?.appearances,
            })}
            {playerScores({
              title: 'Minutes Played',
              info: playerInfo?.minutesPlayed,
            })}
            {playerScores({
              title: 'Clean Sheets',
              info: playerInfo?.Goals,
            })}
            {playerScores({
              title: 'Saves',
              info: playerInfo?.saves,
            })}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

const playerInfoCell = ({ title, info }) => (
  <div className='space-y-2'>
    <div className='text-lg font-thin'>{title}</div>
    <div className='text-xl font-medium'>{info}</div>
  </div>
);
const playerScores = ({ title, info }) => (
  <div>
    <div className='text-2xl font-bold primary-yellow-text'>{info}</div>
    <div className='text-sm font-medium'>{title}</div>
  </div>
);

export default PlayerInfo;
