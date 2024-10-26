import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";  // Import hooks for state and side effects
import { auth, logout } from "../auth/firebase"; 

const Layout = () => {
  const [user] = useAuthState(auth);

  // Use state to track dark mode status
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage on initial render
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  // Toggle dark mode and save the preference in localStorage
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // inline styles for light and dark mode that affect the whole page
  const lightStyle = {
    backgroundColor: '#ffffff',
    color: '#000000',
    minHeight: '100vh',  // background color covers the full viewport height
  };

  const darkStyle = {
    backgroundColor: '#121212',
    color: '#e0e0e0',
    minHeight: '100vh',
  };

  const currentStyle = darkMode ? darkStyle : lightStyle;

  return (
    <div style={currentStyle}>
      <Navbar bg={darkMode ? "dark" : "primary"} variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">Country Browser</Navbar.Brand>
          <Button variant="outline-light" onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="me-auto">
              
              {/* Navigation Links */}
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/countries">
                <Nav.Link>Countries</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/favourites">
                <Nav.Link>Favourites</Nav.Link>
              </LinkContainer>
            
            </Nav>


            <Nav>
              {/* Conditionally render user options */}
              {user ? (
                <>
                  <Nav.Link className="text-white" disabled>{`Hello, ${user?.email}`}</Nav.Link>
                  <Button variant="outline-light" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Outlet renders the current page content */}
      <Container style={{ padding: '20px' }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout; 