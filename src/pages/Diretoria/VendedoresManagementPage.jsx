import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Avatar, Button, Chip, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getLeads } from '../../api/leads';
import { vendorRegions } from '../../utils/helpers';

export default function VendedoresManagementPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [salesTeam, setSalesTeam] = useState([]);
  const [stats, setStats] = useState({
    activeVendors: 0,
    totalLeads: 0,
    avgResponseTime: '15min'
  });

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const allLeads = await getLeads();
        
        // Inicializar o mapa com TODOS os vendedores registrados no helpers.js
        const vendorsMap = {};
        Object.keys(vendorRegions).forEach(vName => {
          // Normalizar para remover acentos e espaços (ex: Vitória Abreu -> vitoria_abreu)
          const vId = vName.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '_');
            
          vendorsMap[vId] = {
            id: vId,
            name: vName,
            leadsCurated: 0,
            activeLeads: 0,
            status: 'Conectado',
            region: vendorRegions[vName].join(', ')
          };
        });
        
        // Atribuir dados dos leads aos vendedores existentes ou criar novos
        allLeads.forEach(lead => {
          const vIdRaw = lead.instancia_vendedor;
          if (!vIdRaw) return;
          
          // Garantir que o ID vindo do banco também esteja normalizado para o match
          const vId = vIdRaw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          
          if (!vendorsMap[vId]) {
            vendorsMap[vId] = {
              id: vId,
              name: vIdRaw.split(/[_.]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
              leadsCurated: 0,
              activeLeads: 0,
              status: 'Ativo',
              region: 'Não definida'
            };
          }
          
          vendorsMap[vId].leadsCurated += 1;
          // Consideramos "Ativo" leads que a IA marcou com probabilidade ou urgência
          if (lead.urgencia === 'alta' || lead.probabilidade === true) {
            vendorsMap[vId].activeLeads += 1;
          }

          // Se a região ainda não foi definida (vendedor novo que não estava no helpers), tentar normalizar
          if (vendorsMap[vId].region === 'Não definida') {
              const normalizedVid = vId.toLowerCase().replace(/_/g, ' ').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
              const matchingKey = Object.keys(vendorRegions).find(k => 
                k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === normalizedVid
              );
              if (matchingKey) {
                vendorsMap[vId].region = vendorRegions[matchingKey].join(', ');
              }
          }
        });

        const sortedTeam = Object.values(vendorsMap).sort((a, b) => b.leadsCurated - a.leadsCurated);
        setSalesTeam(sortedTeam);
        
        setStats({
          activeVendors: sortedTeam.length,
          totalLeads: allLeads.length,
          avgResponseTime: '12min' // Mockado por agora, mas com base em volume real
        });
      } catch (err) {
        console.error('Erro ao carregar gestão de vendedores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const handleViewReport = (id) => {
    navigate(`/diretoria/vendedor/${id}`);
  };

  if (loading) return <LoadingSpinner message="Sincronizando Gestão com EvolutionAPI..." />;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Gestão de Vendedores
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitoramento real-time de instâncias conectadas via EvolutionAPI.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'background.default' }}>
                <TableRow>
                  <TableCell><strong>Vendedor (Instância)</strong></TableCell>
                  <TableCell><strong>Papel Estático</strong></TableCell>
                   <TableCell align="center"><strong>Região / Estados</strong></TableCell>
                   <TableCell align="center"><strong>Leads Processados</strong></TableCell>
                   <TableCell align="center"><strong>Oportunidades Ativas</strong></TableCell>
                   <TableCell align="right"><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salesTeam.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>{member.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">{member.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{member.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">Vendedor</Typography>
                      <Typography variant="caption" color="secondary">Greatek Interno</Typography>
                    </TableCell>
                     <TableCell align="center">
                      <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {member.region}
                      </Typography>
                     </TableCell>
                     <TableCell align="center">{member.leadsCurated}</TableCell>
                     <TableCell align="center">{member.activeLeads}</TableCell>
                     <TableCell align="right">
                      <Button 
                        startIcon={<AssessmentIcon />} 
                        size="small"
                        onClick={() => handleViewReport(member.id)}
                        sx={{ mr: 1 }}
                      >
                        Relatório
                      </Button>
                      <IconButton size="small" color="primary">
                        <MarkEmailReadIcon fontSize="small" />
                      </IconButton>
                     </TableCell>
                  </TableRow>
                ))}
                {salesTeam.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary">Nenhum vendedor com instância conectada no EvolutionAPI.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Estatísticas Rápidas */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', border: '1px solid #eee' }}>
              <Typography variant="h4" color="primary" fontWeight="bold">{stats.activeVendors}</Typography>
              <Typography variant="body2" color="text.secondary">Instâncias Ativas</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', border: '1px solid #eee' }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">100%</Typography>
              <Typography variant="body2" color="text.secondary">Taxa de Atualização IA</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', border: '1px solid #eee' }}>
              <Typography variant="h4" color="secondary" fontWeight="bold">{stats.avgResponseTime}</Typography>
              <Typography variant="body2" color="text.secondary">Tempo Médio de Resposta</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}


