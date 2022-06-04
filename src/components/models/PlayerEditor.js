import React from 'react';

function PlayerEditor({ state, send }) {
  const {
    context: { currentPlayer },
  } = state;
  return (
    <>
      <div className='model flex justify-center '>
        <div className='w-[500px] h-[600px] bg-[#383838] p-10'>
          {state.value}
          <div>Edit Player</div>
          <div onClick={() => send({ type: 'CLOSE' })}>X</div>
          <div className='space-x-4'>
            <input
              type='text'
              placeholder='Players Name'
              value={currentPlayer.playerName}
              onChange={() => {}}
            />
            <input
              type='text'
              placeholder='Players Name'
              value={currentPlayer.jerseyNumber}
              onChange={() => {}}
            />
          </div>
          {/* height and weight */}
          <div>
            <input
              type='text'
              placeholder='Players Wight'
              value={currentPlayer.wight}
              onChange={() => {}}
            />
            <input
              type='text'
              placeholder='Players Name'
              value={currentPlayer.height}
              onChange={() => {}}
            />
          </div>
          <div>
            Natonality
            <input
              type='text'
              value={currentPlayer.nationality}
              onChange={() => {}}
            />
          </div>

          <div>
            Postition
            <input type='text' value={currentPlayer.pos} onChange={() => {}} />
          </div>
          <div>
            <label htmlFor='Stater'>
              NO
              <input type='radio' name='starter' onChange={() => {}} />
            </label>
            <label htmlFor='Stater'>
              yes
              <input type='radio' name='starter' onChange={() => {}} />
            </label>
          </div>

          <div onClick={() => send({ type: 'EDIT_NAME' })}>test</div>
        </div>
        {/* name and jersey */}
      </div>
      <div className='model-bg'></div>
    </>
  );
}

export default PlayerEditor;
