import axios from 'axios';

export default class BookingService {
    getBookings() {
        //return axios.get('assets/demo/data/products.json').then((res) => res.data.data);
        return axios.get('https://localhost:7158/booking').then((res) => res.data);
    }
}
