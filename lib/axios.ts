// Codes by mahdi tasha
// Importing part
import axios from 'axios';

// Creating axios instance
const currencyApi = axios.create({
  baseURL: `https://raw.githubusercontent.com/CertMusashi/Chande-api/refs/heads/main/arz.json?${new Date().getTime()}`,
});

// Exportint the instanc
export default currencyApi;
