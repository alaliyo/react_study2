import { useState } from 'react';
import AppRouter from './components/Router';
import { authService } from './firebase';

function App() {
  const [loggedIn, setLoggedIn] = useState(authService.currentUser);

  return (
    <div>
      <AppRouter loggedIn={loggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
