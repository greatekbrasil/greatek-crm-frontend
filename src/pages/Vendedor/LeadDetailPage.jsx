import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button, Divider, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCommentIcon from '@mui/icons-material/AddComment';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getLeads, updateLead } from '../../api/leads';
import { normalizeLead } from '../../utils/normalization';

function LeadDetailPage() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estados de Edição
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(null);

  // Estados do Modal de Nota
  const [openModal, setOpenModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  const fetchSingleLead = async () => {
    try {
      const allLeads = await getLeads();
      const found = allLeads.find(l => String(l.id) === String(leadId));

      if (found) {
        const normalized = normalizeLead(found);
        setLead(normalized);
        setEditedLead(normalized);
      } else {
        throw new Error("Lead não encontrado");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleLead();
  }, [leadId]);

  if (loading || !lead) return <LoadingSpinner message="Sincronizando Dados com EvolutionAPI..." />;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewNote('');
  };

  const handleSaveNote = () => {
    if (!newNote.trim()) return;
    const dateStr = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    setLead(prev => ({
      ...prev,
      historico_ia: [
        ...prev.historico_ia, 
        { data: dateStr, autor: 'Vendedor', nota: newNote }
      ]
    }));
    handleCloseModal();
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setEditedLead(lead); // Reset
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setEditedLead(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveLead = async () => {
    try {
      setLoading(true);
      await updateLead(leadId, editedLead);
      setLead(editedLead);
      setIsEditing(false);
    } catch (err) {
      alert('Erro ao salvar alterações no servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Voltar
        </Button>
        <Box>
          {isEditing ? (
            <>
              <Button startIcon={<CancelIcon />} onClick={handleToggleEdit} color="inherit" sx={{ mr: 1 }}>
                Cancelar
              </Button>
              <Button startIcon={<SaveIcon />} variant="contained" color="success" onClick={handleSaveLead}>
                Salvar Alterações
              </Button>
            </>
          ) : (
            <Button startIcon={<EditIcon />} variant="outlined" color="primary" onClick={handleToggleEdit}>
              Editar Informações
            </Button>
          )}
        </Box>
      </Box>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            {isEditing ? (
              <TextField 
                fullWidth 
                variant="standard" 
                label="Nome do Lead" 
                value={editedLead.nome_exibicao} 
                onChange={(e) => handleInputChange('nome_exibicao', e.target.value)}
                sx={{ mb: 1, '& .MuiInputBase-root': { fontSize: '2rem', fontWeight: 700 } }}
              />
            ) : (
              <Typography variant="h4" fontWeight={700} color="greatek.darkBlue">
                {lead.nome_exibicao}
              </Typography>
            )}
            <Typography variant="subtitle1" color="text.secondary">
              ID: #{lead.id} - Roteamento: {lead.instancia_vendedor}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {(() => {
              const u = lead.urgencia?.toLowerCase();
              if (u === 'alta') return <Chip color="error" label="URGÊNCIA ALTA" sx={{ fontWeight: 700 }} />;
              if (u === 'media' || u === 'média') return <Chip color="warning" label="URGÊNCIA MÉDIA" sx={{ fontWeight: 700 }} />;
              return <Chip label="URGÊNCIA BAIXA" sx={{ backgroundColor: '#0081cc', color: 'white', fontWeight: 700 }} />;
            })()}
            <Chip color={lead.probabilidade ? "success" : "default"} label={lead.probabilidade ? "Alta Chance" : "Baixa Chance"} sx={{ fontWeight: 700 }} />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          {/* Coluna Esquerda: Informações de Contato */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" color="primary" mb={2}>Detalhes de Contato</Typography>
            <Box sx={{ mb: 3, p: 2, backgroundColor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                {isEditing ? (
                  <>
                    <TextField 
                      fullWidth label="Telefone" value={editedLead.telefone} 
                      onChange={(e) => handleInputChange('telefone', e.target.value)} sx={{ mb: 2 }} 
                    />
                    <TextField 
                      fullWidth label="Email" value={editedLead.email} 
                      onChange={(e) => handleInputChange('email', e.target.value)} sx={{ mb: 2 }} 
                    />
                    <TextField 
                      fullWidth label="Origem" value={editedLead.origem} 
                      onChange={(e) => handleInputChange('origem', e.target.value)} 
                    />
                  </>
                ) : (
                  <>
                    <Typography mb={1}><strong>Telefone:</strong> +{lead.telefone}</Typography>
                    <Typography mb={1}><strong>Email:</strong> {lead.email}</Typography>
                    <Typography><strong>Origem Lead:</strong> {lead.origem}</Typography>
                  </>
                )}
            </Box>

            <Button 
               variant="contained" 
               color="secondary" 
               fullWidth 
               startIcon={<AddCommentIcon />}
               onClick={handleOpenModal}
               sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
            >
               Nova Observação
            </Button>
          </Grid>

          {/* Coluna Direita: Análise IA Gemini */}
          <Grid item xs={12} md={7}>
            <Box sx={{ backgroundColor: 'greatek.darkGrey', p: 3, borderRadius: 2, height: '100%' }}>
              <Typography variant="h6" color="secondary" mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                ✨ Inteligência do Vendedor & IA
              </Typography>
              
              <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 2, mb: 3 }}>
                <Typography variant="subtitle2" color="greatek.darkBlue" fontWeight="bold">Resumo & Contexto</Typography>
                {isEditing ? (
                  <TextField 
                    fullWidth multiline rows={3} value={editedLead.resumo} 
                    onChange={(e) => handleInputChange('resumo', e.target.value)} sx={{ mt: 1, mb: 2 }} 
                  />
                ) : (
                  <Typography variant="body2" fontStyle="italic" sx={{ mb: 2, mt: 1 }}>
                    "{lead.resumo}"
                  </Typography>
                )}

                <Typography variant="subtitle2" color="success.main" fontWeight="bold">Produto Ofertado</Typography>
                {isEditing ? (
                  <TextField 
                    fullWidth value={editedLead.produto_ofertado} 
                    onChange={(e) => handleInputChange('produto_ofertado', e.target.value)} sx={{ mt: 1, mb: 2 }} 
                  />
                ) : (
                  <Typography variant="body2" sx={{ mb: 2, mt: 1 }}>
                    {lead.produto_ofertado || 'Não identificado'}
                  </Typography>
                )}

                <Typography variant="subtitle2" color="error.main" fontWeight="bold">Objeções Ativas</Typography>
                {isEditing ? (
                  <TextField 
                    fullWidth value={editedLead.objecoes} 
                    onChange={(e) => handleInputChange('objecoes', e.target.value)} sx={{ mt: 1, mb: 2 }} 
                  />
                ) : (
                  <Typography variant="body2" sx={{ mb: 2, mt: 1 }}>
                    {lead.objecoes || 'Nenhuma objeção clara'}
                  </Typography>
                )}

                <Typography variant="subtitle2" color="warning.main" fontWeight="bold">Gaps de Qualificação</Typography>
                {isEditing ? (
                  <TextField 
                    fullWidth value={editedLead.gaps} 
                    onChange={(e) => handleInputChange('gaps', e.target.value)} sx={{ mt: 1 }} 
                  />
                ) : (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {lead.gaps || 'Devidamente qualificada'}
                  </Typography>
                )}
              </Box>

              <Typography variant="subtitle2" fontWeight="bold" mb={2} color="primary">Histórico de Atividade</Typography>
              <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                {lead.historico_ia.map((hist, index) => (
                  <Box component="li" key={index} sx={{ mb: 2, p: 2, backgroundColor: 'white', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" fontWeight="bold" color={hist.autor === 'Vendedor' ? 'secondary.main' : 'primary.main'}>@{hist.autor}</Typography>
                        <Typography variant="caption" color="text.secondary">{hist.data}</Typography>
                    </Box>
                    <Typography variant="body2">{hist.nota}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Modal para Adicionar Nota */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>Registrar Interação</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus margin="dense" label="Detalhes da atualização..." type="text"
            fullWidth multiline rows={4} variant="outlined" value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseModal} color="inherit">Cancelar</Button>
          <Button onClick={handleSaveNote} variant="contained" color="secondary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LeadDetailPage;
