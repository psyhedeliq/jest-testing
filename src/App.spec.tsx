import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { App } from './App';

jest.mock('./Home', () => ({ Home: () => <div>Home</div> }));

describe('App', () => {
  it('renders successfully', () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(container.innerHTML).toMatch('Heroes of Might and Magic Store');
  });

  it('renders Home component on root route', () => {
    const history = createMemoryHistory();
    history.push('/');
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(container.innerHTML).toMatch('Home');
  });
});
