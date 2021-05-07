
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private http: HttpClient) { }

    api = environment.apiUrl;


    getOrders() {
        return this.http.get(this.api + '/orders');
    }


    getPayments() {
        return this.http.get(this.api + '/payments');
    }


    getPrices() {
        return this.http.get(this.api + '/prices');
    }

}

