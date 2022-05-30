import Block from "../../utils/Block";
import template from "./signup.pug";
import { Input } from "../../components/Input/input";
import { Button } from "../../components/Button/button";
import { Form } from "../../components/Form/form";
import "./signup.scss";

export default class SignupPage extends Block {
  constructor() {
    super();
  }

  protected initChildren() {
    this.children.form = new Form({
      formInputs: [
        new Input({
          label: "Email",
          type: "email",
          id: "email",
          name: "email",
          placeholder: "mail@example.com",
        }),
        new Input({
          label: "Username",
          type: "text",
          id: "username",
          name: "username",
          placeholder: "Choose a username",
        }),
        new Input({
          label: "First name",
          type: "text",
          id: "fist_name",
          name: "fist_name",
          placeholder: "Enter your first name",
        }),
        new Input({
          label: "Last name",
          type: "text",
          id: "last_name",
          name: "last_name",
          placeholder: "Enter your last name",
        }),
        new Input({
          label: "Phone number",
          type: "tel",
          id: "phone",
          name: "phone",
          placeholder: "+7 (999) 999 99 99",
        }),
        new Input({
          label: "Password",
          type: "password",
          id: "password",
          name: "password",
          placeholder: "••••••••",
        }),
        new Input({
          label: "Repeat password",
          type: "password",
          id: "repreat_password",
          name: "repeat_password",
          placeholder: "••••••••",
        }),
      ],
      formButton: new Button({
        label: "Sign up",
        classes: "form__button",
        type: "submit",
      }),
      events: {
        submit: (e) => this.submitHandler(e),
      },
    });
  }

  render() {
    return this.compile(template, {});
  }
}
