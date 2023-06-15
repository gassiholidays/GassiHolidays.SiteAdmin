import axios from 'axios';
import { BASE_API_URL } from '../gassiholidays/constants/settings';

export default class ArticleService {
    async getArticles() {
        const res = await axios.get(`${BASE_API_URL}/api/articles`);
        return res.data;
    }

    saveArticle(item) {
        axios({
            method: item.id === 0 ? 'post' : 'put',
            url: `${BASE_API_URL}/api/article`,
            headers: {},
            data: item
        });
    }

    getImages() {
        return axios.get(`${BASE_API_URL}/api/images/backgrounds`).then((res) => res.data);
    }
}
