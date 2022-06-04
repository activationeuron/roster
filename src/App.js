import { useMachine } from '@xstate/react';
import { useContext } from 'react';
import PlayersTable from './components/Roster/PlayersTable';
import TableHeader from './components/Roster/TableHeader';
import PlayerEditor from './components/models/PlayerEditor';
import PlayerImporter from './components/models/PlayerImporter';
import { appMachine } from './state/appMachine';
import { AppContext, AppProvider } from './state/AppState';
import Roster from './components/Roster/Index';

function App() {
  const [state, send] = useContext(AppContext);

  return (
    <div className='App bg-slate-800 min-h-screen min-w-screen '>
      {/* player Modle */}

      <Roster />
    </div>
  );
}

export default App;

// <div>{JSON.stringify(state.context)}</div>
//       <button onClick={() => send('IMPORT_PLAYER')}> select Story </button>
//       {state.matches('playerImporter') ? (
//         <PlayerPicker onFileSelect={onFileSelect} state={state} />
//       ) : (
//         ''
//       )}
