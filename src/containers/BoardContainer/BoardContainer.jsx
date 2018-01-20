import React from 'react';
import { Board } from 'components';
import { Engine, MoveMaker, PieceType } from 'shared';
import { Button, Container, Header, Segment } from 'semantic-ui-react';

export default class BoardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { pieces: [] };
  }

  componentDidMount() {
    this.reset();
  }

  reset = () => {
    const pieces = [];
    while (pieces.length < this.props.size*this.props.size) {
      pieces.push(PieceType.Empty);
    }
    this.moveMaker = new MoveMaker(pieces);
    this.engine = new Engine(this.moveMaker);
    this.setState({ pieces });
  };

  tryMakeMoveAt = (location) => {
    let { pieces } = this.moveMaker.tryMakeMoveAt(location);
    if (!pieces) return;

    const response = this.engine.makeBestMove();
    if (!response.pieces) return;

    pieces = response.pieces;
    this.setState({ pieces });
  };

  render() {
    return (
      <Container>
        <Segment basic>
          <Header>Tic-Tac-Toe</Header>
          <Button onClick={this.reset}>New Game</Button>
        </Segment>
        <Segment basic>
          <Board pieces={this.state.pieces} onLocationClicked={this.tryMakeMoveAt} />
        </Segment>
      </Container>
    );
  }
};
