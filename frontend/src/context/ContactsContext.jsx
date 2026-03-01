import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import api from "./baseURL.jsx";


export const ContactsContext = createContext();


const ContactsProvider = ({ children }) => {
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

    async function getContacts(search) {

        let response = await api.get(`/api/v1/contact/all`, {
            headers: getAuthHeader(),
            params: { search },
        });
        console.log('get all Contacts');

        console.log(response.data);


        return response.data;
    }

    async function getContactsByUserId(search) {

        let response = await api.get(`/api/v1/contact/by-user-id`, {
            headers: getAuthHeader(),
            params: { search },
        });
        console.log('get Contacts By User Id');

        console.log(response.data);


        return response.data;
    }
    async function deleteContacts(id) {
        let response = await api.delete(`/api/v1/contact/delete/${id}`, {
            headers: getAuthHeader()
        });
        console.log(response?.data);

        return response?.data
    }
    async function updateContacts(id, data) {
        console.log(data);

        let response = await api.put(`/api/v1/contact/update/${id}`, data, {
            headers: getAuthHeader()
        });
        console.log(response?.data);

        return response?.data
    }
    async function createContacts(data) {
        let response = await api.post('/api/v1/contact/create', data, {
            headers: getAuthHeader()
        })
        console.log(response);
        return response.data;
    }
    return (
        <ContactsContext.Provider
            value={{
                getContacts,
                getContactsByUserId,
                user,
                deleteContacts,
                updateContacts,
                createContacts
            }}
        >
            {children}
        </ContactsContext.Provider>
    );
};

export default ContactsProvider;
