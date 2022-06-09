import { useUiContext } from './state/UIProvider';

import RosterWindow from './components/roster/Index';
import Logo from './components/icons/LogoIcon';
import RosterIcon from './components/icons/RosterIcon';
import PlayGroundIcon from './components/icons/PlayGroundIcon';
function App() {
  const {
    state: { showTable },
    uiDispatcher,
  } = useUiContext();
  return (
    <div className='App bg-slate-800 min-h-screen min-w-screen flex'>
      <div className='w-14 bg-gray-800 flex  flex-col my-10 items-center space-y-8'>
        <Logo />
        <div
          onClick={() =>
            uiDispatcher({ type: 'TOGGLE_WINDOW', payload: false })
          }
        >
          <RosterIcon active={showTable} />
        </div>
        <div
          onClick={() => uiDispatcher({ type: 'TOGGLE_WINDOW', payload: true })}
        >
          <PlayGroundIcon active={!showTable} />
        </div>
      </div>
      <div className='w-screen'>
        <RosterWindow />
      </div>
    </div>
  );
}

export default App;
