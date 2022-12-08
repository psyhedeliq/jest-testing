import { fireEvent } from '@testing-library/react';
import { useCartContext } from '../CartContext';
import { Cart } from './Cart';
import { CartItemProps } from './CartItem';

jest.mock('./CartItem', () => ({
  CartItem: ({ product }: CartItemProps) => {
    const { name, price, image } = product;
    return (
      <div>
        {name} {price} {image}
      </div>
    );
  },
}));

jest.mock('../CartContext', () => ({
  useCartContext: jest.fn(),
}));

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>;

describe('Cart', () => {
  describe('without products', () => {
    beforeEach(() => {
      useCartContextMock.mockReturnValue({
        products: [],
      });
    });
    it('renders empty cart message', () => {
      const { container } = renderWithRouter(() => <Cart />);
      expect(container.innerHTML).toMatch('Your cart is empty.');
    });

    describe('on `Back to main page` click', () => {
      it('redirects to `/`', () => {
        const { getByText, history } = renderWithRouter(() => <Cart />);
        fireEvent.click(getByText('Back to main page.'));
        expect(history.location.pathname).toBe('/');
      });
    });
  });

  describe('with products', () => {
    beforeEach(() => {
      const products = [
        {
          name: 'Product 1',
          price: 10,
          image: 'image/1.jpg',
        },
        {
          name: 'Product 2',
          price: 10,
          image: 'image/2.jpg',
        },
      ];
      useCartContextMock.mockReturnValue({
        products,
        totalPrice: () => 20,
      });
    });
    it('renders cart products list with total price', () => {
      const { container } = renderWithRouter(() => <Cart />);
      expect(container.innerHTML).toMatch('Product 1 10 image/1.jpg');
      expect(container.innerHTML).toMatch('Product 2 10 image/2.jpg');

      expect(container.innerHTML).toMatch('Total: 20 BTC');
    });

    describe('on `Go to checkout` click', () => {
      it('redirects to `/checkout`', () => {
        const { getByText, history } = renderWithRouter(() => <Cart />);
        fireEvent.click(getByText('Go to checkout'));
        expect(history.location.pathname).toBe('/checkout');
      });
    });
  });
});
