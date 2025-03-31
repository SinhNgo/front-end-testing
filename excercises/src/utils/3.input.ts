export type UserInput = {
  username: string;
  email: string;
  password: string;
};

export function validateUserInput(input: UserInput): true | string[] {
  const errors: string[] = [];

  function validateUsername(username: string) {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) return "Username is required";
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20)
      return "Username must be between 3 and 20 characters";
  }

  function validateEmail(email: string) {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
  }

  function validatePassword(password: string) {
    if (!password) return "Password is required";
    if (password.length < 6 || password.length > 40)
      return "Password must be between 6 and 40 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
  }

  [validateUsername(input.username), validateEmail(input.email), validatePassword(input.password)]
    .forEach(error => error && errors.push(error));

  return errors.length > 0 ? errors : true;
}
