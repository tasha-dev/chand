// Codes by mahdi tasha
// Creating and exporting types of returned data of api
export interface currencyRateType {
  code: string;
  name: string;
  price: number;
  icon: string;
  en: string;
}

export interface exchangeRatesResponseType {
  date: string;
  currencies: currencyRateType[];
}
