import axios from "axios";


const getRequest = (url, params) => {
    return axios.get(url, params).then(response => {
        return response.data;
    });
}


const postRequest = (url, params) => {
    return axios.post(url, params).then(response => {
        return response.data;
    });
}

export {getRequest, postRequest};
