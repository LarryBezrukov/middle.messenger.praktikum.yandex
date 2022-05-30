import Block from "../../utils/Block";
import template from "./profile.pug";
import { ChatPlaceholder } from "../../components/ChatPlaceholder/chatPlaceholder";
import "./profile.scss";

export default class ProfilePage extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.children.chatPlaceholders = [];

    for (var i = 0; i < 7; i++) {
      this.children.chatPlaceholders.push(new ChatPlaceholder());
    }
  }

  render() {
    return this.compile(template, {});
  }
}
