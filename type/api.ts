// Codes by mahdi tasha
// Creating and exporting types of returned data of api
export interface currencyRateType {
  code: string;
  value: number;
}

export interface exchangeRatesResponseType {
  data: Record<string, currencyRateType>;
  meta: {
    last_updated_at: string;
  };
}
