import axios from 'axios';
import { BASE_API_URL } from '../gassiholidays/constants/settings';

const headers = {
    'accept': 'application/json, text/plain, */*',
    'content-Type': 'application/json;charset=UTF-8'
}

export default class TourService {



    getTopDestinations() {
        return axios.get(`${BASE_API_URL}/api/tours/destinations/top`).then((res) => res.data);
    }

    saveDestinationTop(item) {
        axios({
            method: item.id === 0 ? 'post' : 'put',
            url: `${BASE_API_URL}/api/tours/destinations/top`,
            headers: {},
            data: item
        });
    }

    getDestinations(activeOnly = false) {
        var url = '/api/tours/destinations?activeOnly=' + (activeOnly ? 'true' : 'false');
        return axios.get(`${BASE_API_URL}${url}`).then((res) => res.data);
    }

    saveDestination(item) {
        axios({
            method: item.id === 0 ? 'post' : 'put',
            url: `${BASE_API_URL}/api/tours/destinations`,
            headers: {},
            data: item
        });
    }

    getHolidays(activeOnly = false) {
        var url = '/api/tours/holidays?activeOnly=' + (activeOnly ? 'true' : 'false');
        return axios.get(`${BASE_API_URL}${url}`).then((res) => res.data);
    }

    // saveHolidays(item) {
    //     var url = `${BASE_API_URL}/api/tours/holidays`;
    //     axios.(url, item, {
    //         headers: headers
    //     })
    // .then((response) => {
    //     dispatch({
    //         type: FOUND_USER,
    //         data: response.data[0]
    //     })
    // })
    // .catch((error) => {
    //     dispatch({
    //         type: ERROR_FINDING_USER
    //     })
    // })
    //}
    saveHolidays(item) {
        axios({
            method: item.id === 0 ? 'post' : 'put',
            url: `${BASE_API_URL}/api/tours/holidays`,
            headers: headers,
            data: item
        }).then((response) => {
            return 'Ok';
        }).catch((error) => {
            return error;
        });
    }

    getTransports(activeOnly = false) {
        var url = '/api/tours/transports?activeOnly=' + (activeOnly ? 'true' : 'false');
        return axios.get(`${BASE_API_URL}${url}`).then((res) => res.data);
    }

    saveTransports(item) {
        axios({
            method: item.id === 0 ? 'post' : 'put',
            url: `${BASE_API_URL}/api/tours/transports`,
            headers: {},
            data: item
        });
    }

    getAttributes(activeOnly = false) {
        var url = '/api/tours/attributes?activeOnly=' + (activeOnly ? 'true' : 'false');
        return axios.get(`${BASE_API_URL}${url}`).then((res) => res.data);
    }

    saveAttributes(item) {
        axios({
            method: item.id === 0 ? 'post' : 'put',
            url: `${BASE_API_URL}/api/tours/attributes`,
            headers: {},
            data: item
        });
    }

    getFacilities(activeOnly = false, notEmpty = false) {
        var url = '/api/tours/facilities?activeOnly=' + (activeOnly ? 'true' : 'false');
        url = url + (notEmpty ? '&notEmpty=true' : '&notEmpty=false')
        return axios.get(`${BASE_API_URL}${url}`).then((res) => res.data);
    }

    saveFacilities(item) {
        axios({
            method: item.id === 0 ? 'post' : 'put',
            url: `${BASE_API_URL}/api/tours/facilities`,
            headers: {},
            data: item
        });
    }


    getTours() {
        return axios.get(`${BASE_API_URL}/api/tours`).then((res) => res.data);
    }

    getSlideTours(isAvailable) {
        return axios.get(`${BASE_API_URL}/api/tours/slide/${isAvailable}`).then((res) => res.data);
    }

    saveMainSlideTours(item)
    {
        axios({
            method: 'post',
            url: `${BASE_API_URL}/api/tours/slide`,
            headers: headers,
            data: item
        });
    }

    removeSlideTours(items)
    {
        var commaSeparatedItems = items[0];
        axios({
            method: 'delete',
            url: `${BASE_API_URL}/api/tours/slide/${commaSeparatedItems}`,
            headers: headers
        }).then((response) => {
            console.log('success removing item');
            return 1;
        }).catch((error) => {
            console.log('error removing item')
            return 0;
        });
    }


    // getSlideTours(isAvailable) {
    //     return axios.get(`${BASE_API_URL}/api/tours/slide/${isAvailable}`).then((res) => res.data);
    // }

    // saveMainSlideTours(item) {
    //     axios({
    //         method: 'post',
    //         url: `${BASE_API_URL}/api/tours/slide`,
    //         data: item,
    //         headers: headers
    //     }).then((response) => {
    //         console.log('success removing item');
    //         return 1;
    //     }).catch((error) => {
    //         console.log('error removing item')
    //         return 0;
    //     });
    // }

    // removeSlideTours(items)
    // {
    //     var commaSeparatedItems = items[0];
    //     axios({
    //         method: 'delete',
    //         url: `${BASE_API_URL}/api/tours/slide/${commaSeparatedItems}`,
    //         headers: headers
    //     }).then((response) => {
    //         console.log('success removing item');
    //         return 1;
    //     }).catch((error) => {
    //         console.log('error removing item')
    //         return 0;
    //     });
    // }

    getImages() {
        return axios.get(`${BASE_API_URL}/api/images/tours`).then((res) => res.data);
    }

    saveTour(item) {
        axios({
            method: item.id === 0 ? 'post' : 'put',
            url: `${BASE_API_URL}/api/tours`,
            headers: {},
            data: item
        });
    }

    saveTourDescriptions(item) {
        axios({
            method: 'put',
            url: `${BASE_API_URL}/api/tour/descriptions`,
            headers: {},
            data: item
        });
    }

    getProgram(tourId) {
        var url = `/api/tours/program?tourId=${tourId}`;
        console.log(url);
        return axios.get(`${BASE_API_URL}${url}`).then((res) => res.data);
    }

    saveProgram(item) {
        axios({
            method: 'put',
            url: `${BASE_API_URL}/api/tours/program`,
            headers: {},
            data: item
        });
    }
}
