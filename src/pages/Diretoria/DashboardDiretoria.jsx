import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LeadCard from '../../components/LeadCard/LeadCard';
import { useNavigate } from 'react-router-dom';
import { getLeads } from '../../api/leads';

// Fake Data para Diretoria
const mockDirectorData = {
  totalLeads: 312,
  conversionRate: '38%',
  averageTicket: 'R$ 18.200',
  performance: [
    { id: 1, nome: 'Lucas Santos', leads: 45, won: 12, region: 'MG', status: 'Excelente' },
    { id: 2, nome: 'Rodrigo Santos', leads: 78, won: 28, region: 'RJ, SP, ES', status: 'Excepcional' },
    { id: 3, nome: 'Lucas Teixeira', leads: 62, won: 18, region: 'Sul', status: 'Bom' },
    { id: 4, nome: 'Paula Rosa', leads: 54, won: 15, region: 'Nordeste', status: 'Bom' },
    { id: 5, nome: 'Carlos Silva', leads: 41, won: 11, region: 'Norte e CO', status: 'Bom' },
    { id: 6, nome: 'Vitória Abreu', leads: 15, won: 8, region: 'SkyWatch (Geral)', status: 'Excelente' },
    { id: 7, nome: 'Rafael Morais', leads: 17, won: 4, region: 'MG', status: 'Atenção' },
  ],
  todasOportunidades: [
    {
      id: 11,
      nome_empresa: 'Tech Group Nordeste',
      telefone: '81999999999',
      urgencia: 'alta',
      probabilidade: true,
      instancia_vendedor: 'paula_rosa',
      resumo: 'Lead com urgência para expansão de rede corporativa. Budget pré-aprovado pela matriz.'
    },
    {
      id: 12,
      nome_empresa: 'Varejo Bom Preço',
      telefone: '11888888888',
      urgencia: 'media',
      probabilidade: false,
      instancia_vendedor: 'lucas_santos',
      resumo: 'Interesse em rede Wi-Fi corporativa para 5 lojas. Estão avaliando orçamentos concorrentes.'
    },
    {
      id: 13,
      nome_empresa: 'Provedor Amazônia Link',
      telefone: '92977777777',
      urgencia: 'alta',
      probabilidade: true,
      instancia_vendedor: 'carlos_silva',
      resumo: 'Provedor busca lote de 500 roteadores OLT. Necessita de pronta entrega para novo loteamento.'
    },
    {
      id: 14,
      nome_empresa: 'Condomínio Sky Hub',
      telefone: '21966666666',
      urgencia: 'alta',
      probabilidade: true,
      instancia_vendedor: 'vitoria_abreu',
      resumo: 'Síndico altamente interessado no SkyWatch para substituir o CFTV antigo do condomínio luxo.'
    }
  ]
};

function DashboardDiretoria() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(mockDirectorData); // Começa com o Mock imediato para evitar crash
  const [loadingLeads, setLoadingLeads] = useState(true);

  const handleVendedorClick = (vendedorName) => {
    // Transforma "Rodrigo Santos" em "rodrigo_santos" para a URL
    const id = vendedorName.toLowerCase().replace(/\s+/g, '_');
    navigate(`/diretoria/vendedor/${id}`);
  };

  useEffect(() => {
    let intervalId;

    const fetchAllLeads = async () => {
      try {
        console.log('Diretoria: Puxando todos os leads do servidor...');
        const allLeads = await getLeads();

        setData(prev => ({
          ...prev, 
          totalLeads: Array.isArray(allLeads) ? allLeads.length : prev.totalLeads,
          todasOportunidades: Array.isArray(allLeads) ? allLeads : []
        }));
      } catch (err) {
        console.error('Falha na API da Diretoria. Usando Mock:', err);
      } finally {
        setLoadingLeads(false);
      }
    };

    fetchAllLeads();
    intervalId = setInterval(fetchAllLeads, 15000);

    return () => clearInterval(intervalId);
  }, []);

  // Removido o block de (!data) pois agora inicializamos com mock.
  // if (!data) return <LoadingSpinner message="Consolidando dados de todos os vendedores..." />;

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
              O time atingiu 82% da meta trimestral. Observamos um aumento significativo de interesse em soluções de SkyWatch no Sudeste, 
              porém com gaps de follow-up no segundo dia de contato. Recomenda-se reforçar o estoque de OLTs para suprir a demanda de Minas Gerais.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ p: 2, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Typography variant="subtitle2" sx={{ opacity: 0.7, mb: 1, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>Top 5 Insights Estratégicos (Semana)</Typography>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', lineHeight: '1.6' }}>
                <li>ISPs de pequeno porte estão migrando para Wi-Fi 6 em massa.</li>
                <li>Prazos de entrega acima de 48h estão causando 30% das perdas.</li>
                <li>Leads qualificados via WhatsApp têm ticket 15% superior.</li>
                <li>Região Nordeste apresenta maior gap de resposta média (+4h).</li>
                <li>Novos cabos de fibra Greatek reduziram objeção de preço em 12%.</li>
              </ul>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* KPIs Gerais (Refatorados para 100% de largura e maior destaque) */}
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
            <Typography variant="h6" fontWeight="400" sx={{ opacity: 0.8 }}>Leads Ativos (Global)</Typography>
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1 }}>{data.totalLeads}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>VOLUME TOTAL EM CURADORIA IA</Typography>
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
            <Typography variant="h6" fontWeight="400" sx={{ opacity: 0.8 }}>Taxa de Conversão</Typography>
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1 }}>{data.conversionRate}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>MÉDIA DE FECHAMENTO DIRETO</Typography>
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
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1 }}>{data.averageTicket}</Typography>
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
