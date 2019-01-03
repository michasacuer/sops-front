import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { ApiService } from "./api.service";

export class ModelState<T> {
  constructor(private modelStateResponse: {} = null) {}

  isOk(): boolean {
    return !this.modelStateResponse;
  }

  update(modelState: ModelState<T>) {
    this.modelStateResponse = modelState.modelStateResponse;
  }

  getErrorMessagesFor(propertyName: string): string[] {
    if (!this.modelStateResponse) {
      return [""];
    }

    propertyName = propertyName.toLowerCase();
    const keys = Object.keys(this.modelStateResponse);
    for (const key of keys) {
      if (key.split(".")[1].toLowerCase() === propertyName) {
        return this.modelStateResponse[key];
      }
    }
    return [""];
  }

  hasErrorMessage(propertyName: string): boolean {
    if (!this.modelStateResponse) {
      return false;
    }

    propertyName = propertyName.toLowerCase();
    const keys = Object.keys(this.modelStateResponse);
    for (const key of keys) {
      if (key.split(".")[1].toLowerCase() === propertyName) {
        return true;
      }
    }
    return false;
  }
}

export class DataResponse<T> {
  constructor(object?: T, errorMessage: string = null, modelState: {} = null) {
    this.object = object;
    this.errorMessage = errorMessage;
    this.modelState = new ModelState(modelState);
  }

  public object?: T;
  public errorMessage?: string;
  public modelState?: ModelState<T>;
}

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient, private api: ApiService) {}

  public getObjects<T>(type: new () => T): Observable<DataResponse<T[]>> {
    const url = this.getUrl(type);
    return this.http.get(url).pipe(
      map((input: Object, indx: number) => {
        const inputObjects: T[] = input as T[];
        const outputObjects: T[] = [];

        for (const obj of inputObjects) {
          outputObjects.push(Object.assign(new type(), obj));
        }

        return new DataResponse(outputObjects);
      }),
      catchError(this.handleError<T[]>(`get${type.name}`))
    );
  }

  public getObject<T>(
    type: new () => T,
    id: number
  ): Observable<DataResponse<T>> {
    const url = `${this.getUrl(type)}${id}`;
    return this.http.get<T>(url).pipe(
      map((input: Object, indx: number) => {
        const inputObject: T = input as T;
        const outputObject = new type();
        Object.assign(outputObject, inputObject);
        return new DataResponse(outputObject);
      }),
      catchError(this.handleError<T>(`get${type.name} id=${id}`))
    );
  }

  public getObjectByUrl<T>(
    type: new () => T,
    relativeUrl: string,
    options?: any
  ): Observable<DataResponse<T>> {
    const url = `${this.api.getBaseUrl()}${relativeUrl}`;
    return this.http.get<T>(url, options).pipe(
      map((input: Object, indx: number) => {
        const inputObject: T = input as T;
        const outputObject = new type();
        Object.assign(outputObject, inputObject);
        return new DataResponse(outputObject);
      }),
      catchError(this.handleError<T>(`get${type.name}`))
    );
  }

  public getObjectsByUrl<T>(
    type: new () => T,
    relativeUrl: string,
    options?: any
  ): Observable<DataResponse<T[]>> {
    const url = `${this.api.getBaseUrl()}${relativeUrl}`;
    return this.http.get(url, options).pipe(
      map((input: Object, indx: number) => {
        const inputObjects: T[] = input as T[];
        const outputObjects: T[] = [];

        for (const obj of inputObjects) {
          outputObjects.push(Object.assign(new type(), obj));
        }

        return new DataResponse(outputObjects);
      }),
      catchError(this.handleError<T[]>(`get${type.name}`))
    );
  }

  public putObject<T>(obj: T): Observable<DataResponse<any>> {
    const url = `${this.getUrl(obj.constructor)}${(<any>obj).id}`;
    return this.http.put(url, obj).pipe(
      map((input: Object, indx: number) => {
        return new DataResponse(input);
      }),
      catchError(this.handleError<any>(`update${obj.constructor.name}`))
    );
  }

  public postObject<T>(obj: T): Observable<DataResponse<any>> {
    const url = this.getUrl(obj.constructor);
    return this.http.post<T>(url, obj).pipe(
      map((input: Object, indx: number) => {
        return new DataResponse(input);
      }),
      catchError(this.handleError<T>(`add${obj.constructor.name}`))
    );
  }

  public postObjectByUrl<T>(
    obj: T,
    relativeUrl: string
  ): Observable<DataResponse<any>> {
    const url = `${this.api.getBaseUrl()}${relativeUrl}`;
    return this.http.post<T>(url, obj).pipe(
      map((input: Object, indx: number) => {
        return new DataResponse(input);
      }),
      catchError(this.handleError<T>(`add${obj.constructor.name}`))
    );
  }

  public deleteObject<T>(obj: T): Observable<DataResponse<any>> {
    const url = `${this.getUrl(obj.constructor)}${(<any>obj).id}`;
    return this.http.delete<T>(url).pipe(
      map((input: Object, indx: number) => {
        return new DataResponse(input);
      }),
      catchError(this.handleError<T>(`get${obj.constructor.name}`))
    );
  }

  public deleteObjectByUrl<T>(
    obj: T,
    relativeUrl: string
  ): Observable<DataResponse<any>> {
    const url = `${this.getUrl(obj.constructor)}${relativeUrl}`;
    return this.http.delete<T>(url).pipe(
      map((input: Object, indx: number) => {
        return new DataResponse(input);
      }),
      catchError(this.handleError<T>(`get${obj.constructor.name}`))
    );
  }

  private getUrl(type: Function): string {
    return `${this.api.getBaseUrl()}api/${type.name.toLowerCase()}/`;
  }

  public handleError<T>(operation = "operation") {
    return (errorResponse: any): Observable<DataResponse<T>> => {
      // console.error(operation);
      let errorMessage: string;
      let modelStatle: {};

      console.error("http error");
      console.error(errorResponse);

      if (errorResponse.error) {
        if (errorResponse.error.error_description) {
          errorMessage = errorResponse.error.error_description;
        } else if (errorResponse.error.message) {
          errorMessage = errorResponse.error.message;
        }

        if (errorResponse.error.modelState) {
          modelStatle = errorResponse.error.modelState;
        }
      }

      return of(
        new DataResponse(null, errorMessage, errorResponse.error.modelState)
      );
    };
  }
}
