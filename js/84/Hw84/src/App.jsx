import './App.css';
import { jsx as _jsx } from 'react/jsx-runtime';
import Address, { AddressC } from './Address';


const jsx = (
  <>

    <Address />
    <AddressC street='145 Lenape Trail' city='Lakewood' state='NJ' zip='08701'></AddressC>
  </>
);

function App() {

  return jsx;
}

export default App
