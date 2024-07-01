import { Formik, Form } from "formik";
import formJson from "../data/custom-form.json";
import { MySelect, MyTextInput } from "../components";
import * as Yup from "yup";

const initialValues: { [key: string]: any } = {};

// const requiredFields: { [key: string]: any } = {};

for (const input of formJson) {
  initialValues[input.name] = input.value;

  /*
  if (!input.validations) continue;

  let schema = Yup.object();

  for (const rule of input.validations) {
    if (rule.type === "required") {
    }
  }

  console.log("Hola");
  */
}

const requiredFields = {
  ...formJson.reduce((a, v) => {
    console.log({a, v});
    if (v.validations) {
      let schema = Yup.string();
      for (const rule of v.validations) {
        if (rule.type === "required") {
          schema = schema.required(rule.message);
        }
        if (rule.type === "minLength") {
          schema = schema.min(
            (rule as any).value || 2,
            `Minimo de ${(rule as any).value || 2} caracteres`
          );
        }
        if (rule.type === "email") {
          schema = schema.email(rule.message);
        }
      }
      return { ...a, [v.name]: schema };
    }
    return { ...a };
  }, {}),
};

export const DynamicForm = () => {
  return (
    <div>
      <h1>Dynamic Form</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({...requiredFields})}
      >
        {(formik) => {
          return (
            <Form noValidate>
              {formJson.map(({ type, name, placeholder, label, options }) => {
                if (
                  type === "input" ||
                  type === "password" ||
                  type === "email"
                ) {
                  return (
                    <MyTextInput
                      key={name}
                      type={type as any}
                      className="form-group"
                      label={label}
                      placeholder={placeholder}
                      name={name}
                    />
                  );
                } else if (type === "select") {
                  return (
                    <MySelect
                      key={name}
                      type={type as any}
                      className="form-group"
                      label={label}
                      placeholder={placeholder}
                      name={name}
                    >
                      <option value="">Select an option</option>
                      {options?.map(({ id, label }) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </MySelect>
                  );
                }

                throw new Error(`El tipo ${type} no es soportado`);
              })}

              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
