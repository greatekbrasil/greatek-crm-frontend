import React from 'react';
import { Box, Typography, Grid, Paper, Avatar, Button, Chip, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';

const SALES_TEAM = [
  { id: 'rodrigo_santos', name: 'Rodrigo Santos', region: 'RJ, SP, ES', role: 'Vendedor Sênior', status: 'Ativo', leadsCurated: 156, activeLeads: 42 },
  { id: 'carlos_silva', name: 'Carlos Silva', region: 'Norte e CO', role: 'Vendedor', status: 'Ativo', leadsCurated: 98, activeLeads: 24 },
  { id: 'vitoria_abreu', name: 'Vitória Abreu', region: 'SkyWatch (Geral)', role: 'Especialista', status: 'Ativo', leadsCurated: 45, activeLeads: 12 },
  { id: 'lucas_teixeira', name: 'Lucas Teixeira', region: 'Sul', role: 'Vendedor', status: 'Ativo', leadsCurated: 112, activeLeads: 31 },
  { id: 'lucas_santos', name: 'Lucas Santos', region: 'MG', role: 'Vendedor', status: 'Ativo', leadsCurated: 88, activeLeads: 19 },
  { id: 'rafael_morais', name: 'Rafael Morais', region: 'MG', role: 'Vendedor', status: 'Em Treinamento', leadsCurated: 12, activeLeads: 5 },
  { id: 'paula_rosa', name: 'Paula Rosa', region: 'Nordeste', role: 'Vendedor', status: 'Ativo', leadsCurated: 134, activeLeads: 38 },
];

export default function VendedoresManagementPage() {
  const navigate = useNavigate();

  const handleViewReport = (id) => {
    navigate(`/diretoria/vendedor/${id}`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Gestão de Vendedores
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitoramento de acesso e performance individual da equipe comercial Greatek.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Table>
              <TableHead sx={{ backgroundColor: 'background.default' }}>
                <TableRow>
                  <TableCell><strong>Vendedor</strong></TableCell>
                  <TableCell><strong>Papel / Região</strong></TableCell>
                  <TableCell align="center"><strong>Status</strong></TableCell>
                  <TableCell align="center"><strong>Leads Totais</strong></TableCell>
                  <TableCell align="center"><strong>Leads Ativos</strong></TableCell>
                  <TableCell align="right"><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {SALES_TEAM.map((member) => (
                  <TableRow key={member.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>{member.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">{member.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{member.id}@greatek.com.br</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{member.role}</Typography>
                      <Typography variant="caption" color="secondary">{member.region}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={member.status} 
                        size="small" 
                        color={member.status === 'Ativo' ? 'success' : 'warning'} 
                        variant="outlined"
                      />
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
              <Typography variant="h4" color="primary" fontWeight="bold">7</Typography>
              <Typography variant="body2" color="text.secondary">Vendedores Logados</Typography>
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
              <Typography variant="h4" color="secondary" fontWeight="bold">15min</Typography>
              <Typography variant="body2" color="text.secondary">Tempo Médio de Resposta</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

