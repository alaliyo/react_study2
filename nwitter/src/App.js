import { useState, useEffect } from 'react';
import AppRouter from './components/Router';
import { authService } from './firebase';

function App() {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user)
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <div>
      { init ? <AppRouter loggedIn={loggedIn} userObj={userObj}/> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
