export default class TicTacToeFinder
{
  constructor(totalLocations) {
    this.ticTacToeLocationSetsByLocation = {};
    const size = Math.sqrt(totalLocations);
    // diagonal 1
    this.initializeTicTacToeLocationSets(0, (i) => (i < totalLocations), size+1);
    // diagonal 2
    this.initializeTicTacToeLocationSets(size-1, (i) => (i === size-1 || i % size !== size-1), size-1);
    // columns
    for (let columnStart = 0; columnStart < size; ++columnStart)
    {
      this.initializeTicTacToeLocationSets(columnStart, (i) => (i < totalLocations), size);
    }
    // rows
    for (let rowStart = 0; rowStart < totalLocations; rowStart += size)
    {
      this.initializeTicTacToeLocationSets(rowStart, (i) => (i === rowStart || (i % size !== 0)), 1);
    }
  }

  initializeTicTacToeLocationSets = (start, until, increment) => {
    let ticTacToeLocations = [];
    for (let i = start; until(i); i += increment)
    {
      if (!this.ticTacToeLocationSetsByLocation[i])
      {
        this.ticTacToeLocationSetsByLocation[i] = [];
      }
      this.ticTacToeLocationSetsByLocation[i].push(ticTacToeLocations);
      ticTacToeLocations.push(i);
    }
  };

  isTicTacToe = (pieces, location) => {
    const toMatch = pieces[location];
    const locationSets = this.ticTacToeLocationSetsByLocation[location];
    for (let i = 0; i < locationSets.length; ++i)
    {
      const locationSet = locationSets[i];
      let matches = 0;
      for (let j = 0; j < locationSet.length; ++j)
      {
        const location = locationSet[j];
        if (pieces[location] === toMatch)
        {
          ++matches;
        }
      }
      if (matches === locationSet.length)
      {
        return true;
      }
    }
    return false;
  };
}
