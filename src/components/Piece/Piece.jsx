import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { PieceType } from 'shared';

const getIconName = (pieceType) => {
  switch (pieceType) {
    case PieceType.Empty: return null;
    case PieceType.X: return 'remove';
    case PieceType.O: return 'radio';
    default:
      throw new Error(`Unknown piece type: <${pieceType}>`);
  }
};

const Piece = (props) => (
  <Button
    icon
    size='massive'
    onClick={props.onClick}
    content={<Icon name={getIconName(props.pieceType)} />}
  />
);

export default Piece;
