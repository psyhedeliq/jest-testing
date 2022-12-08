import { fireEvent, render, waitFor } from '@testing-library/react';
import { FormField } from './FormField';

describe('CheckoutList', () => {
  it('renders the list of products', () => {
    const { getByLabelText } = render(
      <FormField label='Test label' name='test' />
    );
    const input = getByLabelText('Test label:');
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveClass('is-error');
    expect(input).toHaveAttribute('name', 'test');
  });

  describe('with error', () => {
    it('renders the error message', () => {
      const { getByText } = render(
        <FormField
          label='Test label'
          name='test'
          errors={{ message: 'Example error' }}
        />
      );

      expect(getByText('Error: Example error')).toBeInTheDocument();
    });
  });

  describe('on change', () => {
    it('normalizes the input value', () => {
      const { getByLabelText } = render(
        <FormField
          label='Test label'
          name='test'
          normalize={(value: string) => value.toUpperCase()}
        />
      );
      const input = getByLabelText('Test label:') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });

      waitFor(() => expect(input.value).toHaveValue('TEST'));
    });
  });
});
