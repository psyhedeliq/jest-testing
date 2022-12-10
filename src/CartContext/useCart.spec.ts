import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { Product } from '../shared/types';
import { useCart } from './useCart';

const localStorageMock = (() => {
  let store: { [ket: string]: string } = {};

  return {
    clear: () => {
      store = {};
    },
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: string) => {
      store[key] = value ? value.toString() : '';
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

// Here we use the defineProperty method to override the localStorage property which is read-only by default, this is so that TypeScript doesn't complain
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useCart', () => {
  afterEach(() => {
    localStorage.clear();
    // restore all the mocks to their original value, we need to do this to reset all the counters in the spy functions
    jest.restoreAllMocks();
  });
  describe('on mount', () => {
    it('should fetch cart from localStorage', () => {
      const products: Product[] = [
        {
          name: 'Product 1',
          price: 10,
          image: 'image.png',
        },
      ];

      localStorage.setItem('products', JSON.stringify(products));
      const { result } = renderHook(() => useCart());

      expect(result.current.products).toEqual(products);
    });
  });

  describe('when adding a product', () => {
    it('should add a product to the cart', () => {
      // hard code product data
      const product: Product = {
        name: 'Product 1',
        price: 10,
        image: 'image.png',
      };

      // render the hook
      const { result } = renderHook(() => useCart());
      const setItemSpy = jest.spyOn(localStorage, 'setItem');

      // call the addToCart function, we wrap it in act because it updates the state inside the hook
      act(() => {
        result.current.addToCart(product);
      });

      // verify that our products array from our hook contains the product we added
      expect(result.current.products).toEqual([product]);
      // check that the data stored in localStorage is correct and it also matches the product we added
      expect(setItemSpy).toHaveBeenCalledWith(
        'products',
        JSON.stringify([product])
      );

      setItemSpy.mockRestore();
    });
  });

  describe('when removing a product', () => {
    it('should remove a product from the cart', () => {
      const product: Product = {
        name: 'Product 1',
        price: 10,
        image: 'image.png',
      };

      localStorage.setItem('products', JSON.stringify([product]));
      const { result } = renderHook(() => useCart());
      const setItemSpy = jest.spyOn(localStorage, 'setItem');

      act(() => {
        result.current.removeFromCart(product);
      });

      expect(result.current.products).toEqual([]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('products', '[]');

      setItemSpy.mockRestore();
    });
  });

  describe('total price', () => {
    it('should return the total price of the cart', () => {
      const product: Product = {
        name: 'Product 1',
        price: 31,
        image: 'image.png',
      };

      localStorageMock.setItem('products', JSON.stringify([product, product]));

      const { result } = renderHook(() => useCart());

      expect(result.current.totalPrice()).toEqual(62);
    });
  });

  describe('when clearing the cart', () => {
    it('should clear the cart', () => {
      const product: Product = {
        name: 'Product 1',
        price: 31,
        image: 'image.png',
      };

      localStorageMock.setItem('products', JSON.stringify([product, product]));

      const { result } = renderHook(() => useCart());
      const setItemSpy = jest.spyOn(localStorage, 'setItem');

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.products).toEqual([]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('products', '[]');

      setItemSpy.mockRestore();
    });
  });
});
