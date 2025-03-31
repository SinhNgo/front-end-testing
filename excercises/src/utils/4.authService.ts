// Viết unit test kiểm tra hàm login trong class AuthService.
// Có thể thực hiện refactor code trong quá trình làm.

export class AuthService {
  API_URL = "https://fakestoreapi.com/auth/login";

  async login(credentials: { username: string; password: string }) {
    const response = await this.sendLoginRequest(credentials);
    this.validateResponse(response);
    const data = await response.json();
    this.validateToken(data);
    return data.token;
  }

  async sendLoginRequest(credentials: { username: string; password: string }) {
    return fetch(this.API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  }

  validateResponse(response: Response) {
    if (!response.ok) {
      throw new Error("Login failed");
    }
  }

  validateToken(data: any) {
    if (!data.token) {
      throw new Error("Invalid token");
    }
  }
}
