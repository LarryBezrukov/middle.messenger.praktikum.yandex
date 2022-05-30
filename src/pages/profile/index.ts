import ProfilePage from "./profile";
import { renderDOM } from "../../utils/renderDOM";
import "../../styles/global.scss";

document.addEventListener("DOMContentLoaded", () => {
  const page = new ProfilePage();

  renderDOM("#app", page);
});
