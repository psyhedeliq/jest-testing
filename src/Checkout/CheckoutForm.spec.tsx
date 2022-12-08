import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { CheckoutForm } from './CheckoutForm';

describe('CheckoutForm', () => {
  it('should render the form', () => {
    const { container } = render(<CheckoutForm />);

    expect(container.innerHTML).toMatch('Cardholders Name');
    expect(container.innerHTML).toMatch('Card Number');
    expect(container.innerHTML).toMatch('Expiration Date');
    expect(container.innerHTML).toMatch('CVV');
  });

  describe('with invalid inputs', () => {
    it('should show errors', async () => {
      const { container, getByText } = render(<CheckoutForm />);

      // we need to use await act because validations are asynchronous in React Hook Form
      await act(async () => {
        fireEvent.click(getByText('Place order'));
      });

      expect(container.innerHTML).toMatch('Error:');
    });
  });

  describe('with valid inputs', () => {
    describe('on place order button click', () => {
      it('calls submitOrder with the correct data', async () => {
        const mockSubmit = jest.fn();

        const { getByText, getByLabelText } = render(
          <CheckoutForm submit={mockSubmit} />
        );

        fireEvent.change(getByLabelText('Cardholders Name:'), {
          target: { value: 'John Doe' },
        });
        fireEvent.change(getByLabelText('Card Number:'), {
          target: { value: '0000 0000 0000 0000' },
        });
        fireEvent.change(getByLabelText('Expiration Date:'), {
          target: { value: '2029-09' },
        });
        fireEvent.change(getByLabelText('CVV:'), {
          target: { value: '521' },
        });

        fireEvent.click(getByText('Place order'));

        // this is another method to await for asynchronous form submission
        await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
      });
    });
  });
});
