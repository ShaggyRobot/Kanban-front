import * as React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ outlet }: { outlet: JSX.Element }): JSX.Element {
  const user = localStorage.getItem('token');

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return outlet;
}

export { ProtectedRoute };
