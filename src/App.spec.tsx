import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { App } from './App';
// import { OrderSummary } from './OrderSummary';

jest.mock('./Home', () => ({ Home: () => <div>Home</div> }));

jest.mock('./OrderSummary', () => ({
  OrderSummary: () => <div>Order summary</div>,
}));

jest.mock('./Checkout', () => ({
  Checkout: () => <div>Checkout</div>,
}));

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

  describe('routing', () => {
    it('renders Home component on root route', () => {
      const { container } = renderWithRouter(() => <App />, '/');
      expect(container.innerHTML).toMatch('Home');
    });
    it("renders checkout page on '/checkout'", () => {
      const { container } = renderWithRouter(() => <App />, '/checkout');
      expect(container.innerHTML).toMatch('Checkout');
    });
    it("renders order summary page on '/order'", () => {
      const { container } = renderWithRouter(() => <App />, '/order');
      expect(container.innerHTML).toMatch('Order summary');
    });
    it("renders 'page not found' message on nonexistent route", () => {
      const { container } = renderWithRouter(
        () => <App />,
        '/this-route-does-not-exist'
      );
      expect(container.innerHTML).toMatch('Page not found');
    });
  });
});
