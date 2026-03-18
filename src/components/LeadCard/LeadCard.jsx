import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Divider, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function LeadCard({ lead }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/vendedor/lead/${lead.id}`);
  };

  const getUrgencyChip = (urgencia = 'baixa') => {
    if (urgencia.toLowerCase() === 'alta') {
      return (
        <Chip
          label="URGENTE"
          color="error"
          size="small"
          sx={{ backgroundColor: theme.palette.error.main, color: theme.palette.white, fontWeight: 700 }}
        />
      );
    }
    return null;
  };

  const isHighProbability = lead.probabilidade === true;

  return (
    <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
            {lead.nome_empresa || lead.nome_lead || 'Empresa não informada'}
          </Typography>
          {getUrgencyChip(lead.urgencia)}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
          <PhoneIcon sx={{ fontSize: 16, mr: 1, color: theme.palette.text.secondary }} />
          <Typography variant="body2" color="text.secondary">
            +{lead.telefone || 'Sem telefone'}
          </Typography>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={isHighProbability ? "Promissor" : "Baixa Chance"}
            color={isHighProbability ? 'success' : 'default'}
            icon={isHighProbability ? <CheckCircleOutlineIcon fontSize="small"/> : <ErrorOutlineIcon fontSize="small"/>}
            sx={{ fontWeight: 700, mr: 1 }}
          />
          
          <IconButton onClick={handleViewDetails} color="primary" aria-label="Ver detalhes">
            <VisibilityIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ mt: 1.5, color: theme.palette.text.primary, fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          "{lead.resumo || 'Nenhum resumo disponível.'}"
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LeadCard;
