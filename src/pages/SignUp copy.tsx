import { FormEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = { email, password, name };

    await signUp(data);
  }

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <input
          required
          type="email"
          placeholder="email@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          required
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">{loadingAuth ? 'Loading...' : 'Create'}</button>
      </form>

      <Link to="/">SignIn</Link>
    </div>
  );
}
