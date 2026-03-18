import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Divider, Button, Card, CardContent, Chip, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getLeads } from '../../api/leads';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LeadCard from '../../components/LeadCard/LeadCard';

export default function SalespersonReportPage() {
  const { vendedorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [vendedorData, setVendedorData] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Simular busca de dados consolidados do vendedor (No Real seria endpoint de Relatorio)
        const allLeads = await getLeads();
        
        // Dados Contextuais por Vendedor
        const regionsMap = {
          rodrigo_santos: { region: 'Sudeste (RJ, SP, ES)', focus: 'grandes contas de infraestrutura' },
          carlos_silva: { region: 'Norte e Centro-Oeste', focus: 'expansão de rede em áreas rurais' },
          vitoria_abreu: { region: 'Nacional (SkyWatch)', focus: 'segurança inteligente em condomínios' },
          lucas_teixeira: { region: 'Sul', focus: 'provedores de fibra de alta densidade' },
          lucas_santos: { region: 'Minas Gerais', focus: 'ISPs de pequeno/médio porte' },
          rafael_morais: { region: 'Minas Gerais', focus: 'treinamento e prospecção local' },
          paula_rosa: { region: 'Nordeste', focus: 'projetos governamentais e ISPs costeiros' }
        };

        const context = regionsMap[vendedorId] || { region: 'Brasíl', focus: 'vendas gerais' };
        const filteredLeads = allLeads.filter(l => 
          l.instancia_vendedor?.toLowerCase().includes(vendedorId.toLowerCase()) || 
          vendedorId === 'rodrigo_santos'
        ).slice(0, 5);

        setVendedorData({
          name: vendedorId.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          email: `${vendedorId.replace('_', '.')}@greatek.com.br`,
          region: context.region,
          leads: filteredLeads,
          executiveSummary: `O vendedor tem mantido uma cadência constante na região ${context.region}. O time de monitoramento notou um aumento de 15% na conversão para ${context.focus}. É fundamental manter o foco em fechamentos estratégicos no estado de atuação principal.`,
          tamPanorama: `Mercado de ${context.region} em expansão de 8% ao mês para soluções Greatek. Potencial de 25 novos leads qualificados identificados especificamente para ${context.focus}.`,
          competitiveMap: `Nossa margem em ${context.region} está competitiva, mas concorrentes locais estão oferecendo faturamento direto em 24h, o que tem sido a maior barreira em ${context.focus}.`,
          topInsights: [
            `Clientes em ${context.region} preferem atendimento consultivo sobre suporte técnico.`,
            `O custo-benefício da Greatek é o principal driver de decisão em ${context.region}.`,
            "Aumento de buscas por soluções Wi-Fi 6 em toda a carteira.",
            "Follow-ups feitos em menos de 2h convertem 70% mais.",
            "Leads vindos do Instagram estão menos qualificados que Google Ads."
          ],
          recommendations: `Reforçar o estoque de roteadores voltados para ${context.focus} e intensificar o follow-up nos leads de ${context.region}.`,
          kpis: {
            conversao: '42%',
            leadsTratados: 124,
            ticketMedio: 'R$ 12.500'
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [vendedorId]);

  if (loading) return <LoadingSpinner message="Consolidando Relatório Executivo com IA..." />;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/diretoria/dashboard')}
        sx={{ mb: 3 }}
      >
        Voltar ao Dashboard Geral
      </Button>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} color="primary.main">
            Relatório Executivo: {vendedorData?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Insights Estratégicos e Ciclo de Inteligência por IA Gemini
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
           <Chip label="Dados Trimestrais" color="secondary" size="small" sx={{ mb: 1, fontWeight: 'bold' }} />
        </Box>
      </Box>

      {/* KPIs Rápidos do Vendedor (Cores do Screenshot) */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', backgroundColor: 'greatek.darkBlue', color: 'white', boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="400" sx={{ opacity: 0.8 }}>Leads Ativos</Typography>
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1 }}>{vendedorData?.kpis.leadsTratados}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>VOLUME TOTAL EM CURADORIA IA</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', backgroundColor: 'success.main', color: 'white', boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="400" sx={{ opacity: 0.8 }}>Taxa de Conversão</Typography>
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1 }}>{vendedorData?.kpis.conversao}</Typography>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>MÉDIA DE FECHAMENTO DIRETO</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', backgroundColor: 'white', border: '2px solid #0081cc', boxShadow: 3, color: '#083561' }}>
            <Typography variant="h6" fontWeight="400" sx={{ opacity: 0.8 }}>Ticket Médio (Estimado)</Typography>
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1 }}>{vendedorData?.kpis.ticketMedio}</Typography>
            <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 'bold', letterSpacing: 1 }}>PROJEÇÃO DE FATURAMENTO IA</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Relatório Executivo (Full Width) */}
      <Paper sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 4, 
        backgroundColor: 'greatek.darkBlue', 
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(8, 53, 97, 0.2)'
      }}>
        <Typography variant="h5" fontWeight={700} mb={4} sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 1 }}>
          Relatório Executivo Estratégico
        </Typography>
        
        <Box sx={{ mb: 4 }}>
           <Typography variant="h6" color="secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
             Resumo Estratégico do Analista (IA)
           </Typography>
           <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.8, fontSize: '1.1rem' }}>
             {vendedorData?.executiveSummary}
           </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ opacity: 0.5, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5 }}>Panorama TAM</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>{vendedorData?.tamPanorama}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ opacity: 0.5, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5 }}>Mapa Competitivo</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>{vendedorData?.competitiveMap}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ opacity: 0.5, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5 }}>Maiores Insights</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>{vendedorData?.topInsights[0]}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ opacity: 0.5, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1.5 }}>Recomendações</Typography>
            <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>{vendedorData?.recommendations}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Ciclo de Atualização - Full Width Bento Grid */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={700} mb={3} color="primary">Ciclo de Inteligência e Atualização Contínua</Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
          gap: 2 
        }}>
          {/* Main Card (2x2 on desktop) */}
          <Paper sx={{ 
            gridColumn: { sm: 'span 2', md: 'span 2' }, 
            gridRow: { md: 'span 2' }, 
            p: 4, 
            borderRadius: 4, 
            background: 'linear-gradient(135deg, #f8faff 0%, #e0e8f0 100%)', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            border: '1px solid rgba(0,129,204,0.1)',
            minHeight: 250
          }}>
             <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>Motor Greatek IA</Typography>
             <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
               O ecossistema Greatek processa milhares de interações diariamente. 
               Cada mensagem via Evolution API é convertida em metadados estratégicos, 
               alimentando o dashboard da diretoria com insights acionáveis e análise de sentimento em tempo real.
             </Typography>
          </Paper>

          {/* Bento Steps (1x1 each) */}
          <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: 'white', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" fontWeight="bold" color="secondary">Coleta</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.85rem' }}>Webhook 24/7 integrado à Evolution API.</Typography>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: 'white', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" fontWeight="bold" color="secondary">Análise</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.85rem' }}>Triagem Gemini Pro: Dores e Intenção.</Typography>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: 'white', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" fontWeight="bold" color="secondary">Gestão</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.85rem' }}>Enriquecimento regional e TAM dinâmico.</Typography>
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 4, backgroundColor: 'white', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" fontWeight="bold" color="secondary">Ação</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.85rem' }}>Priorização automática de pipeline comercial.</Typography>
          </Paper>

          {/* Status Bar (Full width) */}
          <Paper sx={{ 
            gridColumn: '1 / -1', 
            p: 2, 
            borderRadius: 3, 
            backgroundColor: 'secondary.main', 
            color: 'white', 
            textAlign: 'center', 
            boxShadow: 2,
            mt: 1
          }}>
             <Typography variant="subtitle2" fontWeight="bold" sx={{ letterSpacing: 2 }}>SISTEMA DE ANÁLISE OPERANTE ● SINCRONISMO XML/API OK</Typography>
          </Paper>
        </Box>
      </Box>

      {/* Tabela de Principais Clientes / Leads */}
      <Typography variant="h5" fontWeight={700} mb={3} color="primary">Top Leads deste Vendedor</Typography>
      <Grid container spacing={3}>
        {vendedorData?.leads.map(lead => (
          <Grid item xs={12} md={6} lg={4} key={lead.id}>
            <LeadCard lead={lead} />
          </Grid>
        ))}
        {vendedorData?.leads.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary">Nenhum lead processado para este vendedor nas últimas 24h.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
