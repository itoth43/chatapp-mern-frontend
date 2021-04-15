import axios from "axios";

const instance = axios.create({
    baseURL: "https://chatapp-mern-backend.herokuapp.com/"
});

export default instance;