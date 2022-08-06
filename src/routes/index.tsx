import React from 'react';

import AppRoutes from './app.routes';

interface PropsTheme {
  toggleTheme?(): void;
}

const Routes: React.FC<PropsTheme> = ({ toggleTheme }) => {
  return <AppRoutes />;
};

export default Routes;
