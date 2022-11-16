import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { App } from './App';

describe('App', () => {
  it('renders successfully', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(container.innerHTML).toMatch('Goblin Store');
  });
});
