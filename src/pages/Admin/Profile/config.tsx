import * as yup from "yup";

export const profileSchema = yup.object().shape({
  fullname: yup
    .string()
    .typeError("Nama lengkap harus diisi")
    .required("Nama lengkap harus diisi"),
  password_old: yup.string().nullable(),
  password_new: yup
    .string()
    .nullable()
    .transform((o, c) => (o === "" ? null : c))
    .min(6, "Password minimal harus terdiri dari 6 karakter"),

  password_confirm: yup
    .string()
    .oneOf([yup.ref("password_new"), ""], "Passwords tidak sama"),
});
