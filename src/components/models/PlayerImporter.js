import React from 'react';
import { useRosterContext } from '../../state/RsoterProvider';
import Close from '../icons/CloseIcon';

function PlayerImporter({ uiDispatch, showImporter }) {
  const {
    state: { csvErr, players },
    rosterDispatcher,
    actions: { handleFileSelect },
  } = useRosterContext();

  return (
    <>
      <div className='model   flex justify-center  '>
        <div className='w-[600px] h-[600px] bg-[#383838] p-10 relative  rounded-xl shadow-xl text-white'>
          <div className='flex justify-between border-color border-b-2  py-2'>
            <div className='font-bold tracking-wider'>Importer</div>
            <div
              onClick={() =>
                uiDispatch({ type: 'TOGGLE_IMPORTER', payload: !showImporter })
              }
              className='cursor-pointer'
            >
              <Close />
            </div>
          </div>
          <div>
            <div className='py-2'>Roster File</div>
            <label for='files' className='block my-5'></label>

            <input
              type='file'
              name='file'
              id='files'
              accept='.csv'
              class={
                'text-sm  rounded-xl ile:mr-5 file:py-2 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-medium border-2 ' +
                [csvErr.length ? 'border-red-500' : 'border-color']
              }
              onChange={(e) => handleFileSelect(e)(rosterDispatcher)}
            />
            {!csvErr.length ? (
              <div className='text-sm '>
                {!players.length ? (
                  <div className='text-gray-500 mx-2 py-2'>
                    {' '}
                    File Must be in .csv format
                  </div>
                ) : (
                  <div className='text-gray-100 font-medium py-2'>
                    Current File Summery
                  </div>
                )}
              </div>
            ) : (
              <div className='text-red-500 py-2 px-2'>
                <div className=''>Error </div>
                {csvErr.slice(0, 4).map((error) => {
                  return <div className='text-sm'>{error}</div>;
                })}
              </div>
            )}
            <div className=''>
              {players.length ? (
                <table class=' '>
                  <thead className=''>
                    <tr className='gap-10 flex  text-sm font-thin my-2'>
                      <th className='font-normal'>Total Players</th>
                      <th className='font-normal'>Defenders</th>
                      <th className='font-normal'>Forward</th>
                      <th className='font-normal'>Midfielder</th>
                      <th className='font-normal'>Goalkeeper</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='gap-10 flex justify-between my-2'>
                      <td>{players.length}</td>
                      <td>
                        {
                          players.filter((item) => item.pos === 'Defender')
                            .length
                        }
                      </td>
                      <td>
                        {
                          players.filter((item) => item.pos === 'Forward')
                            .length
                        }
                      </td>
                      <td>
                        {
                          players.filter((item) => item.pos === 'Midfielder')
                            .length
                        }
                      </td>
                      <td>
                        {
                          players.filter((item) => item.pos === 'Goalkeeper')
                            .length
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                ''
              )}
            </div>
            <div>
              <button
                onClick={() =>
                  uiDispatch({
                    type: 'TOGGLE_IMPORTER',
                    payload: !showImporter,
                  })
                }
                className={
                  'text-white py-2 rounded-lg px-3 border-color border-2 absolute right-5 bottom-5 ' +
                  [!csvErr.length ? 'primary-yellow-bg' : '']
                }
              >
                Import Team
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='model-bg'></div>
    </>
  );
}

export default PlayerImporter;
