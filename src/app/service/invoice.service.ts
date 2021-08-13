import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host } from './shared';
import { Invoice } from '../models/invoice';
import { InvoiceResponse } from '../models/invoice-response';
import { InvoiceCommand } from '../models/invoice-command';

@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  basePath: string = '/fatura'
  url: string = host + this.basePath;

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<any>(
      this.url
    );
  }

  show(id: number) {
    return this.httpClient.get<any>(
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
    return this.httpClient.delete<any>(
      this.url + '/' + id
    );
  }
}
