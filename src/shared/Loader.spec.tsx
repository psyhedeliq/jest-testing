import { Loader } from './Loader';

describe('Loader', () => {
  it('renders correctly', () => {
    const { container } = renderWithRouter(() => <Loader />);
    expect(container.innerHTML).toMatch('Loading');
  });
});
