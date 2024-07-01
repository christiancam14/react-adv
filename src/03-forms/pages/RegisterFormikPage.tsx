import "../styles/styles.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../components/MyTextInput";

export const RegisterFormikPage = () => {
  const initialValues = {
    name: "",
    email: "",
    password1: "",
    password2: "",
  };

  /*
    Nombre requerido < 15 caracteres
    Email requerido y valido
    Password < 6 e igual a Password2
    */

  return (
    <div>
      <h1>Register Formik Page</h1>

      <Formik
        initialValues={{ name: "", email: "", password1: "", password2: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Debe tener 15 caracteres o menos")
            .required("Requerido"),
          email: Yup.string()
            .email("El correo no tiene un formato válido")
            .required("Requerido"),
          password1: Yup.string()
            .required("Requerido")
            .min(6, "La contraseña debe tener al menos 6 caracteres"),
          password2: Yup.string()
            .required("Requerido")
            .oneOf([Yup.ref("password1")], "La contraseña no coincide"),
        })}
      >
        {({ handleReset }) => (
          <Form noValidate>
            <MyTextInput label={"Name"} name={"name"} />
            <MyTextInput label={"Email"} name={"email"} type="email" />
            <MyTextInput
              label={"Password"}
              name={"password1"}
              type="password"
            />
            <MyTextInput
              label={"Password"}
              name={"password2"}
              type="password"
            />

            <button type="submit">Create</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </Form>
        )}
      </Formik>
      {/* 
      <form noValidate onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          className={`${name.trim().length <= 0 && "has-error"}`}
        />
        {name.trim().length <= 0 && <span>Este campo es necesario</span>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          className={`${!isValidEmail(email) && "has-error"}`}
        />
        {!isValidEmail(email) && <span>Email no es válido</span>}
        <input
          type="password"
          placeholder="Password"
          name="password1"
          value={password1}
          onChange={onChange}
        />
        {password1.trim().length <= 0 && <span>Este campo es necesario</span>}
        {password1.trim().length < 6 && password1.trim().length > 0 && (
          <span>La contraseña tiene que tener 6 letras</span>
        )}
        <input
          type="password"
          placeholder="Repeat Password"
          name="password2"
          value={password2}
          onChange={onChange}
        />

        {password2.trim().length <= 0 && <span>Este campo es necesario</span>}
        {password2.trim().length > 0 && password1 !== password2 && password1.trim().length > 0 && (
          <span>Las contraseñas deben ser iguales</span>
        )}
        <button type="submit">Create</button>

        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
      </form>
          */}
    </div>
  );
};
