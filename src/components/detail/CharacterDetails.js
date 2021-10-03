import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { url } from "../../constants/api";
import { Loading } from "../common/Loading";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function CharacterDetails() {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let history = useHistory();

    const { id } = useParams();

    if (!id) {
        history.push("/");
    }

    const detailUrl = url + "/" + id;

    useEffect(
        function () {
            async function fetchData() {
                try {
                    const response = await fetch(detailUrl);

                    if (response.ok) {
                        const json = await response.json();
                        console.log(json);
                        setCharacter(json);
                    } else {
                        setError("An error occured");
                    }
                } catch (error) {
                    setError(error.toString());
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        },
        [detailUrl]
    );

    if (loading) {
        return (
            <Container>
                <Loading />
            </Container>
        );
    }

    if (error) {
        return <div>ERROR: Something went wrong </div>;
    }

    return (
        <>
            <Container>
                <Card style={{ width: "22rem" }}>
                    <Card.Img variant="top" src={character[0].img} alt="Photo of the actor" />
                    <Card.Body>
                        <Card.Title>{character[0].name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Nickname: {character[0].nickname}</ListGroup.Item>
                        <ListGroup.Item>Portrayed: {character[0].portrayed}</ListGroup.Item>
                        <ListGroup.Item>Status: {character[0].status}</ListGroup.Item>
                    </ListGroup>
                    <Link to="/" className="back-link">
                        Go back
                    </Link>
                </Card>
            </Container>
        </>
    );
}
export default CharacterDetails;
