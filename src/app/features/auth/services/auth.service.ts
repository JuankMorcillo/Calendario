import { Injectable } from "@angular/core";
import { LoginRequest, LoginResponse } from "../../../core/models/user.interface";
import { Observable } from "rxjs";
import { MOCK_LOGIN_RESPONSE, MOCK_USERS } from "../../../mocks/auth.mock";


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    login(credentials: LoginRequest): Observable<LoginResponse> {

        return new Observable<LoginResponse>(observer => {
            const user = MOCK_USERS.find(u => u.email == credentials.email && u.password == credentials.password);

            if (user) {
                const response: LoginResponse = MOCK_LOGIN_RESPONSE.find(r => r.user.email === user.email)!;

                sessionStorage.setItem('user', JSON.stringify(response));

                observer.next(response);
                observer.complete();
            }
            return observer.error(new Error('Credenciales inválidas'));
        })

    }

    getUser() {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    getRole(): string | null {
        const user = this.getUser();
        return user ? user.user.role : null;
    }

    logout(): boolean {
        sessionStorage.removeItem('user');
        return true;
    }

    isAuthenticated(): boolean {
        return sessionStorage.getItem('user') !== null;
    }
}