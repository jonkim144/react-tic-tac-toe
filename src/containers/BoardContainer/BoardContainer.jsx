import React from 'react';
import { Board } from 'components';
import { Engine, GameState, MoveMaker, PieceType, TicTacToeFinder } from 'shared';
import { Button, Container, Dropdown, Header, Input, Segment } from 'semantic-ui-react';

export default class BoardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.updateDifficulty('easy');
    this.state = {
      size: 3,
      pieces: [],
      status: '',
      movesMade: false,
      isEngineOn: true
    };
  }

  componentDidMount() {
    this.reset();
  }

  reset = () => {
    const pieces = [];
    while (pieces.length < this.state.size*this.state.size) {
      pieces.push(PieceType.Empty);
    }
    const ticTacToeFinder = new TicTacToeFinder(pieces.length);
    this.moveMaker = new MoveMaker(pieces, ticTacToeFinder);
    this.engine = new Engine(this.moveMaker, ticTacToeFinder);
    this.isGameOver = false;
    this.setState({ pieces, status: '', movesMade: false, isEngineOn: true });
  };

  tryMakeMoveAt = (location) => {
    if (this.isGameOver) return;

    const { sideToMove } = this.moveMaker;
    let { gameState, pieces } = this.moveMaker.tryMakeMoveAt(location);
    if (!pieces) return;

    this.setState({ movesMade: true, pieces, status: 'Thinking...' }, () => {
      setTimeout(() => {
        let status = '';
        if (GameState.NORMAL === gameState)
        {
          if (this.state.isEngineOn)
          {
            const response = this.makeComputerMove();
            status = response.status;
            pieces = response.pieces;
          }
        }
        else
        {
          status = this.handleGameEnded(gameState, sideToMove);
        }
        this.setState({ pieces, status });
      }, 0);
    });
  };

  makeComputerMove = () => {
    const { sideToMove } = this.moveMaker;
    const { gameState, pieces } = this.engine.makeBestMove(this.depth);
    let status = '';
    if (GameState.NORMAL !== gameState)
    {
      status = this.handleGameEnded(gameState, sideToMove);
    }
    return { status, pieces };
  };

  handleGameEnded = (gameState, lastSideToMove) => {
    this.isGameOver = true;
    if (GameState.DRAW === gameState) return 'Draw !';

    return `${lastSideToMove.toString()} wins!`;
  };

  handleChangeDifficulty = (event, { value }) => {
    this.updateDifficulty(value);
  }

  updateDifficulty = (difficulty) => {
    this.depth = (() => {
      switch (difficulty)
      {
        case 'easy': return 0;
        case 'medium': return 2 + 5 - this.state.size;
        case 'hard': return 5 + 5 - this.state.size;
        default:
          throw new Error(`Unknown difficulty: <${difficulty}>`);
      }
    })();
  };

  handleClickUndo = () => {
    if (this.isGameOver) return;

    const response = this.moveMaker.undoLastMove();
    if (!response) return;

    this.setState({ movesMade: (response.movesLeft > 0), pieces: response.pieces });
  };

  handleClickToggleEngine = () => {
    this.setState((prevState) => ({ isEngineOn: !prevState.isEngineOn }));
  };

  handleClickMakeAIMove = () => {
    if (this.isGameOver) return;

    this.setState({ pieces: this.makeComputerMove() });
  };

  handleChangeSize = (event, { value }) => {
    this.setState({ size: value }, this.reset);
  };

  render() {
    return (
      <Container>
        <Segment basic>
          <Header>Tic-Tac-Toe</Header>
          <Button onClick={this.reset}>New Game</Button>
          <Dropdown
            header='Difficulty'
            defaultValue='easy'
            onChange={this.handleChangeDifficulty}
            options={[
              { key: 'easy', text: 'Easy', value: 'easy' },
              { key: 'medium', text: 'Medium', value: 'medium' },
              { key: 'hard', text: 'Hard', value: 'hard' },
            ]}
          />
          <Input type='number' defaultValue={3} min={3} max={5} onChange={this.handleChangeSize} />
        </Segment>
        <Segment basic>
          <Board pieces={this.state.pieces} onLocationClicked={this.tryMakeMoveAt} />
        </Segment>
        <Segment basic>
          <Header>{this.state.status}</Header>
          <Button disabled={!this.state.movesMade} onClick={this.handleClickUndo}>Undo</Button>
          <Button onClick={this.handleClickToggleEngine}>Engine is {this.state.isEngineOn ? "on" : "off"}</Button>
          <Button onClick={this.handleClickMakeAIMove} disabled={!this.state.isEngineOn}>Make AI move</Button>
        </Segment>
      </Container>
    );
  }
};
