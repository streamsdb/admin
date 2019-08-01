import * as React from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  setAuthenticated: (token: string) => void;
  setUnauthenticated: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({isAuthenticated: false, setAuthenticated: ()=>{}, setUnauthenticated: ()=>{}});

export const useAuthContext = () => React.useContext(AuthContext);

const useAuthStateHandler = () => {
  const [state, setState] = React.useState(localStorage.getItem("token") !== null);

  const setAuthenticated = (token: string) => {
    localStorage.setItem("token", token);
    setState(true);
  }

  const setUnauthenticated = () => {
    localStorage.removeItem("token");
    setState(false);
  }

  return {
    isAuthenticated: state,
    setAuthenticated,
    setUnauthenticated
  };
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { isAuthenticated, setAuthenticated, setUnauthenticated } = useAuthStateHandler();

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, setUnauthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
