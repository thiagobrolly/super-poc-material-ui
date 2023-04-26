import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useAuth();

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    const data = { email, password };

    await signIn(data);
  }

  return (
    <div>
      <Typography fontSize="4rem" variant="h2">
        SignIn
      </Typography>
      <form onSubmit={handleSignIn}>
        <TextField
          id="email"
          type="email"
          label="Email"
          variant="filled"
          color="primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <TextField
          id="password"
          type="password"
          label="Password"
          variant="filled"
          value={password}
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
          error
        />

        <Checkbox />

        <br />

        <Box
          display="flex"
          flexDirection={'column'}
          alignItems={'flex-start'}
          mt="40px"
          gap="5px"
        >
          <Button variant="contained" type="submit" disabled={loadingAuth}>
            {loadingAuth ? 'Loading...' : 'Send'}
          </Button>

          <Button variant="contained" color="secondary" disabled={loadingAuth}>
            Secondary
          </Button>

          <Button variant="text" disabled={loadingAuth}>
            Primary
          </Button>
        </Box>
      </form>

      <Link to="/signup">SignUp</Link>
    </div>
  );
}
