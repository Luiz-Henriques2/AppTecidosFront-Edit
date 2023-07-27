import { Injectable } from "@angular/core";
import { AccountService } from "../account/shared/account.service";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (
        private accountService: AccountService
    ){}

        intercept(req: HttpRequest<any>, next: HttpHandler){
            const token = this.accountService.getAuthorizationToken();
            let request: HttpRequest<any> = req;

            if (token) {
                request = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`)
                })
            }

            return next.handle(request)
                .pipe(
                    catchError(this.handleError)
                )
        }

        private handleError(error: HttpErrorResponse){
            if(error.error instanceof ErrorEvent){
                console.error('Ocorreu um erro:', error.error.message)
            }else{
                console.error(
                    `Código do erro ${error.status}, `+
                    `Erro: ${JSON.stringify(error.error)}`)
            }
            return throwError('Ocorreu um erro, tente novamente')
        }
}
