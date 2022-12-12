// let url = 'http://127.0.0.1:8000/v1';
let url = "http://localhost:9000/api/";

if (process.env.NODE_ENV === "production") {
  url = "http://localhost:9000/api/";
}

export const BASE_URL = url;

// export const NODE_BASE_URL = "https://dev-api.sejongplatformblog.com/v1/";
