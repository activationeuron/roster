import { assign, createMachine } from 'xstate';
import { sendParent } from 'xstate/lib/actions';

export const editorMachine = createMachine(
  {
    id: 'editor',
    context: {
      playerName: '',
      starter: '',
    },
    initial: 'init',
    states: {
      init: {
        on: {
          EDIT_NAME: {
            actions: 'playerName',
          },
          EDIT_STATER: {
            actions: 'playerName',
          },
        },
      },
      confirm: {},
    },
  },
  {
    actions: {
      playerName: assign((context, events) => {
        alert('a');
        return {
          ...context,
          playerName: events.value,
        };
      }),
    },
  }
);
