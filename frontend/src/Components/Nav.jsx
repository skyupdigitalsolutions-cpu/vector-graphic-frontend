import { useState, useEffect } from "react";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Set path only on client after mount to avoid hydration mismatch
    setCurrentPath(window.location.pathname);

    const handlePathChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePathChange);
    return () => window.removeEventListener("popstate", handlePathChange);
  }, []);

  const links = [
    { label: "Home", href: "/home" },
    { label: "About us", href: "/aboutus" },
    { label: "Service", href: "/service" },
    { label: "Work", href: "/works" },
    { label: "Thoughts", href: "/thoughts" },
    { label: "Contact us", href: "/contactus"},
  ];

  const isActive = (href) => {
    if (!currentPath) return false;
    if (currentPath === href) return true;
    // Only treat root as Home if the actual path is exactly "/"
    if (currentPath === "/" && href === "/home") return true;
    return false;
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    window.history.pushState(null, "", href);
    setCurrentPath(href);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        body {
          padding-top: 90px;
        }

        .nav-root {
          width: 100%;
          height: 90px;
          border-bottom: 2px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 80px;
          box-sizing: border-box;
          background: #ffffff;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .nav-logo {
          height: 62px;
          width: 280px;
          object-fit: contain;
          object-position: left center;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 50px;
          flex-shrink: 0;
        }

        .nav-link {
          text-decoration: none;
          font-size: 16px;
          font-weight: 400;
          color: #111111;
          white-space: nowrap;
          font-family: 'Poppins', sans-serif;
          line-height: 21px;
          transition: color 0.2s;
        }

        .nav-link:hover {
          color: #C92020;
          text-decoration: underline;
          text-underline-offset: 6px;
        }

        .nav-link.active {
          color: #C92020;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 6px;
        }

        .nav-link-contact {
          font-weight: 500;
        }

        .nav-hamburger {
          display: none;
          cursor: pointer;
          width: 40px;
          height: 40px;
        }

        @media (max-width: 1200px) {
          body { padding-top: 80px; }
          .nav-root { padding: 0 40px; height: 80px; }
          .nav-logo { height: 50px; width: auto; }
          .nav-links { display: none; }
          .nav-hamburger { display: block; }
        }

        @media (max-width: 768px) {
          body { padding-top: 70px; }
          .nav-root { padding: 0 24px; height: 70px; }
          .nav-logo { height: 38px; width: auto; }
          .nav-links { display: none; }
          .nav-hamburger { display: block; }
        }

        .nav-mobile-dropdown {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 20px 24px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          position: fixed;
          top: 90px;
          left: 0;
          right: 0;
          z-index: 999;
        }

        @media (max-width: 1200px) {
          .nav-mobile-dropdown { top: 80px; }
        }

        @media (max-width: 768px) {
          .nav-mobile-dropdown { top: 70px; }
        }

        .nav-mobile-link {
          text-decoration: none;
          font-size: 16px;
          font-weight: 400;
          color: #111111;
          font-family: 'Poppins', sans-serif;
          transition: color 0.2s;
        }

        .nav-mobile-link:hover { color: #C92020; }

        .nav-mobile-link.active {
          color: #C92020;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 6px;
        }

        .nav-mobile-link-contact { font-weight: 500; }
      `}</style>

      <nav className="nav-root">
        <img src="/images/logo.png" alt="logo" className="nav-logo" />

        <img
          src="/images/Icon.svg"
          className="nav-hamburger"
          alt="menu"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        <div className="nav-links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-link${isActive(link.href) ? " active" : ""}${link.isContact ? " nav-link-contact" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div className="nav-mobile-dropdown">
          {links.map((link) => (
           <a 
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-mobile-link${isActive(link.href) ? " active" : ""}${link.isContact ? " nav-mobile-link-contact" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Nav;