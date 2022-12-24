export const handleValidationError = (error: any) => {
  const errors = Object.values(error.errors).map((err: any) => err.message);
  const fields = Object.values(error.errors).map((err: any) => err.path);
  const code = 400;

  return {
    code,
    fields,
    messages: { errors, fields },
  };
};
