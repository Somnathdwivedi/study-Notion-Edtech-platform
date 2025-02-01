import axios from "axios";

export const axiosInstance = axios.create({
    BASE_URL: "http://localhost:4000/api/v1"
});

const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}


export default apiConnector;