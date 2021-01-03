import '../styles/globals.css'
import { Provider } from 'mobx-react'
import { useStore } from '../store'

import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialState)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
