import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

import ColorsWrapper from "./colors/ColorsWrapper";
import ToastifyComponent from "./helpers/ToastifyComponent";

function App() {
  return (
    <div className="App">
     <ColorsWrapper/>

        <ToastContainer/>
    </div>
  );
}

export default App;


/*color*/
