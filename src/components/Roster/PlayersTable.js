import React, { useEffect } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { useRosterContext } from '../../state/RsoterProvider';
import { useUiContext } from '../../state/UIProvider';
import PlayerRow from './PlayerRow';

function PlayersTable() {
  // const { state, dispatch } = useUiContext();
  const {
    state: { players, search },
    rosterDispatcher,
  } = useRosterContext();
  const { uiDispatcher } = useUiContext();
  const columns = React.useMemo(
    () => [
      {
        Header: 'Player Name',
        accessor: 'playerName',
        Cell: (props) => (
          <div className='flex justify-start pl-10'>
            <div className='px-2'>
              <img
                src={props.row.original.flagImage}
                alt={props.row.original.nationality}
                className='h-6 w-6 '
              />
            </div>
            <div>{props.row.original.playerName}</div>
          </div>
        ), // accessor is the "key" in the data
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
        Cell: (row) => `${row.row.original.height / 100} m`,
      },
      {
        Header: 'Wight',
        accessor: 'wight',
        Cell: (row) => `${row.row.original.wight} kg`,
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
                rosterDispatcher({
                  type: 'SELECT_PLAYER',
                  payload: { ...row.row.original, id: row.row.index },
                });
                uiDispatcher({ type: 'TOGGLE_EDIT', payload: true });
              }}
            >
              ...
            </button>
          </div>
        ),
      },
    ],
    [rosterDispatcher, uiDispatcher]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data: players }, useGlobalFilter);

  useEffect(() => {
    setGlobalFilter(search || '');
  }, [search, setGlobalFilter]);

  return (
    <div className='nutral-bg-secondary rounded-xl text-white h-[650px] overflow-y-scroll  relative'>
      <table {...getTableProps()} className='w-full relative my-4  '>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className='w-full   '>
          {(players.length &&
            rows.map((row) => {
              prepareRow(row);
              return <PlayerRow row={row} />;
            })) || (
            <div className='w-full flex justify-center  absolute top-72 text-center '>
              <div>
                <div>You do note have any Players in roster </div>
                <div
                  className='primary-yellow-text'
                  onClick={() =>
                    uiDispatcher({
                      type: 'TOGGLE_IMPORTER',
                      payload: true,
                    })
                  }
                >
                  Import Team
                </div>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PlayersTable;
