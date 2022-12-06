import { fireEvent } from '@testing-library/react';
import { Header } from './Header';

jest.mock('./CartWidget', () => ({
  CartWidget: () => <div>Cart Widget</div>,
}));

describe('Header', () => {
  it('renders correctly', () => {
    const { container } = renderWithRouter(() => <Header />);
    expect(container.innerHTML).toMatch('Heroes of Might and Magic Store');
    expect(container.innerHTML).toMatch('Cart Widget');
  });
  it('navigates to home page when clicking on the logo', () => {
    const { getByText, history } = renderWithRouter(() => <Header />);
    fireEvent.click(getByText('Heroes of Might and Magic Store'));
    expect(history.location.pathname).toEqual('/');
  });
});
