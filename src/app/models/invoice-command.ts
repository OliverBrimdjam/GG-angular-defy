export interface InvoiceCommand {
  id: number;
  data_de_vencimento: string;
  consumo: number;
  valor: number;
  unidadeConsumidoraId: number;
}
