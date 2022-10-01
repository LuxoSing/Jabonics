import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { IUserGet } from "../interfaces/user-get.interface";
import { PortalHttpModule } from "./http.module";
import userGetData from 'src/assets/data/user-get.json';

@Injectable({
    providedIn: PortalHttpModule
})
export class SignInHttp {

    constructor() { }

    signIn(username: string, password: string): Observable<IUserGet> {
        return of<IUserGet>(userGetData)
            .pipe(
                delay(3000),
            );
    }
}