import { createContext, useContext, useReducer } from 'react';

export const UIContext = createContext();
const actions = {
  editorToggle: () => async (dispatch) => {},
};
const initialState = {
  showTable: false,
  editToggle: false,
  showImporter: false,
  editorModel: false,
  deletingPlayer: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_WINDOW':
      return {
        ...state,
        showTable: action.payload,
      };
    case 'TOGGLE_IMPORTER':
      return {
        ...state,
        showImporter: action.payload,
      };
    case 'TOGGLE_EDIT':
      return {
        ...state,
        editToggle: action.payload,
      };

    case 'EDIT_TOGGLE_MODEL':
      return {
        ...state,
        editorModel: action.payload,
      };
    case 'TOGGLE_DELETE':
      return {
        ...state,
        deletingPlayer: action.payload,
      };
    default:
      return state;
  }
};
const UIProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UIContext.Provider value={{ state, uiDispatcher: dispatch, actions }}>
      {props.children}
    </UIContext.Provider>
  );
};

export const useUiContext = () => useContext(UIContext);

export default UIProvider;
