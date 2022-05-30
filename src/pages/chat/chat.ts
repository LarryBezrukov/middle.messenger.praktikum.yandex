import Block from "../../utils/Block";
import template from "./chat.pug";
import { ChatPlaceholder } from "../../components/ChatPlaceholder/chatPlaceholder";
import "./chat.scss";

export default class ChatPage extends Block {
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
