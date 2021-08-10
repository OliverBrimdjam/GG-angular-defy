import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient: HttpClient) { }

  getInvoices() {
    return this.httpClient.get<any>('http://localhost:3000/?????');
  }

  setInvoice() {

  }

  updateInvoice() {

  }

  deleteInvoice() {

  }
}
