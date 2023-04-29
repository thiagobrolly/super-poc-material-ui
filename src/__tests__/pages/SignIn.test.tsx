import { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { SignIn } from '../../pages/SignIn';

vi.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: ReactNode }) => children,
  };
});

vi.mock('../../hooks/useAuth.tsx', () => {
  return {
    useAuth: () => ({
      handleSendCode: vi.fn(),
    }),
  };
});

describe('SignIn', async () => {
  it('should render the SignIn page', () => {
    const { debug } = render(<SignIn />);

    expect(
      screen.getByRole('heading', { name: /acesse sua conta/i }),
    ).toHaveTextContent('Acesse sua conta');

    const phone = screen.getByRole('textbox', { name: /telefone/i });
    const button = screen.getByRole('button', {
      name: /entre com seu número/i,
    });

    fireEvent.change(phone, { target: { value: '99 99999 9999' } });

    fireEvent.click(button);

    debug();
  });

  it('should render the "superfreight" image', () => {
    render(<SignIn />);

    expect(
      screen.getByRole('img', {
        name: /super frete/i,
      }),
    ).toBeInTheDocument();
  });
});
