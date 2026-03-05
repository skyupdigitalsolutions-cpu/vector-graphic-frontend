// pages/+Layout.jsx
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../src/index.css";

export default function Layout({ children }) {
  // useEffect(() => {
  //   // Bootstrap JS only runs in browser, never on server
  //   import("bootstrap/dist/js/bootstrap.bundle.min.js");
  // }, []);

  return <>{children}</>;
}
