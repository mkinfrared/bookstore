import { ValidationError } from "yup";

export default (error: ValidationError) => {
  const errors: Array<{ path: string; message: string }> = [];
  error.inner.forEach(({ path, message }) => errors.push({ path, message }));

  return errors;
};
