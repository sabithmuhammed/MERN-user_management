import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { imagePath } from "../constants/constants";

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const [cfrmPassword, setCfrmPassword] = useState("");
    const [readOnly, setReadOnly] = useState(true);
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setName(userInfo.name);
        setCurrentImage(userInfo.image);
    }, [userInfo, readOnly]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== cfrmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                    image,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Profile updated");
                setReadOnly(true);
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };
    return (
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
                        {!readOnly && (
                            <>
                                <div className="image-input flex-grow-1 ms-3">
                                    <Form.Label>Upload image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) =>
                                            setImage(e.target?.files[0])
                                        }
                                    ></Form.Control>
                                </div>
                            </>
                        )}
                    </div>
                </Form.Group>
                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={readOnly}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={readOnly}
                    ></Form.Control>
                </Form.Group>
                {readOnly ? (
                    <Button
                        type="button"
                        varient="primary"
                        className="mt-3"
                        onClick={() => setReadOnly(false)}
                    >
                        Edit
                    </Button>
                ) : (
                    <>
                        <Form.Group className="my-2" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group
                            className="my-2"
                            controlId="confirm-password"
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={cfrmPassword}
                                onChange={(e) =>
                                    setCfrmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <>
                                <Button
                                    type="button"
                                    varient="primary"
                                    className="mt-3"
                                    onClick={() => setReadOnly(true)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    varient="primary"
                                    className="mt-3 ms-3"
                                >
                                    Save
                                </Button>
                            </>
                        )}
                    </>
                )}
            </Form>
        </FormContainer>
    );
};

export default ProfileScreen;
