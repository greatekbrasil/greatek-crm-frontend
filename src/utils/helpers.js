// utils/helpers.js

// Lista de estados por região/vendedor com base nas regras fornecidas
export const vendorRegions = {
  'Vitoria Abreu': ['TODOS'], // Regra SkyWatch
  'Carlos Silva': ['AC','AP','AM','PA','RO','RR','TO','DF','GO','MT','MS'], // Norte e CO
  'Paula Rosa': ['AL','BA','CE','MA','PB','PE','PI','RN','SE'], // Nordeste
  'Lucas Teixeira': ['PR','RS','SC'], // Sul
  'Rodrigo Santos': ['RJ','SP','ES'], // Sudeste 1
  'Lucas Santos': ['MG'], // Sudeste 2 (Round Robin)
  'Rafael Morais': ['MG'], // Sudeste 2 (Round Robin)
};

export function getVendorStates(vendorName) {
  return vendorRegions[vendorName] || [];
}

export function formatDDD(telefone) {
  const digits = String(telefone || '').replace(/\D/g, '');
  if (digits.length >= 13 && digits.startsWith('55')) return digits.substring(2, 4);
  if (digits.length >= 11) return digits.substring(0, 2);
  if (digits.length >= 2) return digits.substring(0, 2);
  return '';
}
