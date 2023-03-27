import Link from 'next/link'
import {Button, Nav} from 'react-bootstrap';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
const NavbarComponent = () => {
   const [isLoggedIn, setLogin] =  useState(false);
   const [userName, setUserName] = useState('');
  return (
    <Navbar bg="primary" variant="dark">
    <Container>
      <Link href="/" passHref>
      <Navbar.Brand>Chattel Invest <WorkspacesIcon/></Navbar.Brand>
      </Link>
      <Nav className="me-auto">
        <Link href="/" passHref>
        <Button>Home</Button>
        </Link>
        <Link href="/features" passHref>
        <Button>Features</Button>
        </Link>
        <Link href="/portfolio" passHref>
          <Button>Portfolio</Button>
        </Link>
      </Nav>
      <Nav className="justify-content-end" style={{ width: "100%" }}>
            <LoginComponent isLoggedIn = {isLoggedIn} userName = {userName}/>
        </Nav>
    </Container>
  </Navbar>
  );
}

const LoginComponent = (props:any) => {
  const isLoggedIn = props.isLoggedIn;
  const userName = props.userName;
  if (isLoggedIn) {
    return (
      <Link href="/userName" passHref>
      <Button>Logged In as {userName}</Button>
      </Link>
    );
  }
  return (
    <Link href="/SignIn" passHref>
    <Button>Sign In</Button>
    </Link>
  );
}
export default NavbarComponent;