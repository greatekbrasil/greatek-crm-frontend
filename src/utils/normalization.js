/**
 * Data Normalization Utility - V3 Official (Robust Version)
 * Maps backend Postgres fields (N8N v3) to frontend component expectations.
 */

export const normalizeLead = (lead) => {
  if (!lead) return null;

  // Sanitização de strings para evitar "null", "undefined" ou "Não identificado"
  const isEmpty = (val) => !val || val === 'null' || val === 'undefined' || val === 'Não identificado' || val === 'Pessoa Física' || val === 'Lead sem nome';
  
  const s = (val, fallback = '') => isEmpty(val) ? fallback : val;

  // Lógica de Título: Prioriza Nome Real, depois Empresa, depois o fallback
  const finalTitle = !isEmpty(lead.nome_lead) 
    ? lead.nome_lead 
    : (!isEmpty(lead.nome_empresa) ? lead.nome_empresa : 'Lead WhatsApp');

  return {
    ...lead,
    id: lead.id,
    
    // Nomes (Usar a nova lógica de título)
    nome_exibicao: finalTitle,
    nome_lead: s(lead.nome_lead, 'Não identificado'),
    nome_empresa: s(lead.nome_empresa, 'Pessoa Física'),
    
    // Contato
    telefone: s(lead.telefone, 'Não informado'),
    email: s(lead.email, 'Não informado'),
    origem: s(lead.origem, 'WhatsApp'),
    
    // Análise IA
    urgencia: s(lead.urgencia, 'Média'),
    temperatura: s(lead.temperatura_lead, 'Morno'),
    
    // Probabilidade (0-100 para Boolean e Número)
    probabilidade: (parseInt(lead.probabilidade) || 0) > 50,
    probabilidade_percent: parseInt(lead.probabilidade) || 0,
    
    // Textos Longos
    resumo: s(lead.resumo_ia, 'Sem resumo disponível.'),
    produto_solicitado: s(lead.produto_solicitado, 'Não especificado'),
    produto_ofertado: s(lead.interesse_lead, 'Não identificado'),
    objecoes: s(lead.objecoes, 'Nenhuma identificada'),
    proximo_passo: s(lead.proximo_passo, 'Aguardando ação do vendedor'),
    
    // Metadados
    instancia_vendedor: s(lead.instancia_vendedor, 'Indefinido'),
    
    // Histórico
    historico_ia: Array.isArray(lead.historico_ia) ? lead.historico_ia : []
  };
};

export const normalizeLeads = (leads) => {
  if (!Array.isArray(leads)) return [];
  return leads.map(normalizeLead);
};
