/* eslint-disable array-callback-return */
import CSVFileValidator from 'csv-file-validator';
import { CSVConfig } from '../utils/csvConfig';
import { useReducer, createContext, useContext } from 'react';

export const RosterContext = createContext({});

const initialState = {
  players: [],
  csvErr: [],
  selectedPlayer: {},
  matchPlayer: [],
  matchError: null,
  formation: {},
  playerInfo: null,
  search: '',
};
const actions = {
  handleFileSelect: (event) => (dispatch) =>
    new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function (event) {
        CSVFileValidator(event.target.result, CSVConfig).then((csvData) => {
          if (!csvData.inValidMessages.length) {
            resolve(
              dispatch({ type: 'ROSTER_PLAYERS', payload: csvData.data })
            );
          } else {
            resolve(
              dispatch({ type: 'CSV_ERROR', payload: csvData.inValidMessages })
            );
          }
        });
      };
      reader.onerror = reject;
      reader.readAsText(event.target.files[0]);
    }),
  // create formations
  makeFormation: (matchPlayers) => (dispatch) => {
    if (matchPlayers.length === 0) {
      dispatch({
        type: 'SET_MATCH_ERROR',
        payload: {
          error: 'No Player data found',
          text: 'Please import your roster first',
        },
      });
      return;
    }

    if (!(matchPlayers.length === 11)) {
      dispatch({
        type: 'SET_MATCH_ERROR',
        payload: {
          error:
            matchPlayers.length > 11
              ? 'Not Many starter'
              : 'Not enough starter',
          text: 'Your team doesn’t have enough starters  for one or more of the positions in the 4-3-3 formation',
        },
      });
      return;
    }

    let setup = {
      forward: [],
      mid: [],
      defender: [],
      goalKeeper: [],
    };
    matchPlayers.map(function (player) {
      if (player.pos === 'Forward') {
        setup = {
          ...setup,
          forward: [
            ...setup.forward,
            { name: player.playerName, jersey: player.jerseyNumber },
          ],
        };
      }
      if (player.pos === 'Midfielder') {
        setup = {
          ...setup,
          mid: [
            ...setup.mid,
            { name: player.playerName, jersey: player.jerseyNumber },
          ],
        };
      }

      if (player.pos === 'Defender') {
        setup = {
          ...setup,
          defender: [
            ...setup.defender,
            { name: player.playerName, jersey: player.jerseyNumber },
          ],
        };
      }
      if (player.pos === 'Goalkeeper') {
        setup = {
          ...setup,
          goalKeeper: [
            ...setup.goalKeeper,
            { name: player.playerName, jersey: player.jerseyNumber },
          ],
        };
      }
    });
    if (setup.goalKeeper.length === 1) {
      if (
        setup.forward.length === 3 &&
        setup.mid.length === 3 &&
        setup.defender.length === 4
      ) {
        dispatch({
          type: 'SET_MATCH_ERROR',
          payload: null,
        });

        dispatch({
          type: 'SET_MATCH_FORMATIONS',
          payload: setup,
        });
      } else {
        dispatch({
          type: 'SET_MATCH_ERROR',
          payload: {
            error: 'No enough players',
            text: 'YYour team doesn’t have enough starters  for one or more of the positions in the 4-3-3 formation',
          },
        });
      }
    } else {
      dispatch({
        type: 'SET_MATCH_ERROR',
        payload: {
          error: 'No Goal Keeper',
          text: 'Your Team Need Goal Keeper',
        },
      });
    }
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ROSTER_PLAYERS':
      return {
        ...state,
        players: action.payload,
        csvErr: [],
      };
    case 'CSV_ERROR':
      return {
        ...state,
        csvErr: action.payload,
        players: [],
      };

    // to select player for edit and delete
    case 'SELECT_PLAYER':
      return {
        ...state,
        selectedPlayer: action.payload,
      };

    case 'EDIT_PLAYER':
      return {
        ...state,
        players: state.players.map((player) =>
          player.jerseyNumber === action.payload.jerseyNumber
            ? action.payload
            : player
        ),
      };
    case 'DELETE_PLAYER':
      return {
        ...state,
        players: state.players.filter(
          (player) => player.jerseyNumber !== action.payload.jerseyNumber
        ),
        selectedPlayer: {},
      };
    case 'SET_MATCH_PLAYERS':
      return {
        ...state,
        matchPlayer: action.payload,
      };
    case 'SET_MATCH_ERROR':
      return {
        ...state,
        matchError: action.payload,
      };
    case 'SET_MATCH_FORMATIONS':
      return {
        ...state,
        formation: action.payload,
      };
    case 'SET_PLAYER_INFO':
      return {
        ...state,
        playerInfo: state.matchPlayer.filter(
          (player) => player.jerseyNumber === action.payload.jersey
        )[0],
      };

    case 'SEARCH':
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};
const RosterProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RosterContext.Provider
      value={{ state, rosterDispatcher: dispatch, actions }}
    >
      {props.children}
    </RosterContext.Provider>
  );
};

export const useRosterContext = () => useContext(RosterContext);

export default RosterProvider;
