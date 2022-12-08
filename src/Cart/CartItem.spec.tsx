import { fireEvent } from '@testing-library/react';
import { Product } from '../shared/types';
import { CartItem } from './CartItem';

describe('CartItem', () => {
  const product: Product = {
    name: 'Product name',
    price: 10,
    image: '/test.jpg',
  };
  it('renders correctly', () => {
    const { container, getByAltText } = renderWithRouter(() => (
      <CartItem product={product} removeFromCart={() => {}} />
    ));
    expect(container.innerHTML).toMatch('Product name');
    expect(container.innerHTML).toMatch('10 BTC');
    expect(getByAltText('Product name')).toHaveAttribute('src', '/test.jpg');
  });

  describe('on `Remove` click', () => {
    it('calls the `removeFromCart` function', () => {
      const removeFromCartMock = jest.fn();
      const { getByText } = renderWithRouter(() => (
        <CartItem product={product} removeFromCart={removeFromCartMock} />
      ));

      fireEvent.click(getByText('Remove'));
      expect(removeFromCartMock).toHaveBeenCalledWith(product);
    });
  });
});
