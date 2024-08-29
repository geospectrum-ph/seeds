import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  function parseError() {
    let errorMessage;

    if (isRouteErrorResponse(error)) {
      errorMessage = error.error?.message || error.statusText;
    }
    else if (error instanceof Error) {
      errorMessage = error.message;
    }
    else if (typeof error === "string") {
      errorMessage = error;
    }
    else {
      errorMessage = "Unknown error";
    }

    return (errorMessage);
  }

  return (
    <div class = "container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{ parseError() }</i>
      </p>
      <Link to = { "/" }><p>Go back.</p></Link>
    </div>
  );
}