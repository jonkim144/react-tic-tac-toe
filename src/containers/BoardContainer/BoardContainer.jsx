import React from 'react';
import { Board } from 'components';
import { Engine, GameState, MoveMaker, PieceType, TicTacToeFinder } from 'shared';
import { Dropdown, Button, Container, Header, Segment } from 'semantic-ui-react';

const DEFAULT_DEPTH = 0;

export default class BoardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.depth = DEFAULT_DEPTH;
    this.state = { pieces: [], status: '' };
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
    this.setState({ pieces, status: '' });
  };

  tryMakeMoveAt = (location) => {
    if (this.isGameOver) return;

    let { gameState, pieces } = this.moveMaker.tryMakeMoveAt(location);
    if (!pieces) return;

    if (GameState.NORMAL === gameState)
    {
      pieces = this.makeComputerMove();
    }
    else
    {
      this.handleGameEnded(gameState, true);
    }
    this.setState({ pieces });
  };

  makeComputerMove = () => {
    const { gameState, pieces } = this.engine.makeBestMove(this.depth);
    if (GameState.NORMAL !== gameState)
    {
      this.handleGameEnded(gameState, false);
    }
    return pieces;
  };

  handleGameEnded = (gameState, wasUserLastToMove) => {
    if (GameState.DRAW === gameState)
    {
      this.setState({ status: "Draw!" })
    }
    else
    {
      this.setState({ status: (wasUserLastToMove ? "You win!" : "Computer wins!") })
    }
    this.isGameOver = true;
  };

  handleChangeDifficulty = (event, data) => {
    this.depth = data.value;
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
        </Segment>
      </Container>
    );
  }
};
