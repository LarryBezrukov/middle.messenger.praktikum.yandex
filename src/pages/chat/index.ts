import ChatPage from "./chat";
import { renderDOM } from "../../utils/renderDOM";
import "../../styles/global.scss";

document.addEventListener("DOMContentLoaded", () => {
  const page = new ChatPage();

  renderDOM("#app", page);
});
