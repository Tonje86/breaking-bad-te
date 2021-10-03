import { useState, useEffect } from "react";
import { url } from "../../constants/api";
import CharacterItem from "./CharacterItem";
import { Loading } from "../common/Loading";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function CharacterList() {
    const [characters, setChararcters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await fetch(url);

                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                    setChararcters(json);
                } else {
                    setError("There was an error");
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

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
        <Container>
            <Row>
                {characters.map(function (character) {
                    const { char_id, name, occupation } = character;
                    return <CharacterItem key={char_id} id={char_id} name={name} occupation={occupation} />;
                })}
            </Row>
        </Container>
    );
}
export default CharacterList;
