import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username harus diisi"),
  password: yup.string().required("Password harus diisi"),
});
