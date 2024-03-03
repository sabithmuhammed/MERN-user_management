import React from 'react'
import { Navbar,Container,Nav } from 'react-bootstrap'
import {FaSignInAlt,FaSignOutAlt} from 'react-icons/fa'

const Header = () => {
  return (
    <header>
        <Navbar bg='dark' varient='dark' expand='lg' collapseOnSelect  >
            <Container>
                <Navbar.Brand href='/' className='text-secondary'>USER MANAGEMENT</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' className='bg-secondary' ></Navbar.Toggle>
                <Navbar.Collapse id='basic-navbar-nav' >
                    <Nav className='ms-auto' >
                        <Nav.Link href='/login' className='text-secondary'>
                            <FaSignInAlt></FaSignInAlt> SignIn
                        </Nav.Link>
                        <Nav.Link href='/register'className='text-secondary' >
                            <FaSignOutAlt></FaSignOutAlt> SignOut
                        </Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>

        </Navbar>
    </header>
  )
}

export default Header
