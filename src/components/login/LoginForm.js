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

    const [auth, setAuth] = useContext(AuthContext);

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

// const schema = yup.object().shape({
//   username: yup
//     .string()
//     .required("Enter your username")
//     .min(3, "Enter a valid username"),
//   password: yup
//     .string()
//     .required("Enter your password")
//     .min(8, "Your password must be at least 8 characters"),
// });
// export default function SignIn() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState(null);
//   const history = useHistory();
//   const [auth, setAuth] = useContext(AuthContext);
//   console.log(auth);

//   async function onSubmit(data) {
//     setSubmitting(true);
//     setLoginError(false);
//     const body = {
//       identifier: data.username,
//       password: data.password,
//     };
//     try {
//       const response = await axios.post(url, body);
//       console.log(response, response.data);
//       setAuth(response.data);
//       history.push("/dashboard");
//     } catch (error) {
//       setLoginError(error.toString());
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div>
//       <form
//         id="contactForm"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <h2>Title</h2>
//         <p className="login-error">{loginError}</p>
//         <fieldset disabled={submitting} style={{ border: "none" }}>
//           <div className="form-control">
//             <label>Username</label>
//             <input
//               type="text"
//               {...register("username")}
//               placeholder="Please enter your username"
//             />
//             {errors.username && <span>{errors.username.message}</span>}
//           </div>
//           <div className="form-control">
//             <label>Password</label>
//             <input
//               type="password"
//               {...register("password")}
//               placeholder="Please enter your password"
//             />
//             {errors.password && <span>{errors.password.message}</span>}
//           </div>

//           <button>{submitting ? "logging in" : "Login"}</button>
//         </fieldset>
//       </form>
//     </div>
//   );
// };
