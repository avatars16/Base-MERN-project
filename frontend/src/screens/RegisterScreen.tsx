import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/usersApiSlice";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useAppSelector((state) => state.auth);
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) return toast.error("Passwords don't match");
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (err: any) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1>Register</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Existing customer? <Link to={`/login`}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
