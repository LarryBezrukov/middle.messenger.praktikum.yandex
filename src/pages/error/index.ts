import ErrorPage from "./error";
import { renderDOM } from "../../utils/renderDOM";
import "../../styles/global.scss";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  let errorCode = 200;
  let errorDescription = "OK";

  if (path === "/404.html") {
    errorCode = 404;
    errorDescription = "Page not found";
  } else if (path === "/500.html") {
    errorCode = 500;
    errorDescription = "Internal server error";
  }

  const page = new ErrorPage({
    errorCode,
    errorDescription,
  });

  renderDOM("#app", page);
});
