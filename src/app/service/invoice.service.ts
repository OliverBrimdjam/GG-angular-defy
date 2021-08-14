import { InvoiceResponse } from './../models/invoice-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host } from './shared';
import { Invoice } from '../models/invoice';
import { InvoiceCommand } from '../models/invoice-command';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  basePath: string = '/fatura'
  url: string = host + this.basePath;

  constructor(private httpClient: HttpClient) { }

  list() {
    return from(this.httpClient.get<InvoiceResponse[]>(this.url));
  }

  show(id: number) {
    return this.httpClient.get<InvoiceResponse>(
      this.url + '/' + id
    );
  }

  create(Invoice: Invoice) {
    return this.httpClient.post<InvoiceResponse>(
      this.url,
      Invoice
    );
  }

  update(InvoiceCmd: InvoiceCommand) {
    return this.httpClient.put<InvoiceCommand>(
      this.url + '/' + InvoiceCmd.id,
      InvoiceCmd
    );
  }

  delete(id: number) {
    return this.httpClient.delete<InvoiceResponse>(
      this.url + '/' + id
    );
  }
}
