import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'https://dog.ceo/api'; // Cambia por tu URL base

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  /**
   * Manejo de errores HTTP
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Error del lado del cliente o de red
      console.error('Error del cliente:', error.error);
    } else {
      // El backend retornó un código de error
      console.error(
        `Backend retornó código ${error.status}, body: `,
        error.error
      );
    }
    // Retorna un observable con un mensaje de error
    return throwError(
      () => new Error('Algo salió mal; por favor intenta de nuevo.')
    );
  }

  /**
   * get
   * @param endpoint 
   * @returns 
   */
  public get(endpoint: string) {
    return this._http.get(`${this.baseUrl}/${endpoint}`).pipe(
      map((response: any) => <any>response),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * getById
   * @param endpoint 
   * @returns 
   */
  public getById(endpoint: string) {
    return this._http.get(`${this.baseUrl}/${endpoint}`).pipe(
      map((response: any) => <any>response),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  /**
   * POST
   * @param endpoint 
   * @param body 
   * @returns 
   */
  public post(endpoint: string, body: any) {
    return this._http
      .post(`${this.baseUrl}/${endpoint}`, body, this.httpOptions)
      .pipe(
        map((response: any) => <any>response),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  /**
   * PUT
   * @param endpoint 
   * @param body 
   * @returns 
   */
  public put(endpoint: string, body: any) {
    return this._http
      .put(`${this.baseUrl}/${endpoint}`, body, this.httpOptions)
      .pipe(
        map((response: any) => <any>response),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }
}
