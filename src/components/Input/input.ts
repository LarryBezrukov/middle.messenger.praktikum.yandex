import Block from "../../utils/Block";
import template from "./input.pug";
import "./input.scss";

interface InputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
