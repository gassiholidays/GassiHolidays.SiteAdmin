// third-party
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../app/store';
import { BASE_API_URL } from '../gassiholidays/constants/settings';
import axios from 'axios';

const initialState = {
    propertyCategories: [],
    countries: [],
    cities: [],
    areas: [],
    hotels: [],
    partners: [],
    hotelsWithPrices: [],
    bruttoCustomers: [],
    bruttoCountries: [],
    selectedBruttoCountry: null,
    bruttoTypes: [],
    selectedBruttoTypes: [],
    bruttoCategories: [],
    selectedBruttoCategories: [],
    bruttoCities: [],
    selectedBruttoCities: [],
    bruttoAreas: [],
    selectedBruttoAreas: [],
    bruttoHotels: [],
    selectedBruttoHotels: [],
    brutto1Hotels: [],
    brutto1Customers: []
};

const slice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        getPropertyCategoriesSuccess(state, action) {
            state.propertyCategories = action.payload;
        },

        getCountriesSuccess(state, action) {
            state.countries = action.payload;
        },

        getCitiesSuccess(state, action) {
            state.cities = action.payload;
        },

        getAreasSuccess(state, action) {
            state.areas = action.payload;
        },

        getHotelsSuccess(state, action) {
            state.hotels = action.payload;
        },

        getPartnersSuccess(state, action) {
            state.partners = action.payload;
        },
        getBruttoCustomersSuccess(state, action) {
            state.bruttoCustomers = action.payload;
        },

        getBrutto1CustomersSuccess(state, action) {
            state.brutto1Customers = action.payload;
        },

        getBrutto1HotelsSuccess(state, action) {
            state.brutto1Hotels = action.payload;
        },

        getHotelItemCountriesSuccess(state, action) {
            state.bruttoCountries = action.payload;
            // if (action.payload.length === 1) {
            //     state.selectedBruttoCountry = action.payload[0].key;
            // }
        },

        getHotelItemsSuccess(state, action) {
            state.bruttoCategories = action.payload.categories;
            state.bruttoTypes = action.payload.types;
            state.bruttoCities = action.payload.cities;
            state.bruttoAreas = action.payload.areas;
            state.bruttoHotels = action.payload.hotels;
        },

        getHotelItemTypesSuccess(state, action) {
            state.bruttoTypes = action.payload.types;
            state.bruttoCategories = action.payload.categories;
            state.bruttoCities = action.payload.cities;
            state.bruttoAreas = action.payload.areas;
            state.bruttoHotels = action.payload.hotels;
        },

        getHotelItemCategoriesSuccess(state, action) {
            state.bruttoCategories = action.payload.categories;
            state.bruttoCities = action.payload.cities;
            state.bruttoAreas = action.payload.areas;
            state.bruttoHotels = action.payload.hotels;
        },

        getHotelItemCitiesSuccess(state, action) {
            state.bruttoCities = action.payload.cities;
            state.bruttoAreas = action.payload.areas;
            state.bruttoHotels = action.payload.hotels;
        },

        getHotelItemAreasSuccess(state, action) {
            state.bruttoAreas = action.payload.areas;
            state.bruttoHotels = action.payload.hotels;
        },

        getHotelItemHotelsSuccess(state, action) {
            state.bruttoHotels = action.payload.hotels;
        }
    }
});

export default slice.reducer;

export function getPropertyCategories() {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotel/categories`);
            dispatch(slice.actions.getPropertyCategoriesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getCountries() {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/geography/countries`);
            console.log('get countries');
            dispatch(slice.actions.getCountriesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getCities(country) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/geography/cities?country=${country}`);
            dispatch(slice.actions.getCitiesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}
export function getAreas(cities) {
    return async () => {
        try {
            const response = await axios.post(`${BASE_API_URL}/api/geography/areas`, cities);
            dispatch(slice.actions.getAreasSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getHotels(cities, areas) {
    return async () => {
        try {
            if (!areas) {
                areas = [];
            }
            console.log('cities', cities);
            console.log('areas', areas);
            const response = await axios.post(`${BASE_API_URL}/api/geography/hotels`, { cities: cities, areas: areas });
            dispatch(slice.actions.getHotelsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getPrices(hotels, market) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotels/brutto/prices?hotels=${hotels}&marketId=${market}`);
            dispatch(slice.actions.getPricesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getBruttoCustomers() {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotels/prices/partners?hotels=-1`);
            dispatch(slice.actions.getBruttoCustomersSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getBrutto1Customers(hotels) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotels/prices/partners?hotels=${hotels}`);
            dispatch(slice.actions.getBrutto1CustomersSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getBrutto1Hotels() {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotels`);
            dispatch(slice.actions.getBrutto1HotelsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getHotelItemCountries(partnerId) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotel/countries?partnerId=${partnerId}`);
            console.log('response', response);
            dispatch(slice.actions.getHotelItemCountriesSuccess(response.data));
        } catch (error) {
            console.log('error', error);
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getHotelItemTypes(partnerId, countries, types, categories, cities, areas) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotel/items?partnerId=${partnerId}&country=${countries}&cities=${cities}&areas=${areas}&categories=${categories}&types=${types}`);
            dispatch(slice.actions.getHotelItemTypesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getHotelItemCategories(partnerId, countries, types, categories, cities, areas) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotel/items?partnerId=${partnerId}&country=${countries}&cities=${cities}&areas=${areas}&categories=${categories}&types=${types}`);
            dispatch(slice.actions.getHotelItemCategoriesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getHotelItemCities(partnerId, countries, types, categories, cities, areas) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotel/items?partnerId=${partnerId}&country=${countries}&cities=${cities}&areas=${areas}&categories=${categories}&types=${types}`);
            dispatch(slice.actions.getHotelItemCitiesSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getHotelItemAreas(partnerId, countries, types, categories, cities, areas) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotel/items?partnerId=${partnerId}&country=${countries}&cities=${cities}&areas=${areas}&categories=${categories}&types=${types}`);
            dispatch(slice.actions.getHotelItemAreasSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}

export function getHotelItemHotels(partnerId, countries, types, categories, cities, areas) {
    return async () => {
        try {
            const response = await axios.get(`${BASE_API_URL}/api/hotel/items?partnerId=${partnerId}&country=${countries}&cities=${cities}&areas=${areas}&categories=${categories}&types=${types}`);
            dispatch(slice.actions.getHotelItemHotelsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError({ success: false, message: error }));
        }
    };
}
