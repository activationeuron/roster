import React, { useEffect, useState } from 'react';
import { useRosterContext } from '../../state/RsoterProvider';
import { diff } from 'deep-object-diff';
import { useUiContext } from '../../state/UIProvider';
import Close from '../icons/CloseIcon';
function PlayerEditor() {
  const {
    state: { selectedPlayer },
    rosterDispatcher,
  } = useRosterContext();

  const { uiDispatcher } = useUiContext();

  const [player, setPlayer] = useState(selectedPlayer);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    const a = diff(selectedPlayer, player, setPlayer);
    if (Object.keys(a).length !== 0) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [player, selectedPlayer]);

  return (
    <>
      <div className='model flex justify-center '>
        <div className='w-[500px] h-[600px] bg-[#383838] p-10 text-white relative shadow-2xl rounded-xl'>
          <div className='flex justify-between text-white'>
            <div className=' font-bold text-lg'>Edit Player</div>
            <div
              onClick={() =>
                uiDispatcher({ type: 'EDIT_TOGGLE_MODEL', payload: false })
              }
            >
              <Close />
            </div>
          </div>
          <div className='flex w-full py-4 text-white'>
            <div className='w-2/3'>
              <label htmlFor='name' className='my-2'>
                Player Name
              </label>
              <input
                type='text'
                placeholder='Players Name'
                value={player?.playerName}
                name='playerName'
                className='input-primary '
                onChange={(e) =>
                  setPlayer({ ...player, playerName: e.target.value })
                }
              />
            </div>
            <div className='w-1/3'>
              <label htmlFor='name' className='my-2'>
                Jersey Number
              </label>
              <input
                type='number'
                className='input-primary w-full'
                placeholder='Jersy'
                value={player?.jerseyNumber}
                onChange={(e) => {
                  setPlayer({
                    ...player,
                    jerseyNumber: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          {/* height and weight */}
          <div className='flex py-3 space-x-4'>
            <div>
              <label htmlFor='height' className='my-2'>
                Height
              </label>
              <input
                type='number'
                placeholder='Players Wight'
                className='input-primary w-full'
                value={player?.wight}
                onChange={(e) => {
                  setPlayer({ ...player, wight: e.target.value });
                }}
              />
            </div>
            <div>
              <label htmlFor='weight' className='my-2'>
                Weight
              </label>
              <input
                type='number'
                placeholder='Players Name'
                className='input-primary w-full'
                value={player?.height}
                onChange={(e) => {
                  setPlayer({ ...player, height: e.target.value });
                }}
              />
            </div>
          </div>
          <div>
            <label htmlFor='weight' className='my-2'>
              Nationality
            </label>
            <input
              type='text'
              className='input-primary w-full'
              value={player?.nationality}
              onChange={(e) => {
                setPlayer({ ...player, nationality: e.target.value });
              }}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='pos' className='mt-2'>
              Postilions
            </label>
            <select
              value={player.pos}
              onChange={(e) => {
                setPlayer({ ...player, pos: e.target.value });
              }}
              className='py-2 input-primary w-full '
            >
              <option className='input-primary my-2' value='Goalkeeper'>
                Goalkeeper
              </option>
              <option className='input-primary my-2' value='Defender'>
                Defender
              </option>
              <option className='input-primary my-2' value='Midfielder'>
                Midfielder
              </option>
              <option className='input-primary my-2' value='Forward'>
                Forward
              </option>
            </select>
          </div>
          {/* input label */}
          <div className='flex flex-col py-2  '>
            <label htmlFor='Starter' className='py-2'>
              Starter
            </label>
            <div className='flex space-x-2 items-center'>
              <div className='flex space-x-2 items-center'>
                <input
                  type='radio'
                  value='Yes'
                  checked={player?.starter === 'Yes'}
                  className='h-5 w-5 accent-orange-500'
                  name='starter'
                  onChange={(e) =>
                    setPlayer({ ...player, starter: e.target.value })
                  }
                />

                <label htmlFor='Stater'>Yes</label>
              </div>

              <div className='flex space-x-2 items-center'>
                <input
                  type='radio'
                  value='No'
                  name='starter'
                  className='h-5 w-5 accent-orange-500'
                  checked={player?.starter === 'No'}
                  onChange={(e) => {
                    setPlayer({ ...player, starter: e.target.value });
                  }}
                />
                <label htmlFor='Stater'>No</label>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              rosterDispatcher({ type: 'EDIT_PLAYER', payload: player });

              uiDispatcher({ type: 'EDIT_TOGGLE_MODEL', payload: false });
              uiDispatcher({ type: 'TOGGLE_EDIT', payload: false });
            }}
            disabled={!isChanged}
            className={
              'py-3 border-color border-2 px-5 rounded-lg absolute bottom-10 right-10 ' +
              [isChanged ? 'primary-yellow-bg' : '']
            }
          >
            Edit Player
          </button>
        </div>
        {/* name and jersey */}
      </div>
      <div className='model-bg'></div>
    </>
  );
}

export default PlayerEditor;
