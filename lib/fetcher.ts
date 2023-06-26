import axios from 'axios';

const fetcher = (url: string) => {
    console.log(url);
    return axios.get(url).then(res => res.data)
};

export default fetcher;