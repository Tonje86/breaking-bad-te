import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { WP_API, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const url = WP_API + TOKEN_PATH;

const schema = yup.object().shape({
    username: yup.string().required("Please enter your username").email("The username must be your email address"),
    password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [, setAuth] = useContext(AuthContext);

    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        console.log(data);

        try {
            const response = await axios.post(url, data);
            console.log("response", response.data);
            setAuth(response.data);
            history.push("/admin");
        } catch (error) {
            console.log("error", error);
            setLoginError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Container>
                <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    {loginError && <span>Wrong username and/or password</span>}
                    <Form.Group disabled={submitting}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" {...register("username")} />
                        {errors.username && <span>{errors.username.message}</span>}
                    </Form.Group>

                    <Form.Group disabled={submitting}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" {...register("password")} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {submitting ? "Loggin in..." : "Login"}
                    </Button>
                </Form>
            </Container>
        </>
    );
}
