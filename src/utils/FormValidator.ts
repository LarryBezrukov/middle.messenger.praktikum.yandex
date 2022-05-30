import { Form } from "../components/Form/form";
import { Input } from "../components/Input/input";

class FormValidator {
  protected form: Form;
  protected inputs: Input[];

  constructor(form: Form, inputs: Input[]) {
    this.form = form;
    this.inputs = inputs;
  }
}
