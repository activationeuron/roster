import React, { useContext } from 'react';
import { AppContext } from '../../state/AppState';

function PlayerRow({ row }) {
  const [state, send] = useContext(AppContext);
  const {
    context: { currentPlayer },
  } = state;
  return (
    <>
      <tr {...row.getRowProps()} className='text-center relative'>
        {row.cells.map((cell) => {
          return (
            <td key={cell.id} {...cell.getCellProps()}>
              {cell.render('Cell')}
            </td>
          );
        })}
        {currentPlayer.id === row.index && state.matches('editPlayer') && (
          <div className='absolute top-1 right-1 bg-slate-400 h-28 w-44 z-10'>
            <div className='flex justify-between px-5 py-5'>
              <div>Actions</div>
              <div onClick={() => send('CLOSE')}>X</div>
            </div>
            <div onClick={() => send({ type: 'EDIT_PLAYER' })}>Edit Player</div>
            <div>Delete Player</div>
          </div>
        )}
      </tr>
    </>
  );
}

export default PlayerRow;
