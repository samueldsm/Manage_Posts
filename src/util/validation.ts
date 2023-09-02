export const validateTrim = (value: string) => {
  return (
    value.trim().length > 0 || "The field cannot contain only blank spaces."
  );
};
