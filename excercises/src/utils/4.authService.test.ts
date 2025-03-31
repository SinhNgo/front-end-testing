import { AuthService } from "./4.authService";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return token when login is successful", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: "fake-token" }),
      })
    );

    const token = await authService.login({ username: "user", password: "pass" });
    expect(token).toBe("fake-token");
  });

  it("should throw an error when login request fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: false })
    ) 

    await expect(authService.login({ username: "user", password: "pass" }))
      .rejects.toThrow("Login failed");
  });

  it("should throw an error when token is missing", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) 

    await expect(authService.login({ username: "user", password: "pass" }))
      .rejects.toThrow("Invalid token");
  });

  it("should call sendLoginRequest with correct parameters", async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: "fake-token" }),
      })
    );

    global.fetch = fetchMock 

    await authService.login({ username: "testUser", password: "testPass" });

    expect(fetchMock).toHaveBeenCalledWith("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "testUser", password: "testPass" }),
    });
  });

  it("should validate response correctly", () => {
    const response = { ok: true } as Response;
    expect(() => authService.validateResponse(response)).not.toThrow();

    const responseFail = { ok: false } as Response;
    expect(() => authService.validateResponse(responseFail)).toThrow("Login failed");
  });

  it("should validate token correctly", () => {
    expect(() => authService.validateToken({ token: "valid-token" })).not.toThrow();
    expect(() => authService.validateToken({})).toThrow("Invalid token");
  });
});
