import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Environment } from "../environments/environments"
import {Contact} from "../app/interfaces/contact-response/contact";
import {ContactRequest} from "../app/interfaces/contact-request/contact";

@Injectable({
    providedIn:"root"
})
export class ContactService{
    private baseUrl = Environment.base_url;

    constructor(
        private http: HttpClient,
    ){}

    getContacts(): Observable<Contact[]>{

        const apiUrl= `${this.baseUrl}biz/contacts?expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress&hateoas=false`;

        return this.http.get<Contact[]>(apiUrl).pipe(catchError(this.handleError))
    }

    getContact(id: number): Observable<Contact>{
        const apiUrl= `${this.baseUrl}biz/contacts/${id}expand=Info,Info.InvoiceAddress,Info.DefaultPhone,Info.DefaultEmail,Info.DefaultAddress`;

        return this.http.get<Contact>(apiUrl).pipe(catchError(this.handleError))
    }

    editContact(id: number, body: any){
        const apiUrl =`${this.baseUrl}biz/contacts/${id}`;

        return this.http.put(apiUrl, body).pipe(catchError(this.handleError));
    }

    createContact(contact: ContactRequest){
        const body = JSON.stringify(contact);

        const apiUrl =`${this.baseUrl}biz/contacts/`;
        console.log("apiUrl, contact: " + apiUrl + " ,  ",  body)
        return this.http.post(apiUrl, contact).pipe(catchError(this.handleError));
    }

    deleteContact(id : number){
        const apiUrl =`${this.baseUrl}biz/contacts/${id}`;
        return this.http.delete<Contact>(apiUrl).pipe(catchError(this.handleError));
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage  = '';
        errorMessage = err.status + ' ' + err.message;
        
        console.log(errorMessage);
        return throwError(() => errorMessage);
    }
}

