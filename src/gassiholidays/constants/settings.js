function getApiUrl() {
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
        ?  "https://localhost:7277"
        : "https://gassiholidays.gr");
}

export const BASE_API_URL = getApiUrl();




