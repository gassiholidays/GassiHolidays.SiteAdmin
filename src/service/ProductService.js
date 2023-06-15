import axios from 'axios';

export default class ProductService {
    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then((res) => res.data.data);
    }

    getProducts() {
        //return axios.get('assets/demo/data/products.json').then((res) => res.data.data);
        return axios.get('https://localhost:7158/tours/items').then((res) => res.data);
    }

    getProductsMixed() {
        return axios.get('assets/demo/data/products-mixed.json').then((res) => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then((res) => res.data.data);
    }
}
