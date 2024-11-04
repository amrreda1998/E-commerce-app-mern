import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if(process.env.NODE_ENV == 'production'){
    disableReactDevTools();
}

createRoot(document.getElementById("root")!).render(<App />);
