import axiosInstance from './axiosInstance';

export const getLeads = async (filters = {}) => {
  try {
    const response = await axiosInstance.get('/leads', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    throw error;
  }
};

export const getLeadDetails = async (leadId) => {
  try {
    const response = await axiosInstance.get(`/leads/${leadId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do lead ${leadId}:`, error);
    throw error;
  }
};

export const getLeadConversationHistory = async (leadId) => {
  try {
    const response = await axiosInstance.get(`/leads/${leadId}/historico`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar histórico de conversa do lead ${leadId}:`, error);
    throw error;
  }
};

export const updateLead = async (leadId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/leads/${leadId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar lead ${leadId}:`, error);
    throw error;
  }
};

export const getDirectorDashboardData = async () => {
  try {
    const response = await axiosInstance.get('/reports/director');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard da diretoria:', error);
    throw error;
  }
};

export const getSalesmanDashboardData = async (salesmanId) => {
  try {
    const response = await axiosInstance.get(`/reports/salesman/${salesmanId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar dados do dashboard do vendedor ${salesmanId}:`, error);
    throw error;
  }
};
