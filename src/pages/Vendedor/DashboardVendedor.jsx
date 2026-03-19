import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import AnimatedGlobe from '../../components/BrazilMap/AnimatedGlobe';
import LeadCard from '../../components/LeadCard/LeadCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getVendorStates } from '../../utils/helpers';
import { getLeads } from '../../api/leads';

// Fake Data plana baseada no Banco de Dados Postgres (Lead Analisado)
const mockLeadsData = [
  {
    id: 1,
    nome_empresa: 'Tech Solutions SA',
    telefone: '11999999999',
    urgencia: 'alta',
    probabilidade: true,
    instancia_vendedor: 'rodrigo_santos',
    resumo: 'Cliente precisa migrar infraestrutura urgentemente após falha no data center atual.'
  },
  {
    id: 2,
    nome_empresa: 'Varejo Bom Preço',
    telefone: '11888888888',
    urgencia: 'media',
    probabilidade: false,
    instancia_vendedor: 'lucas_santos',
    resumo: 'Interesse em rede Wi-Fi corporativa para 5 lojas. Estão avaliando orçamentos.'
  },
  {
    id: 3,
    nome_empresa: 'Provedor NetLink ISP',
    telefone: '11777777777',
    urgencia: 'baixa',
    probabilidade: false,
    instancia_vendedor: 'carlos_silva',
    resumo: 'Provedor busca novos roteadores, mas fechamento previsto só para o próximo semestre.'
  }
];

// Função para normalizar textos como:
// "Rodrigo Santos" -> "rodrigosantos"
// "rodrigo_santos" -> "rodrigosantos"
const normalizeText = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[_\s]/g, '')           // remove espaços e underscores
    .trim();

function DashboardVendedor() {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId;

    const fetchRealLeads = async () => {
      try {
        console.log('Fetching EXCLUSIVE real-time leads from Railway API...');
        const allLeads = await getLeads();

        const myLeads = allLeads.filter((l) => {
          if (!l.instancia_vendedor) return false;

          const inst = normalizeText(l.instancia_vendedor);
          const name = normalizeText(user?.name || '');
          const emailPrefix = normalizeText(user?.email?.split('@')[0] || '');

          return (
            (name && (inst.includes(name) || name.includes(inst))) ||
            (emailPrefix && inst.includes(emailPrefix)) ||
            inst === 'teste'
          );
        });

        setLeads(myLeads);
      } catch (err) {
        console.error('Erro na API real, puxando mock de fallback:', err);
        const fallbackLeads = mockLeadsData.map((l) => ({
          ...l,
          instancia_vendedor: user?.name
        }));
        setLeads(fallbackLeads);
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
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Resumo Diário
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Leads Recebidos</Typography>
              <Typography fontWeight="bold">12</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color="text.secondary">Em Negociação</Typography>
              <Typography fontWeight="bold" color="secondary.main">
                {leads.length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary">Conversão IA</Typography>
              <Typography fontWeight="bold" color="success.main">
                28%
              </Typography>
            </Box>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <AnimatedGlobe highlightStates={myStates} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: 2,
              backgroundColor: 'background.default'
            }}
            elevation={0}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" color="primary" fontWeight={700}>
                Meus Leads Ativos
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: 'greatek.darkBlue',
                  color: 'white',
                  py: 0.5,
                  px: 2,
                  borderRadius: 4
                }}
              >
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
