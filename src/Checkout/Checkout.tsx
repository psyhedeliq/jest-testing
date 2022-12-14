import { useCartContext } from '../CartContext';
import { postCheckout } from '../utils/api';
import { CheckoutForm } from './CheckoutForm';
import { CheckoutList } from './CheckoutList';

export const Checkout = () => {
  const { products, totalPrice, clearCart } = useCartContext();

  const submitCheckout = async () => {
    const { orderId } = await postCheckout({
      products,
    });
    clearCart();
    window.location.assign(`/order/?orderId=${orderId}`);
  };

  return (
    <section className='nes-container with-title'>
      <h1 className='title'>Checkout</h1>
      <div className='nes-container is-rounded checkout-list-wrapper'>
        <p>You are going to buy:</p>
        <CheckoutList products={products} />
        <p>Total: {totalPrice()} BTC</p>
      </div>
      <p>Enter your payment credentials:</p>
      <CheckoutForm submit={submitCheckout} />
    </section>
  );
};
