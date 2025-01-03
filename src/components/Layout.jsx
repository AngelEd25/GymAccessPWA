import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";

import Sidebar from "./Sidebar.jsx"
import AdminLayout from "../Layout/AdminLayout.jsx";

function Layout(props) {
  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <div className="App">
      
      <nav>
        <ul>
          <li>
            <Link to="/home">Inicio</Link>
          </li>
          <li>
            <Link to="/acerca">Sobre nosotros</Link>
          </li>

          <li>
            {isReadyForInstall && (
            <button onClick={downloadApp}> Install App </button>
            )}
          </li>
        </ul>
      </nav>

      <AdminLayout />

        <Outlet/>
      {props.children}
    </div>
  );
}
export default Layout