import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private backendUrl = 'http://localhost:56971/api/';

  public getObjects<T> (type: new () => T): Observable<T[]> {
    const url = this.getUrl(type);
    console.log(url);
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
    console.log(url);
    return this.http.get<T>(url).pipe(map((input: Object, indx: number) => {
      const inputObject: T = input as T;
      const outputObject = new type();
      Object.assign(outputObject, inputObject);
      return outputObject;
    }, catchError(this.handleError<T>(`get${type.name} id=${id}`))));
  }

  public updateObject<T> (obj: T): Observable<any> {
    const url = `${this.getUrl(obj.constructor)}${(<any>obj).id}`;
    return this.http.put(url, obj, httpOptions)
        .pipe(catchError(this.handleError<any>(`update${obj.constructor.name}`)));
  }

  public addObject<T> (obj: T): Observable<T> {
    const url = this.getUrl(obj.constructor);
    return this.http.post<T>(url, obj, httpOptions)
        .pipe(catchError(this.handleError<T>(`add${obj.constructor.name}`)));
  }

  public deleteObject<T>(obj: T): Observable<T> {
    const url = `${this.getUrl(obj.constructor)}${(<any>obj).id}`;

    return this.http.delete<T>(url, httpOptions)
        .pipe(catchError(this.handleError<T>(`get${obj.constructor.name}`)));
  }

  private getUrl(type: Function): string {
    return `${this.backendUrl}${type.name.toLowerCase()}/`;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient) { }
}
