import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SearchResource } from "../../types";
import SearchBar from "../search-bar";

interface Props {
  onSubmit: (searchTerm: string, searchResource: SearchResource) => void;
  isSearching: boolean;
  hasResults: boolean;
  onClearSearch: () => void;
}

const NavBar = (props: Props) => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Star Wars Wiki</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/favourites">Favourite Characters</Nav.Link>
          <SearchBar {...props} />
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
