import React from 'react';
import PlayerEditor from '../models/PlayerEditor';
import PlayersTable from './PlayersTable';
import TableHeader from './TableHeader';
import PlayerImporter from '../models/PlayerImporter';
import { useUiContext } from '../../state/UIProvider';
import DeletePlayer from '../models/DeletePlayer';
import Formations from '../formation/Index';
function Roster() {
  const {
    state: { showImporter, editorModel, deletingPlayer, showTable },
    uiDispatcher,
  } = useUiContext();

  return (
    <div className='App bg-[#222222] min-h-screen min-w-screen flex'>
      <div className='w-full p-8 flex '>
        <div className=' flex flex-col  w-full'>
          {showImporter ? (
            <PlayerImporter
              uiDispatch={uiDispatcher}
              showImporter={showImporter}
            />
          ) : (
            ''
          )}
          {/* show model when deleing  */}
          {deletingPlayer ? <DeletePlayer /> : ''}

          {editorModel ? <PlayerEditor /> : ''}
          <div className='my-4  flex flex-col '>
            <TableHeader />
          </div>
          <>{!showTable ? <PlayersTable /> : <Formations />}</>
        </div>
      </div>
    </div>
  );
}

export default Roster;
