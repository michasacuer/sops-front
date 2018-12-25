import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private api: ApiService) { }

  public getObjects<T> (type: new () => T): Observable<T[]> {
    const url = this.getUrl(type);
    return this.http.get(url).pipe(map((input: Object, indx: number) => {
      const inputObjects: T[] = input as T[];
      const outputObjects: T[] = [];

      for (const obj of inputObjects) {
        outputObjects.push(Object.assign(new type(), obj));
      }

      return outputObjects;
    }), catchError(this.handleError<T[]>(`get${type.name}`)));
  }

  public getObject<T> (type: new () => T, id: number): Observable<T> {
    const url = `${this.getUrl(type)}${id}`;
    return this.http.get<T>(url).pipe(map((input: Object, indx: number) => {
      const inputObject: T = input as T;
      const outputObject = new type();
      Object.assign(outputObject, inputObject);
      return outputObject;
    }, catchError(this.handleError<T>(`get${type.name} id=${id}`))));
  }

  public getObjectByUrl<T>(type: new () => T, relativeUrl: string, options?: any): Observable<T> {
    const url = `${this.api.getBaseUrl()}${relativeUrl}`;
    return this.http.get<T>(url, options).pipe(map((input: Object, indx: number) => {
      const inputObject: T = input as T;
      const outputObject = new type();
      Object.assign(outputObject, inputObject);
      return outputObject;
    }, catchError(this.handleError<T>(`get${type.name}`))));
  }

  public updateObject<T> (obj: T): Observable<any> {
    const url = `${this.getUrl(obj.constructor)}${(<any>obj).id}`;
    return this.http.put(url, obj)
        .pipe(catchError(this.handleError<any>(`update${obj.constructor.name}`)));
  }

  public addObject<T> (obj: T): Observable<T> {
    const url = this.getUrl(obj.constructor);
    return this.http.post<T>(url, obj)
        .pipe(catchError(this.handleError<T>(`add${obj.constructor.name}`)));
  }

  public deleteObject<T>(obj: T): Observable<T> {
    const url = `${this.getUrl(obj.constructor)}${(<any>obj).id}`;

    return this.http.delete<T>(url)
        .pipe(catchError(this.handleError<T>(`get${obj.constructor.name}`)));
  }

  private getUrl(type: Function): string {
    return `${this.api.getBaseUrl()}api/${type.name.toLowerCase()}/`;
  }

  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
