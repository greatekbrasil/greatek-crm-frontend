import axios from 'axios';

// Defina a URL base do seu backend no Railway.
// É uma boa prática usar variáveis de ambiente para isso.
// Ex: Se seu backend está em 'https://evolution-api-production-234a.up.railway.app'
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://greatek-crm-backend-production.up.railway.app/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Timeout de 15 segundos para as requisições
});

// --- Interceptor para Adicionar o Token de Autenticação ---
// Este interceptor será executado ANTES de cada requisição ser enviada.
axiosInstance.interceptors.request.use(
  (config) => {
    // Tenta pegar o token do localStorage
    const token = localStorage.getItem('accessToken');

    // Se o token existir, adiciona-o ao cabeçalho 'Authorization'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Lida com erros da requisição
    return Promise.reject(error);
  }
);

// --- Interceptor para Lidar com Respostas de Erro ---
// Este interceptor será executado APÓS cada resposta de erro.
axiosInstance.interceptors.response.use(
  (response) => {
    // Se a resposta for bem-sucedida, apenas a retorna
    return response;
  },
  (error) => {
    // Verifica se é um erro de autenticação (ex: 401 Unauthorized, 403 Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.error('Erro de autenticação ou acesso negado:', error.response.status);
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
