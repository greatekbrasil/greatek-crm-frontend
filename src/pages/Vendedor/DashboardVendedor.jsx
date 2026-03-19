import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import AnimatedGlobe from '../../components/BrazilMap/AnimatedGlobe';
import LeadCard from '../../components/LeadCard/LeadCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getVendorStates } from '../../utils/helpers';
import { getLeads } from '../../api/leads';
import { normalizeLead } from '../../utils/normalization';

// Função para normalizar textos para comparação (Ignora acentos, espaços e underscores)
const normalizeText = (value = '') =>
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

  useEffect(() => {
    let intervalId;

    const fetchRealLeads = async () => {
      try {
        console.log('Fetching live leads for:', user?.name);
        const allLeads = await getLeads();
        console.log('Total leads from API:', allLeads.length);
        
        const myLeads = allLeads.filter(l => {
          if (!l.instancia_vendedor) return false;
          
          const inst = normalizeText(l.instancia_vendedor);
          const name = normalizeText(user?.name || '');
          const emailPrefix = normalizeText(user?.email?.split('@')[0] || '');
          
          const match = inst.includes(name) || inst.includes(emailPrefix) || name.includes(inst) || inst === 'teste';
          
          if (!match) {
            console.log(`Lead ${l.nome_lead} filtered out. Instance: ${inst}, User: ${name}/${emailPrefix}`);
          }
          
          return match;
        });

        // Normalização Oficial Greatek V3
        const normalizedLeads = myLeads.map(normalizeLead);
        setLeads(normalizedLeads);
      } catch (err) {
        console.error('Erro ao buscar leads da API:', err);
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRealLeads();
    intervalId = setInterval(fetchRealLeads, 10000);

    return () => clearInterval(intervalId);
  }, [user]);

  if (loading) return <LoadingSpinner message="Sincronizando Leads (N8N)..." />;

  const myStates = getVendorStates(user?.name);
  
  // Cálculo de KPIs Reais (Baseado na Normalização V3)
  const totalLeads = leads.length;
  const emNegociacao = leads.filter(l => l.probabilidade_percent > 50).length;
  const conversaoEstimada = totalLeads > 0 ? Math.round((emNegociacao / totalLeads) * 100) : 0;

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary.main" fontWeight={700}>
          Meu Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bem-vindo de volta, <strong>{user?.name}</strong>. Acompanhe seus leads processados pela inteligência artificial.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Painel Esquerdo: KPIs e Mapa */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">Resumo Diário</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Leads Recebidos</Typography>
              <Typography fontWeight="bold">{totalLeads}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Alta Probabilidade</Typography>
              <Typography fontWeight="bold" color="secondary.main">{emNegociacao}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary">Potencial de Conversão</Typography>
              <Typography fontWeight="bold" color="success.main">{conversaoEstimada}%</Typography>
            </Box>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AnimatedGlobe highlightStates={myStates} />
          </Paper>
        </Grid>

        {/* Painel Direito: Lista de Leads */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2, backgroundColor: 'background.default' }} elevation={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" color="primary" fontWeight={700}>Meus Leads Ativos</Typography>
              <Typography variant="caption" sx={{ backgroundColor: 'greatek.darkBlue', color: 'white', py: 0.5, px: 2, borderRadius: 4 }}>
                Sincronizado via N8N ao vivo
              </Typography>
            </Box>

            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}

            {leads.length === 0 && (
              <Typography textAlign="center" color="text.secondary" sx={{ py: 4 }}>
                Nenhum lead novo recebido no momento.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardVendedor;
