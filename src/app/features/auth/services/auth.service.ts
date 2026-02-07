import { Injectable } from "@angular/core";
import { LoginRequest, LoginResponse } from "../../../core/models/user.interface";
import { Observable, throwError } from "rxjs";
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

                observer.next(response);
                observer.complete();
            }
            return observer.error(new Error('Credenciales inválidas'));
        })



    }
}