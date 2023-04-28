import { useState, FormEvent, ChangeEvent } from 'react';
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

// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

export function SignIn() {
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  const { handleSendCode, handleVerifyCode, loadingAuth, visibleCodeInput } =
    useAuth();

  async function handleOTP(e: FormEvent) {
    e.preventDefault();

    await handleSendCode(phone);
  }

  async function handleVerify(e: FormEvent) {
    e.preventDefault();

    await handleVerifyCode(code);
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const notFormattedCpf = event.target.value;
    const formattedCpf = notFormattedCpf
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
    setPhone(formattedCpf);
  }

  function handleCodeChange(event: ChangeEvent<HTMLInputElement>) {
    const notFormattedCpf = event.target.value;
    const formattedCpf = notFormattedCpf
      .replace(/\D/g, '')
      .replace(/(\d{6})\d+?$/, '$1');
    setCode(formattedCpf);
  }

  function handleButtonText() {
    if (visibleCodeInput) {
      return 'Entrar';
    } else {
      return 'Entre com seu número';
    }
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
            onSubmit={!visibleCodeInput ? handleOTP : handleVerify}
          >
            <TextField
              id="phone"
              type="phone"
              label="Telefone"
              variant="filled"
              color="primary"
              value={phone}
              required
              onChange={handlePhoneChange}
            />

            {visibleCodeInput && (
              <TextField
                id="code"
                type="text"
                name="code"
                variant="filled"
                value={code}
                required
                label="Código"
                placeholder="Code"
                onChange={handleCodeChange}
              />
            )}

            <div>
              <LinkBase
                component={Link}
                to="/signup"
                sx={{ fontSize: '0.875rem' }}
              >
                Esqueci meu número
              </LinkBase>
            </div>

            <Button variant="contained" type="submit" disabled={loadingAuth}>
              {loadingAuth ? (
                <CircularProgress size={'1.5rem'} />
              ) : (
                handleButtonText()
              )}
            </Button>

            <Typography fontSize="0.875rem" textAlign={'center'}>
              Ainda não tem conta?{' '}
              <LinkBase
                component={Link}
                to="/signup"
                sx={{ fontSize: '0.875rem' }}
              >
                Registre-se
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
            alt="Super Frete"
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
