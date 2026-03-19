import { useState } from 'react';
import './Authentication.css';
import Logout from './logout';
import Login from './Login';

export default function Authentication() {
  const [userName, setUserName] = useState();

  return (
    <div id="authentication">
      {userName
        ? <Logout setUserName={setUserName} userName={userName} />
        : <Login setUserName={setUserName} />}
    </div>
  )
}
