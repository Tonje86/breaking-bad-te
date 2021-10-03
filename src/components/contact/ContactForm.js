import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const schema = yup.object().shape({
    firstName: yup.string().required("Please fill in your first name").min(3, "The first name must be at least 3 characters"),
    lastName: yup.string().required("Please fill in your last name").min(4, "The last name must be at least 4 characters"),
    email: yup.string().required("Please enter an email address").email("Please enter a valid email address"),
    subject: yup.number().required("Please choose an option").typeError("Please choose an option"),
    message: yup.string().required("Please enter your message").min(10, "The message must be at least 10 characters"),
});

function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        console.log(data);

        setSubmitted(true);
    }

    console.log("errors", errors);

    return (
        <Container>
            {submitted && <Alert variant="success">Thank you, we have received your message</Alert>}
            <Form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>First name</Form.Label>
                    <Form.Control {...register("firstName")} />
                    {errors.firstName && <span>{errors.firstName.message}</span>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control {...register("lastName")} />
                    {errors.lastName && <span>{errors.lastName.message}</span>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register("email")} />
                    {errors.email && <span>{errors.email.message}</span>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select an option</Form.Label>
                    <Form.Control as="select" multiple {...register("subject")}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </Form.Control>
                    {errors.subject && <span>{errors.subject.message}</span>}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control {...register("message")} rows={3} />
                    {errors.message && <span>{errors.message.message}</span>}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
export default ContactForm;
