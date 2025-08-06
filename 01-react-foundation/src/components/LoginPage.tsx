import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store"


export const LoginPage = () => {

  const authStatus = useAuthStore(state => state.status);
  const user = useAuthStore(state => state.user);

  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    setTimeout(() => {
      console.log("logout timeout")
      logout();
    }, 1500);
  }, []) // necesario añadir [] o se ejecuta cada vez que se hace click al boton


  // TODO: revisar porque no va y pasa a checkings

  if (authStatus === 'checking') {
    return <h3>Loading...</h3>
  }

  return (
    <>
      <h3>Login Page</h3>

      {
        (authStatus === 'authenticated')
          ? <div>Autenticado como {JSON.stringify(user, null, 2)}</div>
          : <div>No autenticado</div>
      }

      {
        (authStatus === 'authenticated')
          ? (
            <button onClick={logout}>Logout</button>
          )
          :
          (
            <button onClick={() => login('email@google.com', '1234')}>Login</button>
          )

      }
    </>
  )
}
