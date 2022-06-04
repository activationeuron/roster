import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../state/AppState';
import { useTable, useFilters, useSortBy } from 'react-table';
import PlayerRow from './PlayerRow';

function PlayersTable() {
  const [state, send] = useContext(AppContext);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Player Name',
        accessor: 'playerName', // accessor is the "key" in the data
      },
      {
        Header: 'Jersey Number',
        accessor: 'jerseyNumber',
      },
      {
        Header: 'Starter',
        accessor: 'starter',
      },
      {
        Header: 'Positions',
        accessor: 'pos',
      },
      {
        Header: 'Height',
        accessor: 'height',
      },
      {
        Header: 'Wight',
        accessor: 'wight',
      },
      {
        Header: 'Nationality',
        accessor: 'nationality',
      },
      {
        Header: 'Minutes Played',
        accessor: 'minutesPlayed',
      },
      {
        Header: '',
        accessor: 'action',
        Cell: (row) => (
          <div>
            <button
              onClick={(e) => {
                send({
                  type: 'EDIT_PLAYER',
                  value: { ...row.row.original, id: row.row.index },
                });
              }}
            >
              ...
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: state.context.players });
  return (
    <div className='bg-gray-600  h-[750px] overflow-y-scroll  '>
      <table {...getTableProps()} className='w-full'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className='w-full'>
          {rows.map((row) => {
            prepareRow(row);
            return <PlayerRow row={row} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PlayersTable;
