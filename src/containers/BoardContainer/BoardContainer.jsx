import React from 'react';
import { Board } from 'components';
import { Engine, GameState, MoveMaker, PieceType, TicTacToeFinder } from 'shared';
import { Dropdown, Button, Container, Header, Segment } from 'semantic-ui-react';

const DEFAULT_DEPTH = 0;

export default class BoardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.depth = DEFAULT_DEPTH;
    this.state = { pieces: [], status: '', movesMade: false, isEngineOn: true };
  }

  componentDidMount() {
    this.reset();
  }

  reset = () => {
    const pieces = [];
    while (pieces.length < this.props.size*this.props.size) {
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

    this.setState({ movesMade: true });
    if (GameState.NORMAL === gameState)
    {
      if (this.state.isEngineOn)
      {
        pieces = this.makeComputerMove();
      }
    }
    else
    {
      this.handleGameEnded(gameState, sideToMove);
    }
    this.setState({ pieces });
  };

  makeComputerMove = () => {
    const { sideToMove } = this.moveMaker;
    const { gameState, pieces } = this.engine.makeBestMove(this.depth);
    if (GameState.NORMAL !== gameState)
    {
      this.handleGameEnded(gameState, sideToMove);
    }
    return pieces;
  };

  handleGameEnded = (gameState, lastSideToMove) => {
    if (GameState.DRAW === gameState)
    {
      this.setState({ status: "Draw!" })
    }
    else
    {
      this.setState({ status: `${lastSideToMove.toString()} wins!` });
    }
    this.isGameOver = true;
  };

  handleChangeDifficulty = (event, data) => {
    this.depth = data.value;
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

  render() {
    return (
      <Container>
        <Segment basic>
          <Header>Tic-Tac-Toe</Header>
          <Button onClick={this.reset}>New Game</Button>
          <Dropdown
            header='Difficulty'
            defaultValue={DEFAULT_DEPTH}
            onChange={this.handleChangeDifficulty}
            options={[
              { key: 'easy', text: 'Easy', value: DEFAULT_DEPTH },
              { key: 'medium', text: 'Medium', value: 2 },
              { key: 'hard', text: 'Hard', value: 8 },
            ]}
          />
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
