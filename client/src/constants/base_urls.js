// eslint-disable-next-line no-undef
export const BASE_API = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://frast.herokuapp.com";
// export const BASE_API =  "https://easylife123.herokuapp.com";

export const FETCH_ALL_USERS = `${BASE_API}/info/get_all_prices`;
