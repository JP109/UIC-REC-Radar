export const validatePassword = (password) => {
  const requirements = [
    {
      test: /.{8,}/,
      message: "At least 8 characters long",
    },
    {
      test: /[A-Z]/,
      message: "At least one uppercase letter",
    },
    {
      test: /[a-z]/,
      message: "At least one lowercase letter",
    },
    {
      test: /[0-9]/,
      message: "At least one number",
    },
    {
      test: /[^A-Za-z0-9]/,
      message: "At least one special character",
    },
  ];

  return requirements.map((req) => ({
    valid: req.test.test(password),
    message: req.message,
  }));
};
