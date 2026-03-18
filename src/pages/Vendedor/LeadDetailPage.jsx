import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button, Divider, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCommentIcon from '@mui/icons-material/AddComment';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getLeads } from '../../api/leads';

function LeadDetailPage() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  
  // Estados do Modal
  const [openModal, setOpenModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchSingleLead = async () => {
      try {
        console.log(`Puxando dados detalhados do Lead ${leadId} do servidor...`);
        const allLeads = await getLeads();
        const found = allLeads.find(l => String(l.id) === String(leadId));

        if (found) {
          setLead({
            ...found,
            historico_ia: found.historico_ia || [] // O banco novo ainda não tem histórico salvo, prevenindo crash
          });
        } else {
          throw new Error("Lead não encontrado na API real");
        }
      } catch (err) {
        console.error("Usando mock para LeadDetail pois a API falhou:", err);
        // Mock fallback seguro
        setLead({
          id: leadId,
          nome_empresa: 'Tech Solutions SA',
          telefone: '11999999999',
          email: 'contato@techsolutions.com',
          origem: 'Campanha Meta Ads - B2B',
          urgencia: 'alta',
          probabilidade: true,
          instancia_vendedor: 'rodrigo_santos',
          resumo: 'O cliente entrou em contato buscando fornecedor com pronta entrega de cabos e roteadores. Orçamento já aprovado pela diretoria.',
          produto_ofertado: 'Lote de 500 Roteadores e Cabos de Fibra',
          objecoes: 'O cliente demonstrou receio com o prazo de entrega longo da transportadora para a região Norte.',
          gaps: 'Vendedor esqueceu de oferecer garantia estendida e não qualificou bem a faixa de budget para os roteadores.',
          historico_ia: [
            { data: '2026-03-17 10:00', autor: 'IA Gemini', nota: 'A IA identificou um padrão de urgência pelo uso das palavras "imediatamente" e "orçamento aprovado".' },
            { data: '2026-03-17 10:05', autor: 'Sistema', nota: 'Sugerida mensagem de WhatsApp do tipo: "Olá, vi que vocês têm urgência nos cabos. Consigo despachar hoje..."' }
          ]
        });
      }
    };

    fetchSingleLead();
  }, [leadId]);

  if (!lead) return <LoadingSpinner message="Decodificando análise da IA Gemini..." />;

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewNote('');
  };

  const handleSaveNote = () => {
    if (!newNote.trim()) return;
    
    // Na vida real, você faria um POST para sua API Node.js aqui
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

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 1 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Voltar para o Dashboard
      </Button>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} color="greatek.darkBlue">
              {lead.nome_empresa}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              ID: #{lead.id} - Roteamento: {lead.instancia_vendedor}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip color="error" label={`Urgência: ${lead.urgencia?.toUpperCase()}`} />
            <Chip color={lead.probabilidade ? "success" : "default"} label={lead.probabilidade ? "Alta Chance de Fechar" : "Baixa Probabilidade"} />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          {/* Coluna Esquerda: Informações de Contato */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" color="primary" mb={2}>Detalhes de Contato</Typography>
            <Box sx={{ mb: 3, p: 2, backgroundColor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography mb={1}><strong>Telefone:</strong> +{lead.telefone}</Typography>
                <Typography mb={1}><strong>Email:</strong> {lead.email}</Typography>
                <Typography><strong>Origem Lead:</strong> {lead.origem}</Typography>
            </Box>

            <Button 
               variant="contained" 
               color="secondary" 
               fullWidth 
               startIcon={<AddCommentIcon />}
               onClick={handleOpenModal}
               sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
            >
               Acrescentar Atualização / Ligação
            </Button>
          </Grid>

          {/* Coluna Direita: Análise IA Gemini */}
          <Grid item xs={12} md={7}>
            <Box sx={{ backgroundColor: 'greatek.darkGrey', p: 3, borderRadius: 2, height: '100%' }}>
              <Typography variant="h6" color="secondary" mb={1} sx={{ display: 'flex', alignItems: 'center' }}>
                ✨ Análise Tática da Inteligência Artificial
              </Typography>
              
              <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 2, mb: 3 }}>
                <Typography variant="subtitle2" color="greatek.darkBlue" fontWeight="bold">Resumo da Conversa</Typography>
                <Typography variant="body2" fontStyle="italic" sx={{ mb: 2 }}>
                  "{lead.resumo}"
                </Typography>

                <Typography variant="subtitle2" color="success.main" fontWeight="bold">Produto Ofertado/Procurado</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {lead.produto_ofertado || 'Não identificado'}
                </Typography>

                <Typography variant="subtitle2" color="error.main" fontWeight="bold">Objeções Levantadas</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {lead.objecoes || 'Nenhuma objeção clara identificada'}
                </Typography>

                <Typography variant="subtitle2" color="warning.main" fontWeight="bold">Gaps (O que faltou perguntar)</Typography>
                <Typography variant="body2">
                  {lead.gaps || 'Conversa devidamente qualificada'}
                </Typography>
              </Box>

              <Typography variant="subtitle2" fontWeight="bold" mb={2} color="primary">Trilha de Conversa & Atividades</Typography>
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
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Descreva o que foi conversado na ligação, envio de proposta ou reunião.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Detalhes da atualização..."
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseModal} color="inherit">Cancelar</Button>
          <Button onClick={handleSaveNote} variant="contained" color="secondary">
            Salvar no Histórico
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LeadDetailPage;
