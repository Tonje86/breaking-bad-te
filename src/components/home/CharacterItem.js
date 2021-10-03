import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function CharacterItem({ id, name, occupation }) {
    return (
        <Col>
            <Card style={{ width: "18rem" }}>
                <Card.Header as="h5">{name}</Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Occupation:</Card.Subtitle>
                    <Card.Text>
                        <li>{occupation[0]}</li>
                        <li>{occupation[1]}</li>
                        <li>{occupation[2]}</li>
                        <li>{occupation[3]}</li>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to={`detail/${id}`}>More details</Link>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default CharacterItem;

// I was not sure how to display the result from occupation in a list, instead of everything on one line so I checked the
// the length of the occuptation result and found it to be 4.
// I therefore listed occupation from 0-3, but I am sure this isn't the best way XD
