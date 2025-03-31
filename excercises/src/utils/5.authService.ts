// Viết unit test kiểm tra hàm login trong class AuthService.
// Có thể thực hiện refactor code trong quá trình làm.

export class AuthService {
  API_BASE = "https://fakestoreapi.com/auth";

  async login(credentials: { username: string; password: string }) {
    try {
      const token = await this.fetchToken(credentials);
      const user = await this.fetchUser(token);
      return user;
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw new Error(error.message);
    }
  }

  async fetchToken(credentials: { username: string; password: string }): Promise<string> {
    const response = await fetch(`${this.API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid login credentials");
    }

    const data = await response.json();
    if (!data.token) {
      throw new Error("Invalid login credentials");
    }

    return data.token;
  }

  async fetchUser(token: string): Promise<any> {
    const response = await fetch(`${this.API_BASE}/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const userData = await response.json();
    if (!userData) {
      throw new Error("Failed to login");
    }

    return userData;
  }
}
