import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/layout/Navigation";
import CharacterDetails from "./components/detail/CharacterDetails";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import LoginPage from "./components/login/LoginPage";
import AdminPage from "./components/admin/AdminPage";
import "./sass/style.scss";

function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Navigation />

                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/detail/:id">
                            <CharacterDetails />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/admin">
                            <AdminPage />
                        </Route>
                    </Switch>
                </Router>
            </AuthProvider>
        </>
    );
}

export default App;
