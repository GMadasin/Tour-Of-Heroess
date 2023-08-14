import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractService } from './abstract-service';

export class TestService extends AbstractService {
 path = '/user';

postImage(formData: FormData): Observable<any> {
    const url = `${this.baseUrl}${this.path}/upload-image`;

    const options = {
        headers: new HttpHeaders({
            'Content-Type': `multipart/form-data; boundary='my-boundary'`,
        }),
    };

    return this.httpClient.post(url, formData, options);
}
}