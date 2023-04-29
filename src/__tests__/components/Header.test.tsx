/* eslint-disable no-useless-escape */
import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';
describe('Header', async () => {
  it('should render the header', () => {
    render(<Header />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Header',
    );
  });

  it('should render the header link', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /registre\-se/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
