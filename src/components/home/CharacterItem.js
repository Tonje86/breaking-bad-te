import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function CharacterItem({ id, name, occupation }) {
    return (
        <Col>
            <Card style={{ width: "18rem" }}>
                <Card.Header as="h5">
                    <Link to={`detail/${id}`}>{name}</Link>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Occupation:</Card.Subtitle>
                    <Card.Text>
                        {occupation.map((occ) => (
                            <li key={occ}>{occ}</li>
                        ))}
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
