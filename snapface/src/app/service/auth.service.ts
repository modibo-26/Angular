import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class authService {
    private token = 'MyFakeToken'


    getToken(): string {
        return this.token;
    }

    setToken(token: string) {
        this.token = token;
    }

}
