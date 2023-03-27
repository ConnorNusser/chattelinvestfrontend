import Link from 'next/link'
import {Button, Nav} from 'react-bootstrap';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSession, signIn, signOut } from "next-auth/react"
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
  const { data: session } = useSession()
  console.log(session);
  if (session) {
    return (
      <Button onClick={() => signOut()}>Welcome {session.user?.name} Sign out</Button>
    );
  }
  return (
    <Button onClick={() => signIn()}>Sign in</Button>
  );
}
export default NavbarComponent;