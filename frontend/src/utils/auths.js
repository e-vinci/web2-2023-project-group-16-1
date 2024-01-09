let currentUser;

// eslint-disable-next-line consistent-return
const getAuthenticatedUser = () => {
  if (currentUser !== undefined) {
    return currentUser;
  }
  const serializedUser = localStorage.getItem('user');
  if (!serializedUser) {
    return undefined;
  }
  currentUser = JSON.parse(serializedUser);
};
// défini l'utilisateur authentifié actuellement
const setAuthenticatedUser = (authenticatedUser) => {
  const serializedUser = JSON.stringify(authenticatedUser);
  localStorage.setItem('user', serializedUser);
  currentUser = authenticatedUser;
};

// indique si l'utiliseur actuel est authentifié ou pas
const isAuthenticated = () => currentUser !== undefined;

// retire l'utilisateur authentifié
const clearAuthenticatedUser = () => {
  localStorage.removeItem('user');
  currentUser = undefined;
};

export { getAuthenticatedUser, setAuthenticatedUser, isAuthenticated, clearAuthenticatedUser };
