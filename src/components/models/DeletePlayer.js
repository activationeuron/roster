import React from 'react';
import { useRosterContext } from '../../state/RsoterProvider';
import { useUiContext } from '../../state/UIProvider';
import Close from '../icons/CloseIcon';

function DeletePlayer() {
  const { uiDispatcher } = useUiContext();
  const {
    state: { selectedPlayer },
    rosterDispatcher,
  } = useRosterContext();
  const handleClose = () => {
    uiDispatcher({ type: 'TOGGLE_DELETE', payload: false });
  };
  const handleDelete = () => {
    rosterDispatcher({ type: 'DELETE_PLAYER', payload: selectedPlayer });
    uiDispatcher({ type: 'TOGGLE_DELETE', payload: false });
  };
  return (
    <>
      <div className='model flex justify-center  '>
        <div className='nutral-bg-secondary w-72 h-36 rounded-xl px-5 py-4 flex flex-col justify-between text-white'>
          <div className=' font-semibold flex justify-between'>
            <div>Are you sure ?</div>
            <div className='cursor-pointer' onClick={handleClose}>
              <Close />
            </div>
          </div>
          <div>This Action cannot be undone </div>
          <div className='self-end space-x-3'>
            <button
              className='py-1 border-color border-2 px-3 rounded-xl'
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className='py-1 border-color border-2 px-3 rounded-xl bg-red-600'
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className='model-bg'></div>
    </>
  );
}

export default DeletePlayer;
