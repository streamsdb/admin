import * as React from "react";

interface ILoadingContextInterface {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const loadingContext = React.createContext<ILoadingContextInterface>({loading: false, setLoading: ()=>{}});

const useLoadingStateHandler = () => {
  const [state, setState] = React.useState(false);

  const setLoading = (value: boolean) => {
    setState(value);
  }

  return {
    loading: state,
    setLoading: setLoading,
  };
};

const { Provider } = loadingContext;

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { loading, setLoading } = useLoadingStateHandler();

  return (
    <Provider value={{ loading, setLoading }}>
      {children}
    </Provider>
  );
};

export default LoadingProvider;
