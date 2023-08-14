import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export abstract class AbstractService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }),
    };

    abstract path: string;

    constructor(
        protected httpClient: HttpClient
    ) { }

    baseUrl = environment.API;

    post<T>(route: string[], body: unknown, queryParams = new Map<string, unknown>(), contentType?: string): Observable<T> {
        let url = this.baseUrl + this.path;

        url += this._buildRouteFromStringArray(route) + this._buildQueryParameters(queryParams);

        if (contentType === undefined) {
            return this.httpClient.post<T>(url, body);
        } else {
            const header = this.createContentTypeHeader(contentType);

            return this.httpClient.post<T>(url, body, {
                headers: header,
            });
        }
    }

    get<T>(route: string[], queryParameters?: Map<string, unknown>, acceptType?: string, responseType?: "json"): Observable<T> {
        let url = this.baseUrl + this.path;
    
        url += this._buildRouteFromStringArray(route) 
        if(queryParameters != undefined) {url += this._buildQueryParameters(queryParameters)};
        if (acceptType && responseType) {
            return this.httpClient.get<T>(url, {
                headers: {
                    'accept': acceptType,
                    'content-type': acceptType,
                },
                responseType: responseType,
            });
        } else if (acceptType) {
            return this.httpClient.get<T>(url, {
                headers: {
                    'accept': acceptType,
                    'content-type': acceptType,
                },
            });
        } else {
            return this.httpClient.get<T>(url, {
            });
        }
    }

    patch<T>(route: string[], body: unknown, queryParameters = new Map<string, unknown>(), contentType?: string): Observable<T> {
        let url = this.baseUrl + this.path;

        url += this._buildRouteFromStringArray(route) + this._buildQueryParameters(queryParameters);

        if (contentType === undefined) {
            return this.httpClient.patch<T>(url, body);
        } else {
            const header = this.createContentTypeHeader(contentType);

            return this.httpClient.patch<T>(url, body, {
                headers: header,
            });
        }
    }

    put<T>(route: string[], body: unknown, queryParameters = new Map<string, unknown>(), contentType?: string): Observable<T> {
        let url = this.baseUrl + this.path;

        url += this._buildRouteFromStringArray(route) + this._buildQueryParameters(queryParameters);

        if (contentType === undefined) {
            return this.httpClient.put<T>(url, body);
        } else {
            const header = this.createContentTypeHeader(contentType);

            return this.httpClient.put<T>(url, body, {
                headers: header,
            });
        }
    }

    delete<T>(pathSegments: string[], body?: unknown, queryParameters?: Map<string, unknown>): Observable<T> {
        const pathSegmentString = this._buildRouteFromStringArray(pathSegments);

        let queryParamString = '';

        if (queryParameters) {
            queryParamString = this._buildQueryParameters(queryParameters);
        }

        if (body) {
            const options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }),
                body
            };

            return this.httpClient.delete<T>(
                `${this.baseUrl}${this.path}${pathSegmentString}${queryParamString}`,
                options
            );
        } else {

            return this.httpClient.delete<T>(
                `${this.baseUrl}${this.path}${pathSegmentString}${queryParamString}`,
                this.httpOptions,
            );
        }
    }

    createContentTypeHeader(value: string): HttpHeaders {
        let header = new HttpHeaders();
        header = header.set('Content-Type', value);
        return header;
    }

    protected _buildQueryParameters(queryParameters: Map<string, unknown>): string {
        return queryParameters != null && queryParameters.size > 0
            ? `?${Array.from(queryParameters.keys())
                .map((key) => `${key}=${queryParameters.get(key) as string}`)
                .join('&')}`
            : '';
    }

    protected _buildRouteFromStringArray(route: string[]): string {
        if (route && route.length > 0) {
            return "/" + route.join('/');
        } else {
            return '';
        }
    }
}