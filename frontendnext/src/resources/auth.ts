import { jwtDecode } from "jwt-decode";
import { BASE_URL } from ".";
import { AccessToken, Credentials, UserSessionToken } from "./user";

class AuthService {

    static AUTH_PARAM: string = "_auth";

async authenticate(credentials: Credentials): Promise<AccessToken> {
const response = await fetch(BASE_URL + "/users/auth", {
method: "POST",
body: JSON.stringify(credentials),
headers: {
    "Content-Type": "application/json"
}
});
if(response.status == 401) {
    throw new Error("Usuário ou senha incorretos");
}
return await response.json();
}

async saveUser(credentials: Credentials): Promise<void> {
    const response = await fetch(BASE_URL + "/users/save", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
        "Content-Type": "application/json"
    }
    });
    if(response.status == 401) {
        const responseError = await response.json();
        throw new Error(responseError);
    }
    }

    initSession(token: AccessToken) {
        if (token.accessToken) {
const decodedToken: any = jwtDecode(token.accessToken);

            const userSessionToken: UserSessionToken = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
                name: decodedToken.name,
                expiration: decodedToken.exp
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
if(expiration){
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