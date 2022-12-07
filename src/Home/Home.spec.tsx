import { render } from '@testing-library/react';
import { Home } from './Home';
import { useProducts } from './useProducts';
import { ProductCardProps } from './ProductCard';
import { Category } from '../shared/types';

jest.mock('./ProductCard', () => ({
  ProductCard: ({ datum }: ProductCardProps) => {
    const { name, price, image } = datum;

    return (
      <div>
        {name} {price} {image}
      </div>
    );
  },
}));

jest.mock('./useProducts', () => ({
  useProducts: jest.fn(),
}));

// Here we use Partial from the ReturnedType of useProducts so that we don' have to mock all the values of it's return type
// Partial modifies the return type for us making all the properties optional
const useProductsMock = useProducts as unknown as jest.Mock<
  Partial<ReturnType<typeof useProducts>>
>;

console.log(useProductsMock);

describe('Home', () => {
  describe('while loading', () => {
    it('renders loader', () => {
      useProductsMock.mockReturnValue({
        categories: [],
        isLoading: true,
        error: false,
      });

      const { container } = render(<Home />);
      expect(container.innerHTML).toMatch('Loading');
    });
  });
  describe('with data', () => {
    it('renders categories with products', () => {
      const category: Category = {
        name: 'Category 1',
        items: [
          {
            name: 'Product 1',
            price: 55,
            image: './text.jpg',
          },
        ],
      };
      useProductsMock.mockReturnValue({
        categories: [category],
        isLoading: false,
        error: false,
      });

      const { container } = render(<Home />);
      expect(container.innerHTML).toMatch('Category 1');
      expect(container.innerHTML).toMatch('Product 1 55 ./text.jpg');
    });
  });
  describe('with error', () => {
    it('renders error message', () => {
      useProductsMock.mockReturnValue({
        categories: [],
        isLoading: false,
        error: true,
      });

      const { container } = render(<Home />);
      expect(container.innerHTML).toMatch('Error');
    });
  });
});
