import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type User = {
  email: string | null;
  name: string;
};

type AuthProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

interface AuthContexType {
  user: User | null;
  signIn: (user: AuthProps) => Promise<void>;
  signUp: (user: SignUpProps) => Promise<void>;
  logout: () => Promise<void>;
  signed: boolean;
  loadingAuth: boolean;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContexType);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem('@tickets2.0');

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  function setStorageUser(data: User) {
    localStorage.setItem('@tickets2.0', JSON.stringify(data));
  }

  async function signIn({ email, password }: AuthProps) {
    setLoadingAuth(true);

    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        async (value) => {
          const uid = value.user.uid;

          const docRef = doc(db, 'users', uid);
          const docSnap = await getDoc(docRef);

          const data = {
            uid,
            name: docSnap.data()?.name,
            email: value.user.email,
          };

          setUser(data);
          setStorageUser(data);
          navigate('/dashboard');
        },
      );
    } catch (err) {
      toast.error('Ops...algo deu errado!');
      console.log(err);
    } finally {
      setLoadingAuth(false);
    }
  }

  async function signUp({ email, password, name }: SignUpProps) {
    setLoadingAuth(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (value) => {
          const uid = value.user.uid;

          const docRef = doc(db, 'users', uid);

          await setDoc(docRef, {
            name,
          }).then(() => {
            const userData = {
              uid,
              name,
              email: value.user.email,
            };

            setUser(userData);
            setStorageUser(userData);
            navigate('/dashboard');
          });
        },
      );
    } catch (err) {
      console.log(err);
      toast.error('Ops...algo deu errado!');
    } finally {
      setLoadingAuth(false);
    }

    // await createUserWithEmailAndPassword(auth, email, password)
    //   .then(async (value) => {
    //     const uid = value.user.uid;

    //     await setDoc(doc(db, 'users', uid), {
    //       name,
    //     }).then(() => {
    //       alert('Cadastrado com sucesso');

    //       const userData = {
    //         name,
    //         email: value.user.email
    //       }

    //       setUser(userData)
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setLoaingAuth(false)
    //   })
    console.log(name);
    console.log(email);
    console.log(password);
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem('@tickets2.0');
    setUser(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signUp,
        logout,
        loadingAuth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
