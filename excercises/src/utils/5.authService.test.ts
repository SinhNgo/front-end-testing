import { AuthService } from "./5.authService";
import { vi } from "vitest";

global.fetch = vi.fn();
describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    vi.resetAllMocks();
  });

  it("should return user data when login is successful", async () => {
    const mockToken = "fake-token";
    const mockUser = { id: 1, name: "John Doe", email: "johndoe@example.com" };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({ token: mockToken }),
    });

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockUser),
    });

    const user = await authService.login({
      username: "test",
      password: "password",
    });

    expect(user).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/auth/login",
      expect.any(Object)
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://fakestoreapi.com/auth/user",
      expect.any(Object)
    );
  });

  it("should throw an error when login credentials are invalid", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      authService.login({ username: "test", password: "wrongpass" })
    ).rejects.toThrow("Invalid login credentials");

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when token is missing", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({}),
    });

    await expect(
      authService.login({ username: "test", password: "password" })
    ).rejects.toThrow("Invalid login credentials");

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when user data fetch fails", async () => {
    const mockToken = "fake-token";

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({ token: mockToken }),
    });

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(
      authService.login({ username: "test", password: "password" })
    ).rejects.toThrow("Failed to login");

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("should throw an error when user data is missing", async () => {
    const mockToken = "fake-token";

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce({ token: mockToken }),
    });

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(null),
    });

    await expect(
      authService.login({ username: "test", password: "password" })
    ).rejects.toThrow("Failed to login");

    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
