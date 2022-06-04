import React, { useContext } from 'react';
import { AppContext } from '../../state/AppState';
import PlayerEditor from '../models/PlayerEditor';
import PlayersTable from './PlayersTable';
import TableHeader from './TableHeader';
import PlayerImporter from '../models/PlayerImporter';
function Roster() {
  const onFileSelect = (event) => {
    console.log(event);
    send({ type: 'FILE_SELECT', value: event });
  };
  const [state, send] = useContext(AppContext);

  return (
    <div className='App bg-slate-800 min-h-screen min-w-screen flex'>
      <div className='w-10 bg-black'></div>
      <div className='w-full p-8'>
        <div className=' flex flex-col w-full'>
          {/* player Modle */}
          {state.matches('playerImporter') ? (
            <PlayerImporter send={send} onFileSelect={onFileSelect} />
          ) : (
            ''
          )}
          {/* Player Editor */}
          {state.matches('editingPlayer') ? (
            <PlayerEditor send={send} state={state} />
          ) : (
            ''
          )}
          <div className='my-4 bg-gray-700 flex flex-col  '>
            <TableHeader
              onFileSelect={onFileSelect}
              send={send}
              state={state}
            />
          </div>
          <PlayersTable state={state} send={send} />
        </div>
      </div>
    </div>
  );
}

export default Roster;
