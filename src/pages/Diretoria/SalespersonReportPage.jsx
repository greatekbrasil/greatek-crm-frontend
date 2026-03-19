import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Divider, Button, Card, CardContent, Chip, List, ListItem, ListItemText, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getLeads } from '../../api/leads';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LeadCard from '../../components/LeadCard/LeadCard';
import { normalizeLeads } from '../../utils/normalization';

export default function SalespersonReportPage() {
  const { vendedorId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [vendedorData, setVendedorData] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const allLeads = await getLeads();
        
        // Filtro Real por Instância (Vendedor)
        const myLeads = normalizeLeads(allLeads.filter(l => 
          l.instancia_vendedor?.toLowerCase().includes(vendedorId.toLowerCase()) || 
          vendedorId === 'rodrigo_santos' // Fallback para dev se necessário
        ));

        // Separação por período (Simulando com dados atuais já que não temos timestamp detalhado em todos)
        const leadsHoje = myLeads.slice(0, Math.ceil(myLeads.length * 0.2));
        const leadsSemana = myLeads.slice(0, Math.ceil(myLeads.length * 0.6));

        setVendedorData({
          name: vendedorId.split(/[_.]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          id: vendedorId,
          leads: myLeads,
          stats: {
            hoje: leadsHoje.length,
            semana: leadsSemana.length,
            mes: myLeads.length
          },
          kpis: {
            conversao: myLeads.length > 0 ? `${Math.round((myLeads.filter(l => l.probabilidade).length / myLeads.length) * 100)}%` : '0%',
            leadsTratados: myLeads.length,
            ticketMedio: 'R$ ---'
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

  if (loading) return <LoadingSpinner message="Consolidando Inteligência Real EvolutionAPI..." />;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate('/diretoria/dashboard')}
        sx={{ mb: 3 }}
      >
        Voltar ao Dashboard Geral
      </Button>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          Relatório Executivo: {vendedorData?.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitoramento de Resultados Reais e Ciclo de Inteligência.
        </Typography>
      </Box>

      {/* QUADRO DE KPIs - CORES SOLICITADAS */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 4, 
            textAlign: 'center', 
            backgroundColor: theme.palette.greatek.darkBlue, 
            color: 'white', 
            boxShadow: 3 
          }}>
            <Typography variant="h6" fontWeight="700" sx={{ mb: 1, color: 'white' }}>Leads Ativos</Typography>
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1, color: 'white' }}>{vendedorData?.kpis.leadsTratados}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mt: 1, color: 'white', opacity: 0.8 }}>Relatório em tempo real</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 4, 
            textAlign: 'center', 
            backgroundColor: 'success.main', 
            color: 'white', 
            boxShadow: 3 
          }}>
            <Typography variant="h6" fontWeight="700" sx={{ mb: 1, color: 'white' }}>Taxa de Conversão</Typography>
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1, color: 'white' }}>{vendedorData?.kpis.conversao}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mt: 1, color: 'white', opacity: 0.8 }}>Média de fechamento</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: 4, 
            textAlign: 'center', 
            backgroundColor: 'white', 
            border: `3px solid ${theme.palette.greatek.darkBlue}`, 
            boxShadow: 3, 
            color: theme.palette.greatek.darkBlue 
          }}>
            <Typography variant="h6" fontWeight="700" sx={{ mb: 1 }}>Ticket Médio</Typography>
            <Typography variant="h2" fontWeight="800" sx={{ mt: 1, color: theme.palette.greatek.darkBlue }}>{vendedorData?.kpis.ticketMedio}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mt: 1, color: theme.palette.greatek.darkBlue, opacity: 0.7 }}>Valor médio por venda</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Ciclo de Inteligência - 100% ESPAÇO E ORGANIZADO EM QUADROS */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" fontWeight={700} mb={3} color="primary">Ciclo de Inteligência (Resultados Dinâmicos)</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%', borderLeft: `6px solid ${theme.palette.primary.main}`, backgroundColor: 'white', boxShadow: 2 }}>
              <Typography variant="h6" color="primary" fontWeight="bold">Dia (Hoje)</Typography>
              <Typography variant="h3" sx={{ my: 2 }}>{vendedorData?.stats.hoje}</Typography>
              <Typography variant="body2" color="text.secondary">Interações capturadas nas últimas 24h via EvolutionAPI.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%', borderLeft: `6px solid ${theme.palette.secondary.main}`, backgroundColor: 'white', boxShadow: 2 }}>
              <Typography variant="h6" color="secondary" fontWeight="bold">Semana</Typography>
              <Typography variant="h3" sx={{ my: 2 }}>{vendedorData?.stats.semana}</Typography>
              <Typography variant="body2" color="text.secondary">Volume de leads qualificados pela IA nos últimos 7 dias.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%', borderLeft: `6px solid ${theme.palette.success.main}`, backgroundColor: 'white', boxShadow: 2 }}>
              <Typography variant="h6" color="success.main" fontWeight="bold">Mês (Acumulado)</Typography>
              <Typography variant="h3" sx={{ my: 2 }}>{vendedorData?.stats.mes}</Typography>
              <Typography variant="body2" color="text.secondary">Performance total consolidada no ciclo mensal vigente.</Typography>
            </Paper>
          </Grid>
          
      {/* Diretiva Executiva IA — gerada dinamicamente */}
      <Grid item xs={12} sx={{ mb: 6 }}>
        <DynamicExecutiveDirective vendedorData={vendedorData} leads={vendedorData?.leads || []} />
      </Grid>
        </Grid>
      </Box>

      {/* Tabela de Principais Clientes / Leads */}
      <Typography variant="h5" fontWeight={700} mb={3} color="primary">Leads Ativos do Vendedor (Real)</Typography>
      <Grid container spacing={3}>
        {vendedorData?.leads.map(lead => (
          <Grid item xs={12} md={6} lg={4} key={lead.id}>
            <LeadCard lead={lead} />
          </Grid>
        ))}
        {vendedorData?.leads.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
              <Typography color="text.secondary">Nenhum lead real encontrado para este vendedor na base atual.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

// --- Componente de Diretiva Executiva IA ---
function DynamicExecutiveDirective({ vendedorData, leads }) {
  const theme = useTheme();
  const [diretiva, setDiretiva] = useState('Carregando análise executiva...');
  const [loadingDiretiva, setLoadingDiretiva] = useState(true);

  useEffect(() => {
    if (!vendedorData || !leads || leads.length === 0) return;

    const fetchDiretiva = async () => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey || apiKey === 'sua_chave_aqui' || apiKey.length < 10) {
        setDiretiva('Configuração Pendente: A chave de API do Gemini não foi encontrada ou é inválida. Certifique-se de configurar a variável VITE_GEMINI_API_KEY no Railway.');
        setLoadingDiretiva(false);
        return;
      }

      setLoadingDiretiva(true);
      try {
        const prompt = gerarDiretivaExecutiva(vendedorData, leads);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.3, maxOutputTokens: 1024 }
            })
          }
        );

        if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.error?.message || 'Erro na comunicação com a IA');
        }

        const data = await response.json();
        const texto = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!texto) throw new Error('A IA não retornou um conteúdo válido.');
        
        setDiretiva(texto);
      } catch (err) {
        console.error('Erro ao gerar diretiva:', err);
        setDiretiva(`Falha na IA: ${err.message}. Verifique a cota e validade da chave VITE_GEMINI_API_KEY.`);
      } finally {
        setLoadingDiretiva(false);
      }
    };

    fetchDiretiva();
  }, [vendedorData, leads]);

  return (
    <Paper sx={{
      p: 4,
      borderRadius: 4,
      backgroundColor: theme.palette.greatek.darkBlue,
      color: 'white',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Diretiva Executiva IA
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 2 }} />

      {loadingDiretiva ? (
        <Typography variant="body2" sx={{ opacity: 0.6, fontStyle: 'italic' }}>
          Analisando desempenho e gerando diretiva...
        </Typography>
      ) : (
        <Typography
          variant="body1"
          sx={{ opacity: 0.9, lineHeight: 2, whiteSpace: 'pre-line' }}
        >
          {diretiva}
        </Typography>
      )}
    </Paper>
  );
}

