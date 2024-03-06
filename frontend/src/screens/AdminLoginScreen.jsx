import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from "../slices/adminApiSlice";
import { setCredentials } from "../slices/adminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AdminLoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useAdminLoginMutation();

    const { adminInfo } = useSelector((state) =>state.admin);

    useEffect(() => {
        if (adminInfo) {
            navigate("/admin/home");
        }
    }, [navigate, adminInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate("/");
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
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
                {isLoading ? (
                    <Loader></Loader>
                ) : (
                    <>
                        <Button
                            type="submit"
                            varient="primary"
                            className="mt-3"
                        >
                            Sign In
                        </Button>
                    </>
                )}
            </Form>
        </FormContainer>
    );
};

export default AdminLoginScreen;