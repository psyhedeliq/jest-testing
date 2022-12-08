import { Product } from '../shared/types';
import { CheckoutList } from './CheckoutList';

describe('CheckoutList', () => {
  it('renders the list of products', () => {
    const products: Product[] = [
      {
        name: 'Product 1',
        price: 10,
        image: '/test.jpg',
      },
      {
        name: 'Product 2',
        price: 10,
        image: '/test.jpg',
      },
    ];

    const { container } = renderWithRouter(() => (
      <CheckoutList products={products} />
    ));
    expect(container.innerHTML).toMatch('Product 1');
    expect(container.innerHTML).toMatch('Product 2');
  });
});
