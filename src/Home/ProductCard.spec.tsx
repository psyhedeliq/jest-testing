import { fireEvent, getByText, render } from '@testing-library/react';
import { useCartContext } from '../CartContext';
import { Product } from '../shared/types';
import { ProductCard } from './ProductCard';

jest.mock('../CartContext', () => ({
  useCartContext: jest.fn(),
}));

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>;
describe('ProductCard', () => {
  const product: Product = {
    name: 'Product name',
    price: 10,
    image: '/test.jpg',
  };
  it('renders correctly', () => {
    useCartContextMock.mockReturnValue({
      addToCart: () => {},
      products: [product],
    });
    const { container, getByRole } = render(<ProductCard datum={product} />);
    expect(container.innerHTML).toMatch('Product name');
    expect(container.innerHTML).toMatch('10 BTC');
    expect(getByRole('img')).toHaveAttribute('src', '/test.jpg');
  });

  describe('when the product is in the cart', () => {
    it('the `Add to cart` button is disabled', () => {
      useCartContextMock.mockReturnValue({
        addToCart: () => {},
        products: [product],
      });
      const { getByRole } = render(<ProductCard datum={product} />);
      expect(getByRole('button')).toBeDisabled();
    });
  });

  describe('when the product is not in the cart', () => {
    describe('on `Add to cart` click', () => {
      it('calls the `addToCart` function', () => {
        const addToCart = jest.fn();
        useCartContextMock.mockReturnValue({
          addToCart,
          products: [],
        });
        const { getByText } = render(<ProductCard datum={product} />);
        fireEvent.click(getByText('Add to cart'));
        expect(addToCart).toHaveBeenCalledWith(product);
      });
    });
  });
});
