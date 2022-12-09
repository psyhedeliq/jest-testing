import { fireEvent, render } from '@testing-library/react';
import { OrderSummary } from './OrderSummary';
import { useOrder } from './useOrder';

jest.mock('./useOrder', () => ({
  useOrder: jest.fn(),
}));
const useOrderMock = useOrder as unknown as jest.Mock<
  Partial<ReturnType<typeof useOrder>>
>;

describe('OrderSummary', () => {
  afterEach(jest.clearAllMocks);

  describe('while order data being loaded', () => {
    it('renders loader', () => {
      useOrderMock.mockReturnValue({
        isLoading: true,
        order: undefined,
      });

      const { container } = render(<OrderSummary />);

      expect(container.innerHTML).toMatch('Loading');
    });
  });
  describe('when order data is loaded', () => {
    beforeEach(() => {
      useOrderMock.mockReturnValue({
        isLoading: false,
        order: {
          products: [
            {
              name: 'Product 1',
              price: 10,
              image: '/test.jpg',
            },
          ],
        },
      });
    });
    it('renders order summary', () => {
      const { container } = renderWithRouter(() => <OrderSummary />);
      expect(container.innerHTML).toMatch('Product 1');
    });

    it('navigates to main page on button click', () => {
      const { getByText, history } = renderWithRouter(() => <OrderSummary />);
      fireEvent.click(getByText('Back to the store'));
      expect(history.location.pathname).toBe('/');
    });
  });

  describe('without order', () => {
    it('renders error message', () => {
      useOrderMock.mockReturnValue({
        isLoading: false,
        order: undefined,
      });
      const { container } = render(<OrderSummary />);
      expect(container.innerHTML).toMatch(`Couldn't load order info.`);
    });
  });
});
