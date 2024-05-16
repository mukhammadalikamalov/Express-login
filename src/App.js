import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthWrapper } from "./auth/AuthWrapper";
import Router from "./core/routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
