import { createContext } from 'react';
import { assign, createMachine, send, spawn } from 'xstate';
import CSVFileValidator from 'csv-file-validator';
import { CSVConfig } from '../utils/csvConfig';

import { editorMachine } from './editorMachine';

const parseFile = (context, event) => {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function (event) {
      CSVFileValidator(event.target.result, CSVConfig).then((csvData) => {
        console.log(csvData);
        if (!csvData.inValidMessages.length) {
          resolve({ success: true, result: csvData.data });
        } else {
          resolve({ success: false, result: csvData.inValidMessages });
        }
      });
    };
    reader.onerror = reject;
    console.log(event.value.target.files[0]);
    reader.readAsText(event.value.target.files[0]);
  });
};

export const appMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0BbZBLAdgMQDyACgKIByA+gJICypxASgCrnOKioD2suAF1w98XEAA9EAZgBMGAOwBOKQBYArADYZKjRsU6NAGhABPaRoAcGAAyLraiyouKllqfIC+H42kw4ChOQAIrSs1KQAMgCCAJocYrz8QiJikgiyCsrqWgb6usZmCDIyUhgaAIwu8vJSajJqatYaKl4+6BioADbIJmAATrRYvH0C-YQAYrQR5NQAyuTTAMKsCXyCwqJIEogq5eVl5cVqKjIWDu4F0hbWGCen146ah60gvh3dvQNDPCNjDExsVZJDapRD1KxSOxSSyKBpqKQWeRqS7pPZlGTlCynFT2bTPbyvdpdHr9QbDUZ9QiLCLEeZ0RgsdicLaJdYpLZpDJKVSabS6PJGUzSGQ3co6RxIxQWdwaF5vVDIPr8fBQILIATIQgQERgDAEABuPAA1rrSIrYGBxrhOmAgWzNqA0rt9hUjicztL5CiZMoMPD4XZYdZysGLHL2pBBKQPmNgqFwtE4szuGtkg7tghnQc3adzl6hUV1H7FOUNPCy-ZbPDw5hIwJoyTKUEFuR2AnYvEWamQRywdpboiSg15CKLOUUZiNOjTi5ympqliVFIaxg6w3PlSafM7WnQQh52V5CoahU5w5jlIJ9CFLJTkf59YcU4V3WCFB12NtfhdQbjbq6z8O49o6OxSKUqi1CU7jFPUsITvIGAyBoj6YtcI4qCcigyC+EDrCqH6UtStLkEB7KgIU5RHhg5QQU4WJSNYIrHsYaRYghNTWGcj4cboXgEvgPAQHAYhvP46asruvYIAAtDRU6KPo1jyBoCLikuyIFhBiEQf6SLQvYK7Ep8ZI-BSpHpmkGJTscLj1HO+hIii0IqH6ZaaA+ThgbKBLyuab5qhq5l7vOVjNLUkKWCKjSXppGSwlIIbyGcKiKDCag4VGMZ9EFUnFAh2iqPIc46GKY6KN6kKuboqjqDUR7KRlQj4VlOUgfuSVlOpEVYpWMUUVRNFLnRJSMdxNatRmsnIRgCk4spqmWOpKLSQ0N5ge6noMSlfEeEAA */
  createMachine(
    {
      context: { players: [], teamName: '', error: [], currentPlayer: {} },
      id: 'app',
      initial: 'main',
      states: {
        main: {
          on: {
            OPEN_IMPORTER: {
              target: 'playerImporter',
            },
            EDIT_PLAYER: {
              actions: 'selectCurrent',
              target: 'editPlayer',
            },
          },
        },
        playerImporter: {
          on: {
            FILE_SELECT: {
              target: 'parsingData',
            },
            IMPORT: {},
            CLOSE_IMPORTER: {
              target: 'main',
            },
          },
        },
        parsingData: {
          invoke: {
            src: (context, event) => parseFile(context, event),
            id: 'ParseFile',
            onDone: [
              {
                actions: 'setPlayers',
                target: 'playerImporter',
              },
            ],
          },
        },
        editPlayer: {
          on: {
            EDIT_PLAYER: {
              target: 'editingPlayer',
            },
            DELETE_PLAYER: {},
            CLOSE: {
              actions: 'deselectPlayer',
              target: 'main',
            },
          },
        },
        editingPlayer: {
          invoke: {
            src: editorMachine,
            id: 'editor',
            onDone: [
              {
                actions: 'playerEditing',
                target: 'main',
              },
            ],
          },
          on: {
            CLOSE: {
              target: 'editPlayer',
            },
          },
        },
      },
    },
    {
      actions: {
        setPlayers: assign((context, events) => {
          const {
            data: { success, result },
          } = events;

          if (success) {
            return {
              ...context,
              players: result,
            };
          } else {
            return {
              ...context,
              error: result,
            };
          }
        }),
        selectCurrent: assign((context, event) => {
          return {
            ...context,
            currentPlayer: event.value,
          };
        }),
        playerEditing: assign((context, event) => {
          alert('');
        }),
        deselectPlayer: assign((context, event) => {
          return { ...context, currentPlayer: {} };
        }),
        selectFile: (context, event) => {
          // select players
          // const reader = new FileReader();
          // let contents = '';
          // reader.onload = function (event) {
          //   console.log(event.target.result, 'rvent');
          //   contents = event.target.result;
          //   // CSVFileValidator(event.target.result, CSVConfig).then((csvData) => {
          //   //   // return { ...context, players: [{ sad: 'asas' }]
          //   //   // if (!csvData.inValidMessages.length) {
          //   //   //   return csvData.data;
          //   //   // } else {
          //   //   //   return csvData.inValidMessages;
          //   //   // }
          //   // });
          // };
          // reader.readAsText(event.value.target.files[0]);
          // console.log(reader.result, 'players');
          // console.log(contents, 'eontexts');

          return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onload = function (event) {
              resolve({ players: event.target.result });
            };
            reader.onerror = reject;
            reader.readAsText(event.value.target.files[0]);
          });

          // return {
          //   ...context,
          //   players: reader.csvData || [{ test: 'rtes' }],
          //   error: reader.csvError,
          // };
        },
      },
      guards: {},
    }
  );
