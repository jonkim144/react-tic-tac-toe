import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { PieceType } from 'shared';
import { Board, Piece } from 'components';
import { Icon } from 'semantic-ui-react';

chai.use(sinonChai);

describe('<Board />', () => {
  it('renders', () => {
    const expectedPieces = [
      PieceType.Empty, PieceType.X, PieceType.Empty,
      PieceType.Empty, PieceType.O, PieceType.Empty,
      PieceType.Empty, PieceType.Empty, PieceType.X,
    ];
    const wrapper = shallow(<Board
      pieces={expectedPieces}
      onLocationClicked={sinon.spy()}
    />);
    expect(wrapper.find(Piece), wrapper.debug()).to.have.lengthOf(expectedPieces.length);
  });
});
