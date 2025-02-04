import { jwtDecode } from "jwt-decode";
import { AccessToken, Credentials, UserSessionToken } from "./user";
import axios from "axios";
import { baseUrl } from "utils/requests";

class AuthService {
  static AUTH_PARAM: string = "_auth";

  async authenticate(credentials: Credentials): Promise<AccessToken> {
    const response = await axios(`${baseUrl}/users/login`, {
      method: "POST",
      data: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 401) {
      throw new Error("Usuário ou senha incorretos");
    }
    return await response.data;
  }

  async saveUser(credentials: Credentials): Promise<void> {
    const response = await axios(`${baseUrl}/users/save`, {
      method: "POST",
      data: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 401) {
      const responseError = await response.data;
      throw new Error(responseError);
    }
  }

  initSession(token: AccessToken) {
    if (token.accessToken) {
      const decodedToken: any = jwtDecode(token.accessToken);

      const userSessionToken: UserSessionToken = {
        accessToken: token.accessToken,
        id: decodedToken.id,
        email: decodedToken.sub,
        username: decodedToken.username,
        userImage: decodedToken.userImage,
        expiration: decodedToken.exp,
      };
      this.setUserSession(userSessionToken);
    }
  }

  setUserSession(userSessionToken: UserSessionToken) {
    try {
      localStorage.setItem(
        AuthService.AUTH_PARAM,
        JSON.stringify(userSessionToken)
      );
    } catch (error) {}
  }

  getUserSession(): UserSessionToken | null {
    try {
      const authString = localStorage.getItem(AuthService.AUTH_PARAM);
      if (!authString) {
        return null;
      }
      const token: UserSessionToken = JSON.parse(authString);
      return token;
    } catch (error) {
      return null;
    }
  }

  isSessionValid(): boolean {
    const userSession: UserSessionToken | null = this.getUserSession();
    if (!userSession) {
      return false;
    }
    const expiration: number | undefined = userSession.expiration;
    if (expiration) {
      const expirationDateInMillis = expiration * 1000;
      return new Date() < new Date(expirationDateInMillis);
    }
    return false;
  }
  invalidateSession(): void {
    try {
      localStorage.removeItem(AuthService.AUTH_PARAM);
    } catch (error) {}
  }
}

export const useAuth = () => new AuthService();
