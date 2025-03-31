import { UserInput, validateUserInput } from "./3.input";

describe("validateUserInput", () => {
  it("should return true for valid input", () => {
    const validInput: UserInput = {
      username: "JohnDoe",
      email: "johndoe@example.com",
      password: "SecurePass123",
    };
    expect(validateUserInput(validInput)).toBe(true);
  });

  it("should return an error when username is missing", () => {
    const input: UserInput = {
      username: "",
      email: "test@example.com",
      password: "SecurePass123",
    };
    expect(validateUserInput(input)).toContain("Username is required");
  });

  it("should return an error when username is too short", () => {
    const input: UserInput = {
      username: "JD",
      email: "test@example.com",
      password: "SecurePass123",
    };
    expect(validateUserInput(input)).toContain("Username must be between 3 and 20 characters");
  });

  it("should return an error when username is too long", () => {
    const input: UserInput = {
      username: "J".repeat(21),
      email: "test@example.com",
      password: "SecurePass123",
    };
    expect(validateUserInput(input)).toContain("Username must be between 3 and 20 characters");
  });

  it("should return an error when email is missing", () => {
    const input: UserInput = {
      username: "JohnDoe",
      email: "",
      password: "SecurePass123",
    };
    expect(validateUserInput(input)).toContain("Email is required");
  });

  it("should return an error when email is invalid", () => {
    const input: UserInput = {
      username: "JohnDoe",
      email: "invalid-email",
      password: "SecurePass123",
    };
    expect(validateUserInput(input)).toContain("Email is invalid");
  });

  it("should return an error when password is missing", () => {
    const input: UserInput = {
      username: "JohnDoe",
      email: "test@example.com",
      password: "",
    };
    expect(validateUserInput(input)).toContain("Password is required");
  });

  it("should return an error when password is too short", () => {
    const input: UserInput = {
      username: "JohnDoe",
      email: "test@example.com",
      password: "Short",
    };
    expect(validateUserInput(input)).toContain("Password must be between 6 and 40 characters");
  });

  it("should return an error when password is too long", () => {
    const input: UserInput = {
      username: "JohnDoe",
      email: "test@example.com",
      password: "P".repeat(41),
    };
    expect(validateUserInput(input)).toContain("Password must be between 6 and 40 characters");
  });

  it("should return an error when password does not contain an uppercase letter", () => {
    const input: UserInput = {
      username: "JohnDoe",
      email: "test@example.com",
      password: "password123",
    };
    expect(validateUserInput(input)).toContain("Password must contain at least one uppercase letter");
  });

  it("should return multiple errors when multiple fields are invalid", () => {
    const input: UserInput = {
      username: "",
      email: "invalid-email",
      password: "short",
    };
    const errors = validateUserInput(input);
    expect(errors).toContain("Username is required");
    expect(errors).toContain("Email is invalid");
    expect(errors).toContain("Password must be between 6 and 40 characters");
  });
});