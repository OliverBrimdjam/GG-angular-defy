import { Invoice } from './invoice';
export interface ConsumerUnitWithInvoice {
  id: number;
  endereco: string;
  distribuidora: string;
  nome: string;
  numero: string;
  faturas: Invoice[];
}
