import React from 'react';
import { useRosterContext } from '../../state/RsoterProvider';
import { useUiContext } from '../../state/UIProvider';
import Close from '../icons/CloseIcon';

function PlayerRow({ row }) {
  const {
    state: { selectedPlayer },
  } = useRosterContext();
  const {
    state: { editToggle },
    uiDispatcher,
  } = useUiContext();

  const onClose = () => {
    uiDispatcher({ type: 'TOGGLE_EDIT', payload: !editToggle });
  };

  const onEdit = () => {
    uiDispatcher({ type: 'EDIT_TOGGLE_MODEL', payload: true });
  };
  const onDelete = () => {
    uiDispatcher({ type: 'TOGGLE_DELETE', payload: true });
  };
  return (
    <>
      <tr
        {...row.getRowProps()}
        className='text-center relative '
        id={row.index}
      >
        {row.cells.map((cell) => {
          return (
            <td
              key={cell.id}
              {...cell.getCellProps()}
              className='text-center  py-3  '
            >
              {cell.render('Cell')}
            </td>
          );
        })}

        {selectedPlayer?.id === row.index && editToggle && (
          <div className='absolute top-1 right-1  h-28 w-44 z-10 nutral-bg-secondary rounded-xl shadow-2xl'>
            <div className='flex justify-between px-5 py-3  text-white'>
              <div className='font-semibold'>Actions</div>
              <div onClick={() => onClose()}>
                <Close />
              </div>
            </div>
            <div className='flex flex-col justify-start items-start w-full px-5 space-y-4 text-white text-sm'>
              <div
                onClick={() => onEdit()}
                className='flex items-center space-x-2 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 inline-block'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                </svg>
                <span>Edit Player</span>
              </div>
              <div
                onClick={() => onDelete()}
                className='flex items-center space-x-2 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Delete Player</span>
              </div>
            </div>
          </div>
        )}
      </tr>
    </>
  );
}

export default PlayerRow;
