import { useState } from "react";
import reactLogo from "./assets/react.svg";

import Button from "react-bootstrap/Button";
import Inputstudent from "./components/inputstudent";
import Liststudent from "./components/liststudent";

function App() {
  return (
    <div className="container">
      <div className="wrapper">
        <Inputstudent />
        <Liststudent />
      </div>
      {/* <Button variant="primary">Primary</Button>{' '}
      <ModalFrom /> */}
    </div>
  );
}

export default App;
