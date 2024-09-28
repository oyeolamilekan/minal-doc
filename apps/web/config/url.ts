const PRODAPIURL = 'https://api.withapp.xyz/api/v1/';
const TESTAPIURL = 'http://localhost:3001/api/v1/'
export const BASE_URL = process.env.NODE_ENV === "production" ? PRODAPIURL : TESTAPIURL;