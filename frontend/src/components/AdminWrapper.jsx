import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAdminLogoutMutation } from "../slices/adminApiSlice";
import { logout } from "../slices/adminSlice";
import { ToastContainer } from "react-toastify";

const AdminWrapper = () => {
    const {adminInfo} = useSelector((state)=>state.admin)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [logoutApiCall] = useAdminLogoutMutation();
    const logoutHandler = async () => {
        try {
            const res = await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/admin')
        } catch (error) {
            
        }
    };
    return (
        <>
            <header>
                <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand href="#home">
                               Admin Dashboard
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                {adminInfo ? (
                                    <>
                                        <NavDropdown
                                            title={adminInfo.name}
                                            id="username"
                                        >
                                            <NavDropdown.Item
                                                onClick={logoutHandler}
                                            >
                                                Logout
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                ) : (
                                    <>
                                        <LinkContainer to="/login">
                                            <Nav.Link>
                                                <FaSignInAlt /> Sign In
                                            </Nav.Link>
                                        </LinkContainer>
                                    </>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <ToastContainer></ToastContainer>
            <Outlet />
        </>
    );
};

export default AdminWrapper;
