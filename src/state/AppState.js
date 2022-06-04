import { useMachine } from '@xstate/react';
import { createContext } from 'react';
import { appMachine } from './appMachine';
// import { appMachine } from './appMachine';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [state, send] = useMachine(appMachine);
  // const machine = [state, send, service];

  return (
    <AppContext.Provider value={[state, send]}>{children}</AppContext.Provider>
  );
};
