import type { FC } from 'react';
import { MainPage } from './components/MainPage';
import { LanguageProvider } from './context/LanguageContext';

const App: FC = () => {
  return (
    <LanguageProvider>
      <MainPage />
    </LanguageProvider>
  );
};

export default App;
