import axios from "axios";
import qs from 'qs';

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

const postRequestFromData = (url, data) => {

    console.log("data", qs.stringify(data));
    let options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams(data),
        url,
    };


    return axios(options).then(function (response) {
        return response;
    })
        .catch(function (response) {
            //handle error
            return response;
        });


}

export {getRequest, postRequest, postRequestFromData};
