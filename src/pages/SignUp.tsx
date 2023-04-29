import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as LinkBase,
  CircularProgress,
} from '@mui/material';

import Logo from '../assets/logo.svg';
import { useAuth } from '../hooks/useAuth';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = { email, password, name };

    await signUp(data);
  }

  return (
    <Box
      display={'flex'}
      bgcolor={'#0FAE79'}
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={'1rem'}
    >
      <Box
        display={'flex'}
        flexDirection={{ xs: 'column-reverse', md: 'row-reverse' }}
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
            Registre-se
          </Typography>
          <Box
            component={'form'}
            display={'flex'}
            flexDirection={'column'}
            gap={'.75rem'}
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              type="text"
              label="Nome"
              variant="filled"
              color="primary"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              id="email"
              type="text"
              label="Email"
              variant="filled"
              color="primary"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              id="password"
              type="password"
              label="Senha"
              variant="filled"
              color="primary"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="contained" type="submit" disabled={loadingAuth}>
              {loadingAuth ? <CircularProgress /> : 'Registrar'}
            </Button>

            <Typography fontSize="0.875rem" textAlign={'center'}>
              Já tem conta?{' '}
              <LinkBase component={Link} to="/" sx={{ fontSize: '0.875rem' }}>
                Acessar
              </LinkBase>
            </Typography>
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
          <Typography fontSize="1rem" textAlign={'justify'}>
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
