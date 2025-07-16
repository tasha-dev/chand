// Codes by mahdi tasha
// Importing part
import axios from 'axios';

// Defining my api key
const API_KEY = 'cur_live_ddDM2i8PBOqaPviHehOyywmOV4TFMC5bHu6tT8g2';

// Creating axios instance
const currencyApi = axios.create({
  baseURL: 'https://api.currencyapi.com/v3/latest',
  params: {
    apikey: API_KEY,
  },
});

// Exportint the instanc
export default currencyApi;
