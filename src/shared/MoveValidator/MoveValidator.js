import { PieceType } from 'shared';

const isValid = (pieces, location) => {
  if (location < 0) return false;
  if (location > pieces.length-1) return false;
  if (pieces[location] !== PieceType.Empty) return false;

  return true;
};

export default { isValid };
