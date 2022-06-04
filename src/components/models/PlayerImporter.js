import React from 'react';

function PlayerPicker({ onFileSelect, send }) {
  return (
    <>
      <div className='model   flex justify-center '>
        <div className='w-[600px] h-[600px] bg-[#383838] p-10 '>
          <div className='flex justify-between border-b-2 px-2 py-2'>
            <div>Importer</div>
            <div onClick={() => send({ type: 'CLOSE_IMPORTER' })}>X</div>
          </div>
          <div>
            <label className='block'>
              <div className='flex '>
                <div>No File Selected</div>
                <div>Select File </div>
              </div>
              <span className='sr-only'>Se File</span>
              <input
                type='file'
                name='file'
                accept='.csv'
                className='hidden'
                onChange={onFileSelect}
              />
            </label>
          </div>
        </div>
      </div>
      <div className='model-bg'></div>
    </>
  );
}

export default PlayerPicker;
