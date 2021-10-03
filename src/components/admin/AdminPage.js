import Heading from "../layout/Heading";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

export default function AdminPage() {
    return (
        <>
            <Heading title="Admin page" />
            <Container>
                <Image src="images/flower1.jpg" alt="flower with rainbow colors" fluid />
            </Container>
        </>
    );
}
