import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { PieceType } from 'shared';
import { Piece } from 'components';
import { Icon, Button } from 'semantic-ui-react';

chai.use(sinonChai);

describe('<Piece />', () => {
  it('renders X', () => {
    const wrapper = shallow(<Piece
      onClick={sinon.spy()}
      pieceType={PieceType.X}
    />);
    const icon = wrapper.dive().find(Icon);
    expect(icon).to.have.lengthOf(1);
    expect(icon.props().name, JSON.stringify(icon.props())).to.equal('remove');
  });

  it('renders O', () => {
    const wrapper = shallow(<Piece
      onClick={sinon.spy()}
      pieceType={PieceType.O}
    />);
    const icon = wrapper.dive().find(Icon);
    expect(icon).to.have.lengthOf(1);
    expect(icon.props().name, JSON.stringify(icon.props())).to.equal('radio');
  });

  it('renders empty', () => {
    const wrapper = shallow(<Piece
      onClick={sinon.spy()}
      pieceType={PieceType.Empty}
    />);
    const icon = wrapper.dive().find(Icon);
    expect(icon).to.have.lengthOf(1);
    expect(icon.props().name, JSON.stringify(icon.props())).to.be.null;
  });
});
