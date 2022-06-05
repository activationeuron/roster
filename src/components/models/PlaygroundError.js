import React from 'react';
import { useUiContext } from '../../state/UIProvider';

function PlaygroundError({ error }) {
  const {
    state: { showTable },
    uiDispatcher,
  } = useUiContext();
  return (
    <>
      <div
        className='model flex justify-center items-center flex-col w-full'
        onClick={() =>
          uiDispatcher({ type: 'TOGGLE_WINDOW', payload: !showTable })
        }
      >
        <div className='w-[400px]  nutral-bg px-10 py-5 rounded-xl shadow-2xl text-white '>
          <div className='text-center font-bold'>{error.error}</div>
          <div className='text-sm'>{error.text}</div>
        </div>
      </div>
      <div className='model-bg'></div>
    </>
  );
}

export default PlaygroundError;
