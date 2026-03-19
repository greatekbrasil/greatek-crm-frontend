import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LeadCard from '../../components/LeadCard/LeadCard';
import { useNavigate } from 'react-router-dom';
import { getLeads } from '../../api/leads';
import { normalizeLead } from '../../utils/normalization';

function DashboardDiretoria() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState({
    totalLeads: 0,
    conversionRate: '0%',
    averageTicket: 'R$ 0',
    performance: [],
    todasOportunidades: []
  });
  const [loadingLeads, setLoadingLeads] = useState(true);

  const handleVendedorClick = (vendedorName) => {
    const id = vendedorName.toLowerCase().replace(/\s+/g, '_');
    navigate(`/diretoria/vendedor/${id}`);
  };

  useEffect(() => {
    let intervalId;

    const fetchAllLeads = async () => {
      try {
        console.log('Diretoria: Puxando todos os leads do servidor...');
        const allLeads = await getLeads();
        const normalizedLeads = Array.isArray(allLeads) ? allLeads.map(normalizeLead) : [];

        // Cálculo de Performance Real por Vendedor
        const vendors = ['Rodrigo Santos', 'Lucas Santos', 'Lucas Teixeira', 'Paula Rosa', 'Carlos Silva', 'Vitória Abreu', 'Rafael Morais'];
        const performance = vendors.map((name, idx) => {
          const leadCount = normalizedLeads.filter(l => 
            l.instancia_vendedor?.toLowerCase().includes(name.toLowerCase().split(' ')[0])
          ).length;
          
          return {
            id: idx + 1,
            nome: name,
            leads: leadCount,
            won: 0, // Ganhos reais precisariam de um status 'Fechado' no banco
            region: 'Não definida',
            status: leadCount > 5 ? 'Ativo' : 'Iniciando'
          };
        });

        setData({
          totalLeads: normalizedLeads.length,
          conversionRate: 'Aguardando dados...',
          averageTicket: 'R$ ---',
          performance: performance,
          todasOportunidades: normalizedLeads
        });
      } catch (err) {
        console.error('Falha na API da Diretoria:', err);
      } finally {
        setLoadingLeads(false);
      }
    };

    fetchAllLeads();
    intervalId = setInterval(fetchAllLeads, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary.main" fontWeight={700}>
          Dashboard da Diretoria
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visão panorâmica consolidada por IA Gemini das operações de vendas ativas.
        </Typography>
      </Box>

      {/* Panorama Geral do Time (Executivo) */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 4, 
        backgroundColor: 'greatek.darkBlue', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(8, 53, 97, 0.2)'
      }}>
        <Box sx={{ position: 'absolute', top: -20, right: -20, width: 150, height: 150, borderRadius: '50%', background: 'rgba(0, 129, 204, 0.1)', filter: 'blur(40px)' }} />
        
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Status Geral do Time Comercial</Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="h6" color="secondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
               Resumo Estratégico do Time
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
              Aguardando volume de conversas suficiente para análise macro da diretoria. 
              O sistema está monitorando {data.totalLeads} leads em tempo real.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography variant="subtitle2" sx={{ opacity: 0.7, mb: 1, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>Insights Estratégicos (Aguardando IA)</Typography>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.6' }}>
                <li>Análise de tendências de mercado baseada em leads recentes.</li>
                <li>Identificação de gaps de atendimento por região.</li>
                <li>Mapeamento de produtos com maior tração semanal.</li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* KPIs Gerais */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 4, 
            boxShadow: 3, 
            textAlign: 'center', 
            backgroundColor: 'greatek.darkBlue', 
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Typography variant="h6" fontWeight="700" color="white" sx={{ mb: 1 }}>Leads Ativos (Global)</Typography>
            <Typography variant="h2" fontWeight="800" color="white" sx={{ mt: 1 }}>{data.totalLeads}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'white' }}>VOLUME TOTAL EM CURADORIA IA</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 4, 
            boxShadow: 3, 
            textAlign: 'center', 
            backgroundColor: 'success.main', 
            color: 'white' 
          }}>
            <Typography variant="h6" fontWeight="700" color="white" sx={{ mb: 1 }}>Taxa de Conversão</Typography>
            <Typography variant="h2" fontWeight="800" color="white" sx={{ mt: 1 }}>---</Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'white' }}>MÉDIA DE FECHAMENTO DIRETO</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 4, 
            boxShadow: 3, 
            textAlign: 'center', 
            backgroundColor: 'white', 
            border: '2px solid #0081cc',
            color: '#083561' 
          }}>
            <Typography variant="h6" fontWeight="400" sx={{ opacity: 0.8 }}>Ticket Médio (Estimado)</Typography>
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1 }}>R$ ---</Typography>
            <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>PROJEÇÃO DE FATURAMENTO IA</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Lista de Vendedores */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>Performance da Equipe em Tempo Real</Typography>
        <Divider sx={{ mb: 2 }} />
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Vendedor</strong></TableCell>
                <TableCell><strong>Região</strong></TableCell>
                <TableCell align="center"><strong>Leads Tratados</strong></TableCell>
                <TableCell align="center"><strong>Ganhos</strong></TableCell>
                <TableCell align="center"><strong>Status IA</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.performance.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Button 
                      onClick={() => handleVendedorClick(row.nome)}
                      sx={{ textTransform: 'none', fontWeight: 600, color: 'primary.main', p: 0 }}
                    >
                      {row.nome}
                    </Button>
                  </TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell align="center">{row.leads}</TableCell>
                  <TableCell align="center" sx={{ color: 'success.main', fontWeight: 'bold' }}>{row.won}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.status} 
                      color={row.status === 'Excelente' || row.status === 'Excepcional' ? 'success' : 'primary'} 
                      size="small" 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Visão Macro dos Leads Atuais */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>Monitoramento de Oportunidades em Tempo Real</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Visão integral dos leads de todos os vendedores, classificados pela IA do Gemini.
        </Typography>

        <Grid container spacing={3}>
          {data.todasOportunidades.map(lead => (
            <Grid item xs={12} md={6} lg={4} key={lead.id}>
              <LeadCard lead={lead} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default DashboardDiretoria;
