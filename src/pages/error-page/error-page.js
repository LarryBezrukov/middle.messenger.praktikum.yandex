import template from "./error-page.pug";
import "../../styles/global.scss";
import "./error-page.scss";

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (path === "/404.html") {
    document.body.innerHTML = template({
      errorCode: 404,
      errorDescription: "Page Not Found",
    });
  } else if (path === "/500.html") {
    document.body.innerHTML = template({
      errorCode: 500,
      errorDescription: "Internal Server Error",
    });
  }
});
