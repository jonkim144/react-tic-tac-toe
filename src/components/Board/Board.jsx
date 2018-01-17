import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';
import { Piece } from 'components';
import { PieceType } from 'shared';

export default class Board extends React.PureComponent {
  static propTypes = {
    pieces: PropTypes.arrayOf(PropTypes.instanceOf(PieceType)).isRequired,
    onLocationClicked: PropTypes.func.isRequired,
  };

  render() {
    const size = Math.sqrt(this.props.pieces.length);
    let gridRows = [];
    for (let row = 0; row < size; ++row) {
      const gridColumns = [];
      for (let column = 0; column < size; ++column) {
        const location = row * size + column;
        const gridColumn =
          <Grid.Column key={column}>
            <Piece
              pieceType={this.props.pieces[location]}
              onClick={() => { this.props.onLocationClicked(location); }}
            />
          </Grid.Column>;
        gridColumns.push(gridColumn);
      }
      const gridRow =
        <Grid.Row key={row} style={{ paddingTop: 0, paddingBottom: '.25em' }}>
          {gridColumns}
        </Grid.Row>;
      gridRows.push(gridRow);
    }
    return (
      <Grid>
        {gridRows}
      </Grid>
    );
  }
}
