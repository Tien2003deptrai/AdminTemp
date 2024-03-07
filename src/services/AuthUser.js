import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { sendToast } from "src/config/configToast";

export const AuthUser = () => {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = localStorage.getItem('access_token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = localStorage.getItem('user');
        const userDetail = JSON.parse(userString);
        return userDetail;
    }

    const getRole = () => {
        const roleString = localStorage.getItem('role');
        const userRole = JSON.parse(roleString);
        return userRole;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [role, setRole] = useState(getRole());

    const saveToken = (user, token, role) => {
        localStorage.setItem('access_token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', JSON.stringify(role));
        // localStorage.setItem('role', JSON.stringify('ROLE_ADMIN'));
        // localStorage.setItem('role', JSON.stringify('ROLE_MANAGER'));
        // localStorage.setItem('role', JSON.stringify('ROLE_USER'));

        setToken(token);
        setUser(user);
        setRole(role);

        console.log('role', role);
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
        sendToast('Logout successful!');
    }

    const http = axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
            "Content-Type": "application/json"
        }
    });

    http.interceptors.request.use(
        config => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    const login = async (email, password) => {
        try {
            const response = await http.post('/v1/auth/login', { email, password });
            const { accessToken, role } = response.data;
            saveToken(email, accessToken, role);
            navigate('/dashboard');
            sendToast('Login successful!');
        } catch (error) {
            console.error('Error logging in:', error.message);
            sendToastError('Failed to login.');
        }
    }

    return {
        setToken: saveToken,
        token,
        user,
        role,
        getToken,
        login,
        logout,
        http,
    }
}

