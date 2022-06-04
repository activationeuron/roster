const requiredError = (headerName, rowNumber, columnNumber) => {
  return `${headerName} is required in the ${rowNumber} row ${columnNumber} column`;
};

export const CSVConfig = {
  headers: [
    {
      name: 'Player Name',
      inputName: 'playerName',
      required: true,
      requiredError,
    },
    {
      name: 'Player Image',
      inputName: 'playerImage',
      required: true,
      requiredError,
      optional: true,
    },
    {
      name: 'Jersey Number',
      inputName: 'jerseyNumber',
      required: true,
      requiredError,
      unique: true,
    },
    {
      name: 'Position',
      inputName: 'pos',
      required: true,
      requiredError,
    },
    {
      name: 'Height',
      inputName: 'height',
      required: true,
      requiredError,
    },
    {
      name: 'Weight',
      inputName: 'wight',
      required: true,
      requiredError,
    },
    {
      name: 'Nationality',
      inputName: 'nationality',
      required: true,
      requiredError,
    },
    {
      name: 'Flag Image',
      inputName: 'flagImage',
      required: true,
      requiredError,
    },
    {
      name: 'Starter',
      inputName: 'starter',
      required: true,
      requiredError,
    },
    {
      name: 'Appearances',
      inputName: 'appearances',
      required: true,
      requiredError,
    },
    {
      name: 'Minutes Played',
      inputName: 'minutesPlayed',
      required: true,
      requiredError,
    },
    {
      name: 'Goals ',
      inputName: 'Goals',
      // required: true,
      // requiredError,
    },
    {
      name: 'Assists',
      inputName: 'assists',
      // required: true,
      // requiredError,
    },
    {
      name: 'Clean Sheets',
      inputName: 'cleanSheets',
      // required: true,
      // requiredError,
    },
    {
      name: 'Saves',
      inputName: 'saves',
      // required: true,
      // requiredError,
    },
  ],
};
