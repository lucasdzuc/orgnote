import { useContext } from 'react';

import ThemeContext from '../contexts/theme';

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a CustomThemeProvider');
  }

  return context;
}

export default useTheme;
