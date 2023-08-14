function getApiUrl() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'https://localhost:7028' : 'http://localhost:8085';
}

export const BASE_API_URL = getApiUrl();
