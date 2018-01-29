import React from 'react';
import { render } from 'react-dom';
import { BoardContainer } from 'containers';

const MOUNT_NODE = document.getElementById('root');

const App = () => (
  <BoardContainer />
);

render(<App />, MOUNT_NODE);
