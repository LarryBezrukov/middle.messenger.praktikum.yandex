import SignupPage from "./signup";
import { renderDOM } from "../../utils/renderDOM";
import "../../styles/global.scss";

document.addEventListener("DOMContentLoaded", () => {
  const page = new SignupPage();

  renderDOM("#app", page);
});
