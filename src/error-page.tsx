import { useRouteError, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./error-page.css";

export default function ErrorPage() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div id="error-page" className="error-container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  );
}
