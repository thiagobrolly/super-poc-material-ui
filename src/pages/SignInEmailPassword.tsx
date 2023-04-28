import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as LinkBase,
} from '@mui/material';

import Logo from '../assets/logo.svg';
import { useAuth } from '../hooks/useAuth';

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

export function SignInEmailPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useAuth();

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();

    const data = { email, password };

    await signIn(data);
  }

  return (
    <Box
      display={'flex'}
      bgcolor={'#0FAE79'}
      // bgcolor={{
      //   background: 'linear-gradient( #82ffa1, #0FAE79)',
      // }}
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={'1rem'}
    >
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column-reverse', md: 'row' }}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap="2rem"
        maxWidth="980px"
        width="100%"
      >
        <Box
          minWidth={{ sm: '400px' }}
          bgcolor={'#fff'}
          borderRadius={'8px'}
          padding={'32px'}
        >
          <Typography
            variant="h2"
            fontSize="1.5rem"
            textAlign={'center'}
            fontWeight={'bold'}
            marginBottom={'1.25rem'}
          >
            Acesse sua conta
          </Typography>
          <Box
            component={'form'}
            display={'flex'}
            flexDirection={'column'}
            gap={'.75rem'}
            onSubmit={handleSignIn}
          >
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="filled"
              color="primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              id="password"
              type="password"
              label="Password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <LinkBase
                component={Link}
                to="/signup"
                sx={{ fontSize: '0.875rem' }}
              >
                Esqueci minha senha
              </LinkBase>
            </div>

            <Button variant="contained" type="submit" disabled={loadingAuth}>
              {loadingAuth ? 'Loading...' : 'Entrar'}
            </Button>

            <Typography fontSize="0.875rem" textAlign={'center'}>
              Ainda não tem conta?{' '}
              <LinkBase
                component={Link}
                to="/signup"
                sx={{ fontSize: '0.875rem' }}
              >
                Cadastrar
              </LinkBase>
            </Typography>

            <div id="recaptcha-container"></div>
          </Box>
        </Box>

        <Box
          width={{ xs: '300px', sm: '400px' }}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <Box
            component="img"
            width={{ xs: '18.75rem', sm: '22.5rem' }}
            src={Logo}
            alt="Chevrolet"
            mb="2rem"
          />
          <Typography>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
            corrupti velit minus consequuntur repellat nisi. Aut beatae ratione
            vero repudiandae est reprehenderit, tempora ab eos recusandae sit
            ipsum? Cupiditate, ut?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
