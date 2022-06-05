import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRosterContext } from '../../state/RsoterProvider';
import { UIContext } from '../../state/UIProvider';
import Close from '../icons/CloseIcon';
import EditIcon from '../icons/EditIcon';
import SearchIcon from '../models/SearchIcon';
// import { appMachine } from '../../state/uiMachine;

function TableHeader() {
  const {
    state: { showImporter, showTable },
    uiDispatcher,
  } = useContext(UIContext);

  const {
    state: { players },
    rosterDispatcher,
  } = useRosterContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [team, setTeam] = useState(' Team Name');

  const closeSearch = () => {
    rosterDispatcher({ type: 'SEARCH', payload: '' });
    setSearchTerm('');
  };

  const handleUserKeyPress = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'Enter') {
        rosterDispatcher({ type: 'SEARCH', payload: searchTerm });
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <div className='w-full flex justify-between'>
      <div>
        <div className='text-sm primary-yellow-text'>
          {!showTable ? 'Roster Details' : 'Formation Overview'}
        </div>
        <div className='text-xl text-white font-bold w-full '>
          {isEditing ? (
            <input
              type='text'
              className=' w-56 nutral-bg'
              placeholder='Enter Team Name'
              onChange={(e) => setTeam(e.target.value)}
              onBlur={() => setIsEditing(false)}
            />
          ) : (
            <div className='flex items-center '>
              <div>{team}</div>
              <div onClick={() => setIsEditing(true)} className='mx-4'>
                <EditIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* search and import button */}
      {!showTable ? (
        <div className='flex items-center space-x-5'>
          <div className='relative'>
            <input
              type='text'
              className=' input-primary pl-8'
              placeholder='Find Players '
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='absolute top-2.5 mx-2'>
              <SearchIcon />
            </div>
            {searchTerm ? (
              <div
                className='absolute top-2.5 right-2 mx-2 text-red-500'
                onClick={closeSearch}
              >
                <Close />
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            <button
              className={
                'text-white py-2 rounded-lg px-3 border-color border-2 ' +
                [!players.length ? 'primary-yellow-bg' : '']
              }
              onClick={() =>
                uiDispatcher({
                  type: 'TOGGLE_IMPORTER',
                  payload: !showImporter,
                })
              }
            >
              {!players.length ? 'Import Team' : 'Re-import Team'}
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default TableHeader;
