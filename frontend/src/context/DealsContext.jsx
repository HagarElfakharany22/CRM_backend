import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import api from "./baseURL.jsx";


export const DealsContext = createContext();


const DealsProvider = ({ children }) => {
    const { user } = useContext(AuthContext);

    function getAuthHeader() {
        const user = JSON.parse(localStorage.getItem("user"));

        const token = localStorage.getItem("token");

        if (!token) return {};

        const role = user?.role;
        const authType = role === "admin" ? "admin" : "Bearer";

        return {
            Authorization: `${authType} ${token}`,
        };
    }

    function getAuthData() {
        const token = localStorage.getItem("token");

        if (!token || !user) return null;
        const role = user.role || "user";
        const auth = role === "admin" ? "admin" : "Bearer";
        return { token, auth };
    }

    async function getAllDeals(search) {

        let response = await api.get(`/api/v1/deal/all`, {
            headers: getAuthHeader(),
            params: { search },
        });
        console.log('get all Deals');

        console.log(response.data);


        return response.data;
    }

    async function getDealsByUserId(search) {

        let response = await api.get(`/api/v1/deal/by-user-id`, {
            headers: getAuthHeader(),
            params: { search },
        });
        console.log('get Deals By User Id');

        console.log(response.data);


        return response.data;
    }
    async function deleteDeals(id) {
        let response = await api.delete(`/api/v1/deal/delete/${id}`, {
            headers: getAuthHeader()
        });
        console.log(response?.data);

        return response?.data
    }
    async function updateDeals(id, data) {
        console.log(data);

        let response = await api.put(`/api/v1/deal/update/${id}`, data, {
            headers: getAuthHeader()
        });
        console.log(response?.data);

        return response?.data
    }
    async function createDeals(data) {
        let response = await api.post('/api/v1/deal/create', data, {
            headers: getAuthHeader()
        })
        console.log(response);
        return response.data;
    }
    return (
        <DealsContext.Provider
            value={{
                getAllDeals,
                getDealsByUserId,
                user,
                deleteDeals,
                updateDeals,
                createDeals
            }}
        >
            {children}
        </DealsContext.Provider>
    );
};

export default DealsProvider;
