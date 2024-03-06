import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { imagePath } from "../constants/constants";
import { Link, useParams,useNavigate } from "react-router-dom";
import {
    useGetOneUserMutation,
    useAdminUpdateUserMutation,
} from "../slices/adminApiSlice";

const AdminUserEditScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");

    const { userId } = useParams();
    const [getUser] = useGetOneUserMutation();
    const [updateUser,{isLoading}] = useAdminUpdateUserMutation();
    const navigate = useNavigate()

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await getUser(userId);
                setName(res?.data?.name);
                setEmail(res?.data?.email);
                setCurrentImage(res?.data?.image);
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        };
        getUserInfo();
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await updateUser({
                _id: userId,
                name,
                email,
                image,
            }).unwrap();
            toast.success("Profile updated");
            navigate('/admin/home')
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };
    return (
        <>
            <Container className="mt-3">
                <Link to="/admin/home">Go Back</Link>
            </Container>
            <FormContainer>
                <h1>Profile</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="my-2" controlId="image">
                        <div className="image-div d-flex justify-content-between">
                            <div className="image-preview">
                                <img
                                    src={
                                        image
                                            ? URL.createObjectURL(image)
                                            : currentImage &&
                                              `${imagePath}/${currentImage}`
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="image-input flex-grow-1 ms-3">
                                <Form.Label>Upload image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) =>
                                        setImage(e.target?.files[0])
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
                <Button className="mt-3 w-100" type="submit">
                    Save
                </Button>
                </Form>
            </FormContainer>
        </>
    );
};

export default AdminUserEditScreen;
