import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useAdminAddUserMutation } from "../slices/adminApiSlice";

const AdminAddUserScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cfrmPassword, setCfrmPassword] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [register, { isLoading }] = useAdminAddUserMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== cfrmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await register({
                    name,
                    email,
                    password,
                    image,
                }).unwrap();
                navigate("/admin");
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };
    return (
        <>
            <Container className="mt-3">
                <Link to="../home">Go Back</Link>
            </Container>
            <FormContainer>
                <h1>Sign Up</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="image">
                        <div className="image-div d-flex justify-content-between">
                            <div className="image-preview">
                                {image && (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="image-input flex-grow-1 ms-3">
                                <Form.Label>Upload image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                ></Form.Control>
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="my-2" controlId="confirm-password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={cfrmPassword}
                            onChange={(e) => setCfrmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {isLoading ? (
                        <Loader></Loader>
                    ) : (
                        <>
                            <Button
                                type="submit"
                                varient="primary"
                                className="mt-3"
                            >
                                Add user
                            </Button>
                        </>
                    )}
                </Form>
            </FormContainer>
        </>
    );
};

export default AdminAddUserScreen;
