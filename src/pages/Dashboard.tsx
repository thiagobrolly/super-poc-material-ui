import { Button } from '@mui/material';
import { useAuth } from '../contexts/auth';

export function Dashboard() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <br />
      <span>Bem vindo, {user?.name}</span>
      <br />

      <Button variant="contained" type="submit" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  );
}
