import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { SearchResource } from "../../types";
import SearchBar from "../search-bar";

interface Props {
  onSubmit: (searchTerm: string, searchResource: SearchResource) => void;
  isSearching: boolean;
  hasResults: boolean;
  onClearSearch: () => void;
}

const NavBar = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")}>
          Star Wars Wiki
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/favourites")}>
              Favourite Characters
            </Nav.Link>
            <SearchBar {...props} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
