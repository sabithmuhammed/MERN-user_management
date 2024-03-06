import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Container,
    Table,
    Row,
    Button,
    Col,
    Form,
    Modal,
} from "react-bootstrap";
import {
    useGetUsersMutation,
    useAdminDeleteUserMutation,
} from "../slices/adminApiSlice";

import UserTile from "../components/UserTile";
import { toast } from "react-toastify";

const AdminHomeScreen = () => {
    const { adminInfo } = useSelector((state) => state.admin);
    const [getUsers, { isLoading }] = useGetUsersMutation();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    useEffect(() => {
        const getAllUsers = async () => {
            const res = await getUsers();
            setUsers(res.data);
        };
        getAllUsers();
    }, []);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [deleteUser] = useAdminDeleteUserMutation();
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setDeleteUserId(id);
        setShow(true);
    };
    const handleConfirm = async () => {
        try {
            const res = await deleteUser(deleteUserId);
            setShow(false);
            if (res.data._id) {
                toast.success("Successfully deleted");
                const remainingUsers = users.filter(
                    (user) => user._id !== res.data._id
                );
                setUsers(remainingUsers);
            }
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you Sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2 className="text-center mt-3 text-white">User details</h2>

            <Container>
                <Row className="my-4 d-flex">
                    <Col className=" d-flex justify-content-end">
                        <Link to="../add-user">
                            <Button className="btn-success">Add User</Button>
                        </Link>
                    </Col>
                </Row>
                <Row className="my-4 d-flex">
                    <Col>
                        <Form.Group className="my-2" controlId="password">
                            <Form.Control
                                type="search"
                                placeholder="Search..."
                                onChange={(e) => setSearch(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Table striped bordered hover variant="dark" className="mb-3">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length ? (
                            users
                                .filter((item) => {
                                    return search.toLowerCase() === ""
                                        ? item
                                        : item.name
                                              .toLowerCase()
                                              .includes(search) ||
                                              item.email.includes(search);
                                })
                                .map((user) => {
                                    return (
                                        <UserTile
                                            key={user._id}
                                            name={user.name}
                                            email={user.email}
                                            image={user.image}
                                            id={user._id}
                                            handleShow={handleShow}
                                        />
                                    );
                                })
                        ) : (
                            <tr>
                                <td>No users found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default AdminHomeScreen;
