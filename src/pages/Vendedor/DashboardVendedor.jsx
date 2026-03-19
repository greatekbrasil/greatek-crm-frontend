import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Divider, Chip } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import AnimatedGlobe from '../../components/BrazilMap/AnimatedGlobe';
import LeadCard from '../../components/LeadCard/LeadCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getVendorStates } from '../../utils/helpers';
import { getLeads, deleteLead } from '../../api/leads';
import { normalizeLead } from '../../utils/normalization';

// Função para normalizar textos para comparação estrita
const normalizeStrict = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_\s]/g, '')
    .trim();

function DashboardVendedor() {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRealLeads = async () => {
    try {
      const allLeads = await getLeads();
      const userName = normalizeStrict(user?.name || '');
      const userPrefix = normalizeStrict(user?.email?.split('@')[0] || '');
      
      const myLeads = allLeads.filter(l => {
        if (!l.instancia_vendedor) return false;
        const inst = normalizeStrict(l.instancia_vendedor);
        // Filtro estrito: A instância deve conter o nome ou o prefixo do email do vendedor
        return inst.includes(userName) || inst.includes(userPrefix) || userName.includes(inst);
      });

      const normalizedLeads = myLeads.map(normalizeLead);
      setLeads(normalizedLeads);
    } catch (err) {
      console.error('Erro ao buscar leads da API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealLeads();
    const intervalId = setInterval(fetchRealLeads, 15000);
    return () => clearInterval(intervalId);
  }, [user]);

  const handleDeleteLead = async (id) => {
    try {
      await deleteLead(id);
      setLeads(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      alert('Erro ao excluir o lead. Tente novamente.');
    }
  };

  if (loading) return <LoadingSpinner message="Sincronizando Seus Leads Reais..." />;

  const myStates = getVendorStates(user?.name);
  const totalLeads = leads.length;
  const emNegociacao = leads.filter(l => l.probabilidade_percent > 50).length;
  const conversaoEstimada = totalLeads > 0 ? Math.round((emNegociacao / totalLeads) * 100) : 0;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary.main" fontWeight={700}>
          Meu Dashboard Comercial
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bem-vindo, <strong>{user?.name}</strong>. Gerencie seus leads ativos e performance regional.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Painel Esquerdo: Lista de Leads (Ocupa mais espaço agora) */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3, backgroundColor: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Typography variant="h5" color="primary" fontWeight={700}>Meus Leads Ativos</Typography>
              <Chip 
                label={`${totalLeads} Leads`} 
                color="primary" 
                variant="outlined" 
                sx={{ fontWeight: 'bold' }} 
              />
            </Box>

            <Box sx={{ maxHeight: '70vh', overflowY: 'auto', pr: 1 }}>
              {leads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} onDelete={handleDeleteLead} />
              ))}

              {leads.length === 0 && (
                <Box sx={{ py: 8, textAlign: 'center' }}>
                  <Typography variant="h6" color="text.secondary">Tudo em dia!</Typography>
                  <Typography color="text.secondary">Nenhum lead novo vinculado à sua instância no momento.</Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Painel Direito: KPIs e Globo (Sem quadro branco no globo) */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 4, 
            boxShadow: 3, 
            background: 'linear-gradient(135deg, #083561 0%, #0081cc 100%)',
            color: 'white'
          }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Resumo de Performance</Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ opacity: 0.9 }}>Total de Leads</Typography>
              <Typography variant="h6" fontWeight="bold">{totalLeads}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ opacity: 0.9 }}>Alta Probabilidade</Typography>
              <Typography variant="h6" fontWeight="bold">{emNegociacao}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ opacity: 0.9 }}>Conversão Estimada</Typography>
              <Typography variant="h6" fontWeight="bold" color="success.light">{conversaoEstimada}%</Typography>
            </Box>
          </Paper>

          {/* Globo sem fundo branco, diretamente no corpo ou container transparente */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2
          }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>
              Sua Área de Atuação (3D)
            </Typography>
            <AnimatedGlobe highlightStates={myStates} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              Foco Regional: {myStates.join(', ')}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardVendedor;
