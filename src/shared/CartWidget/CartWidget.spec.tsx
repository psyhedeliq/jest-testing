import { CartWidget } from './CartWidget';
import { fireEvent } from '@testing-library/react';
import { useCartContext } from '../../CartContext';

jest.mock('../../CartContext', () => ({
  useCartContext: jest.fn(),
}));
const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>;

describe('CartWidget', () => {
  it('shows the amount of items in the cart', () => {
    useCartContextMock.mockReturnValue({
      products: [
        {
          name: 'Product 1',
          price: 10,
          image: 'image.png',
        },
      ],
    });
    const { container } = renderWithRouter(() => <CartWidget />);
    expect(container.innerHTML).toMatch('1');
  });

  it('navigates to cart page when clicked', () => {
    useCartContextMock.mockReturnValue({ products: [] });
    const { getByRole, history } = renderWithRouter(() => <CartWidget />);
    fireEvent.click(getByRole('link'));
    expect(history.location.pathname).toEqual('/cart');
  });
});