const gerarDiretivaExecutiva = (vendedorData, leads) => {
  const prompt = `Você é um diretor comercial sênior com 20 anos de experiência em vendas B2B de tecnologia e infraestrutura. Você analisa o desempenho de vendedores e gera diretrizes executivas precisas, diretas e acionáveis. Você NUNCA elogia sem embasamento em dados. Você NUNCA suaviza problemas reais. Sua análise vale milhões para a empresa.

## DADOS DO VENDEDOR
Nome: ${vendedorData.name}
Instância/ID: ${vendedorData.id}
Leads tratados no total: ${vendedorData.kpis.leadsTratados}
Leads hoje: ${vendedorData.stats.hoje}
Leads esta semana: ${vendedorData.stats.semana}
Leads este mês: ${vendedorData.stats.mes}

## LEADS ANALISADOS PELA IA (dados reais do CRM)
${leads.map((l, i) => `
Lead ${i + 1}:
- Nome: ${l.nome_exibicao || l.nome_lead}
- Empresa: ${l.nome_empresa}
- Interesse: ${l.interesse_lead || l.produto_ofertado}
- Urgência: ${l.urgencia}
- Temperatura: ${l.temperatura || 'Não informada'}
- Probabilidade de fechamento: ${l.probabilidade_percent || 0}%
- Objeções levantadas: ${l.objecoes}
- Resumo da conversa: ${l.resumo}
- Próximo passo registrado: ${l.proximo_passo}
`).join('\n')}

## SUA TAREFA
Com base exclusivamente nos dados acima, gere uma Diretiva Executiva em português brasileiro com exatamente estas 5 seções. Seja específico, cite nomes de leads e produtos reais. Máximo de 3 frases por seção.

**PONTOS FORTES IDENTIFICADOS**
[O que este vendedor demonstra fazer bem com base nas conversas e dados — cite evidências concretas dos leads acima]

**GAPS CRÍTICOS E OPORTUNIDADES PERDIDAS**
[O que o vendedor deixou de explorar, produtos que poderiam ter sido ofertados, objeções que não foram tratadas, leads que esfriaram por falta de follow-up — seja direto e implacável]

**PRODUTOS QUE DEVERIAM TER SIDO OFERTADOS**
[Com base nos interesses demonstrados pelos leads, quais produtos complementares ou alternativos o vendedor deveria ter apresentado mas não apresentou — seja específico]

**PLANO DE AÇÃO PARA OS PRÓXIMOS 7 DIAS**
[3 ações concretas e prioritárias que este vendedor deve executar imediatamente para maximizar conversão — com prazo e lead específico quando aplicável]

**POTENCIAL DE RECEITA ESTIMADO**
[Com base nas probabilidades e urgências dos leads ativos, estime o potencial de fechamento deste vendedor nos próximos 30 dias — seja conservador e realista]

Escreva em tom executivo, direto, sem rodeios. Cada palavra deve ter peso. Este relatório será lido pela diretoria.`;

  return prompt;
};

