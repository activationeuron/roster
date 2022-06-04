import { useMachine } from '@xstate/react';
import React from 'react';
import { appMachine } from '../../state/appMachine';

function TableHeader({ state, send }) {
  return (
    <div className='w-full flex justify-between'>
      <div>
        <div className='text-sm'>Roster Details</div>
        <div className='text-xl'>Paris Saint-Germain F.C.</div>
      </div>
      {/* search and import button */}
      <div className=' flex  items-center space-x-5'>
        <div>
          <input
            type='text'
            className=' bg-gray-700 border-2 border-gray-500 py-2 px-5 rounded-lg'
            placeholder='Find Players '
          />
        </div>
        <div>
          <button
            className='bg-yellow-500 text-white py-2 rounded-lg px-3'
            onClick={() => send({ type: 'OPEN_IMPORTER' })}
          >
            {state.value}| Import Team
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
