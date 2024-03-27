import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { ModeProvider } from "./context/mode-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ModeProvider>
      <App />
    </ModeProvider>
  </HashRouter>
);
