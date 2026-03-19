// Este arquivo atua como o "banco de dados" de conhecimento da aplicação.
// Contém os produtos, parceiros e informações institucionais da Greatek.

export const SPECIAL_PROJECTS_LINKS = [
  "https://www.greatek.com.br/projetos-especiais/switches-poe-tp-link/",
  "https://www.greatek.com.br/projetos-especiais/solucao-multi-gigabit/",
  "https://www.greatek.com.br/projetos-especiais/solucao-ppsk/",
  "https://www.greatek.com.br/projetos-especiais/wi-fi-7/",
  "https://www.greatek.com.br/projetos-especiais/wi-fi-de-alta-densidade/",
  "https://www.greatek.com.br/projetos-especiais/wi-fi-para-hoteis/",
  "https://www.greatek.com.br/projetos-especiais/escritorios-de-pequeno-e-medio-porte/",
  "https://www.greatek.com.br/projetos-especiais/restaurantes-e-lojas-de-pequeno-porte/",
  "https://www.greatek.com.br/projetos-especiais/unidades-multi-residenciais/"
];

export const PARTNER_COMPANIES = [
    { name: "TP-Link", url: "https://www.tp-link.com/br/", logoUrl: "https://logo.clearbit.com/tp-link.com", description: "Líder global em conectividade, oferecendo roteadores, switches, soluções Wi-Fi e produtos de casa inteligente.", type: "Master" },
    { name: "Omada", url: "https://www.omadanetworks.com/br/", logoUrl: "https://logo.clearbit.com/omadanetworks.com", description: "Marca independente da TP-Link focada em soluções de rede definidas por software (SDN) para ambientes de negócios (B2B), reconhecida no Quadrante Mágico do Gartner.", type: "Partner" },
    { name: "Tapo", url: "https://www.tapo.com/br/", logoUrl: "https://logo.clearbit.com/tapo.com", description: "Submarca da TP-Link para dispositivos de casa inteligente, como câmeras, plugues e iluminação.", type: "Partner" },
    { name: "Vigi", url: "https://www.vigi.com/br/", logoUrl: "https://logo.clearbit.com/vigi.com", description: "Submarca da TP-Link especializada em vigilância por vídeo profissional (câmeras e NVRs), totalmente integrada à plataforma Omada Central.", type: "Partner" },
    { name: "Mercusys", url: "https://www.mercusys.com.br/", logoUrl: "https://logo.clearbit.com/mercusys.com", description: "Submarca da TP-Link que oferece dispositivos de rede confiáveis e acessíveis.", type: "Partner" },
    { name: "Cabel Condutores Elétricos", url: "https://cabel.com.br/", logoUrl: "https://logo.clearbit.com/cabel.com.br", description: "Especialista em fios e cabos elétricos de alta qualidade para energia, telecomunicações e solar.", type: "Partner" },
    { name: "CG3 Telecom", url: "https://cg3telecom.com.br/", logoUrl: "https://logo.clearbit.com/cg3telecom.com.br", description: "Fabricante e fornecedor de uma linha completa de ferragens, pré-formados, produtos ópticos (Cabos Drop, CTOs, CEOs) e injetados plásticos para redes de telecomunicações e elétricas.", type: "Partner" },
    { name: "Lacerda Sistemas de Energia", url: "https://lacerdasistemas.com.br/", logoUrl: "https://logo.clearbit.com/lacerdasistemas.com.br", description: "Com 25 anos de mercado, é especialista em nobreaks corporativos (600 VA a 600 kVA), com assistência técnica própria e presença nacional. Oferece soluções de alta complexidade e criticidade em energia.", type: "Partner" },
    { name: "Volt", url: "https://volt.ind.br/", logoUrl: "https://logo.clearbit.com/volt.ind.br", description: "Empresa 100% brasileira, especialista em soluções de energia ininterrupta para telecom, incluindo fontes nobreak, inversores, controladores de carga solar, sistemas de monitoramento e racks.", type: "Partner" },
    { name: "XPS", url: "https://xps.com.br/", logoUrl: "https://logo.clearbit.com/xps.com.br", description: "Empresa 100% nacional, há mais de 33 anos entregando soluções de energia como Retificadores (homologados ANATEL), Inversores, Conversores e Quadros de Distribuição, com certificação ISO 9001.", type: "Partner" },
    { name: "Think Technology", url: "https://www.thinktechnology.com.br/", logoUrl: "https://logo.clearbit.com/thinktechnology.com.br", description: "Indústria brasileira no setor de telecomunicações, oferecendo soluções inovadoras para redes de fibra óptica, infraestrutura e equipamentos de alto desempenho.", type: "Partner" },
    { name: "Seccon", url: "", logoUrl: "https://greatek.com.br/logos/seccon.png", description: "Fornecedor de soluções para cabeamento estruturado, incluindo patch cords, patch panels, conectores e pigtails ópticos.", type: "Partner" },
    { name: "2Flex", url: "", logoUrl: "https://greatek.com.br/logos/2flex.png", description: "Fornecedor de cabos ópticos, como Drop e ASU, para redes de telecomunicações.", type: "Partner" },
];

export const KNOWLEDGE_BASE_PRODUCTS = [
  {
    name: "Máquina de Fusão Óptica X6 (MF30630X6)",
    keywords: ["máquina de fusão", "fusão óptica", "x6", "mf30630x6"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/maquina-de-fusao-x6/
- **Terminologia Correta:** Máquina de Fusão (NÃO fusionadora de fibra)
- **Sistema de alinhamento:** Por núcleo ou casca
- **Quantidade de motores:** 6 motores
- **Tempo de emenda (Fusão):** 8 segundos
- **Tempo de aquecimento:** Customizável
- **Tempo de inicialização:** 5 segundos
- **Tipos de Fibra (Aplicação):** Monomodo (SM), Multimodo (MM), DS, NZDS
- **Perda de fusão (típica):** 0.025dB (SM), 0.01dB (MM), 0.04dB (DS/NZDS)
- **Perda de retorno:** ≤ 60 dB
- **Bateria:** 7800mA, para aproximadamente 200 ciclos (fusão e aquecimento)
- **Eletrodos:** Vida útil de 3000 emendas
- **Visor:** LCD Colorido de 5,1 polegadas
- **Ampliação:** 300x
- **Características Especiais:**
    - **Bloqueio Inteligente:** Permite limitar o número de fusões ou o tempo de trabalho.
    - **App de Gerenciamento:** Aplicativo "MINHA MÁQUINA" para iOS e Android.
    - **Função Gestor:** Visualização remota do registro de fusões.
    - **Conectividade:** Bluetooth e Porta USB que pode carregar dispositivos.
    - **Armazenamento:** Ilimitado (nuvem).
    - **Resistência:** Proteção contra chuva, pó e quedas.
- **Peso (com maleta):** 6975g
- **Dimensões (com maleta):** 270x220x330mm`
  },
  {
    name: "Máquina de Fusão Óptica G-FUSION PRO (MFGFP3201)",
    keywords: ["máquina de fusão", "fusão óptica", "g-fusion pro", "gfusionpro", "mfgfp3201"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/maquina-de-fusao-gfusionpro/
- **Modelo:** MFGFP3201
- **Sistema de alinhamento:** Por núcleo, V-Groove ativo
- **Quantidade de motores:** 6 motores
- **Tempo de emenda:** 5 segundos
- **Tempo de aquecimento:** 11 segundos (pré-estabelecido)
- **Tipos de Fibra (Aplicação):** SM/MM/DS/NZDS
- **Perda de fusão:** 0.025dB (SM) / 0.01dB (MM)/ 0.04dB (DS/NZDS)
- **Perda de retorno:** ≤ 60 db
- **Bateria:** 7200mA (320 ciclos)
- **Eletrodos:** 5.000 emendas
- **Visor:** 4,3" em alta resolução com tela touch
- **Recursos Integrados:** Medidor de potência óptica e Localizador Visual de Falhas (VFL) de 15mW.
- **Armazenamento de dados:** 20.000 registros e 200 imagens
- **Peso da Máquina:** 1,750 Kg`
  },
  {
    name: "Máquina de Fusão Portátil 2 Eixos (MF2140X01)",
    keywords: ["máquina de fusão", "fusão portátil", "2 eixos", "mf2140x01"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/maquina-de-fusao-portatil-greatek/
- **Modelo:** MF2140X01
- **Sistema de alinhamento:** Pelo revestimento (V-Groove Fixo)
- **Quantidade de motores:** 2 motores
- **Tempo de emenda:** 7 segundos
- **Tempo de aquecimento:** 35 segundos (protetor 40mm)
- **Perda de fusão (típica):** 0.03dB (SM), 0.01dB (MM)
- **Bateria:** 3400mAh, para aproximadamente 60 ciclos
- **Visor:** LCD Colorido de 2,8 polegadas
- **Ampliação:** 140x
- **Peso:** 800g
- **Dimensões:** 230 x 98 x 53 mm
- **Comunicação:** Mini USB, Cartão SD (até 32GB)
- **Conteúdo da Embalagem:** Máquina, Fonte, Maleta, Clivador com Lixeira, Alicate Decapador, 3 Pares de Suporte para Fibra.`
  },
  {
    name: "Bateria de Lítio da Sunwoda 100Ah com Certificação XPS",
    keywords: ["sunwoda", "bateria", "lítio", "48v", "100ah", "energia", "LB48V100AHSW", "xps"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/bateria-de-litio-100ah-sunwoda/
- **Marca Parceira:** Sunwoda
- **Modelo:** LB48V100AHSW
- **Tipo:** Bateria de Lítio (LiFePO4)
- **Tensão Nominal:** 48V
- **Capacidade Nominal:** 100Ah @0.5C, 25°C
- **Corrente Máx. de Carga:** 100A (1C)
- **Tensão Máx. de Carga:** 55V
- **Corrente Nominal de Descarga:** 50A (0.5C)
- **Corrente Máx. de Descarga:** 100A (1C)
- **Tensão Final de Descarga:** 40.5V
- **Vida útil (Design Life):** ≥10 anos
- **Ciclos de Vida:** 5000 ciclos @0.5C 25°C 80% DOD
- **Comunicação:** RS485, RS232, SNMP
- **Dimensões:** 442mm x 413mm x 130mm (Design 3U para rack)
- **Peso:** 40kg
- **Diferenciais:** BMS integrado, sistema anti-furto com giroscópio e comunicação, Certificação XPS.`
  },
  {
    name: "Clivador GROTATEpro (FCLV48KCC-1)",
    keywords: ["clivador", "grotatepro", "grotate pro", "fclv48kcc-1"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/clivador-grotate-pro/
- **Modelo:** FCLV48KCC-1
- **Material:** Ligas de alumínio
- **Lâmina:** Rotação automática com 16 posições
- **Quantidade de clivagens:** 48.000
- **Ângulo de clivagem:** 0.5°
- **Comprimento de Corte:** 7 ~ 16 mm
- **Tipos de Fibra:** Single Core (Ø 0,25 & 0,9 mm)
- **Diferenciais:** Retorno automático do carro, sem fissuras no núcleo da fibra.`
  },
  {
    name: "Clivador de Alta Precisão 50K (FCLV50K)",
    keywords: ["clivador", "alta precisão", "50k", "fclv50k"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/clivador-de-alta-precisao-50k/
- **Modelo:** FCLV50K
- **Lâmina:** 24 posições
- **Quantidade de clivagens:** 50.000
- **Ângulo de clivagem:** ≤0.5°
- **Comprimento de Corte:** 5 ~ 20 mm
- **Tipos de Fibra:** Single Core (0.25mm, 0.9mm, 3.0mm) e Cabo Drop Flat
- **Diferenciais:** Coletor de resíduos (lixeira), precisão elevada.`
  },
  {
    name: "Fonte Nobreak Multiuso (FNBUPS001)",
    keywords: ["fonte", "nobreak", "fnbups001", "mini nobreak"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/fonte-nobreak-greatek/
- **Modelo:** FNBUPS001
- **Entrada:** AC 100-240V
- **Saída (Ajustável):** 5V/2A, 9V/1A, 12V/1A
- **Capacidade:** 4000mAh (14.8Wh)
- **Bateria:** 18650 Bateria de Lítio
- **Proteção:** Sobrecarga, Baixa tensão, Sobrecorrente
- **Interface:** DC 5.5*2.1mm
- **Aplicação:** Ideal para alimentar ONUs, roteadores e outros equipamentos de baixa tensão durante quedas de energia.`
  },
  {
    name: "OTDR Greatek (OTDRMFO001)",
    keywords: ["otdr", "otdrmfo001", "medidor óptico", "optical time domain reflectometer"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/otdr-greatek/
- **Modelo:** OTDRMFO001
- **Tela:** 7" polegadas touchscreen
- **Comprimento de onda:** 1310/1550/1625nm
- **Faixa dinâmica:** 35/33/33dB
- **Distância de teste:** 500m ~ 160km
- **Zona morta de evento:** 1m
- **Zona morta de atenuação:** 5m
- **Largura do pulso:** 3ns, 5ns, 10ns, 20ns, 50ns, 100ns, 200ns, 500ns, 1μs, 2μs, 5μs, 10μs, 20μs
- **Tempo de mensuração:** Definido pelo usuário (link inteligente); com medição em tempo real
- **Linearidade:** <0.05dB/dB
- **Perda limite:** 0,01dB
- **Resolução de perda:** 0,001dB
- **Resolução de distância:** 0,01m
- **Resolução de amostragem:** Mínimo 0,25m
- **Ponto de amostragem:** Máximo de 128,000 pontos
- **Precisão da distância:** ±(1m+distância de medição x 3x10-5 + resolução de amostragem)
- **Bateria:** 7.4v / 6.6Ah
- **Armazenamento de dados:** 80.000 medições
- **Interface:** 3x USB
- **Temperatura de trabalho:** -10 °C ~ +50 °C
- **Temperatura de armazenamento:** -20 °C ~ +75 °C
- **Umidade relativa:** <= 90% sem dens.
- **Recursos Integrados:**
    - **Medidor de potência óptica (OPM):** 850/1300/1310/1490/1550/1625nm; -50 ~ +26db
    - **Fonte de luz óptica (LS):** 1310/1550nm
    - **Localizador Visual de Falhas (VFL):** 10mw, CW/2Hz (Visual interno)
    - **Fonte de laser estável:** >-5dBm`
  },
  {
    name: "Caixa de Terminação Óptica (CTO) Trava Dupla 16FO",
    keywords: ["cto", "caixa de terminação", "ctodt16a12f", "16fo", "trava dupla"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/cto-de-trava-dupla/
- **Modelo:** CTODT16A12F
- **Capacidade de adaptadores:** Até 16 adaptadores SC (APC ou UPC)
- **Capacidade de fusões:** Acomoda até 12 fusões
- **Grau de proteção:** IP66
- **Interface de cabos:** 4 interfaces para cabos de até 13mm
- **Vedação:** Travas mecânicas e borracha de vedação
- **Peso:** 1.1 Kg`
  },
  {
    name: "Caixa de Emenda Óptica (CEO)",
    keywords: ["ceo", "caixa de emenda", "ceo12f048", "ceo24f120"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/caixa-de-emenda-optica/
- **Material:** Composto PP resistente com proteção UV
- **Índice de Proteção:** IP68
- **Montagem:** Aérea (horizontal) e em postes
- **Componentes:** Cabeçote, Junta de vedação, Bandejas, Abraçadeira de fechamento, Cúpula.
- **Modelo CEO12F048:**
  - **Capacidade:** Expansível até 48 Fibras Ópticas (suporta 4 bandejas de 12)
  - **Portas:** 1 Porta oval para sangria, 3 Portas circulares de 18mm
- **Modelo CEO24F120:**
  - **Capacidade:** Expansível até 120 Fibras Ópticas (suporta 5 bandejas de 24)
  - **Portas:** 1 Porta oval para sangria, 4 Portas circulares de 20mm`
  },
  {
    name: "Distribuidor Óptico Interno (DIO) para Rack 19\"",
    keywords: ["dio", "distribuidor óptico", "dio12fo", "dio24fo", "rack"],
    details: `- **Link do Produto:** https://www.greatek.com.br/produto/distribuidor-interno-optico/
- **Material:** Aço laminado a frio com pintura eletrostática preta
- **Montagem:** Padrão Rack 19" (tamanho 1U)
- **Aplicação:** Cenários FTTH, LAN/WAN
- **Polimento:** APC ou UPC
- **Acessórios Inclusos:** Bandeja para emendas, protetores de emenda, pigtails coloridos, suportes para rack, parafusos, abraçadeiras e adaptadores ópticos.
- **Modelo DIO12FO:**
  - **Capacidade:** 12 Fibras
  - **Peso:** 3,5 Kg
- **Modelo DIO24FO:**
  - **Capacidade:** 24 Fibras
  - **Peso:** 3,7 Kg`
  },
  {
    name: "Conectores de Campo SC (APC/UPC)",
    keywords: ["conector", "conector de campo", "conector reutilizável", "conector anatel", "conector de rosca", "sc/apc", "sc/upc"],
    details: `- **Link da Família:** https://www.greatek.com.br/produto/conectores-de-campo-greatek/
- **Modelos Disponíveis:** Rosca, C04 Reutilizável, C03 Homologado ANATEL.
- **Polimentos:** SC/APC e SC/UPC.
---
### Modelo de Rosca (CNSCAPC11 / CNSCUPC11):
- **Aplicação:** Uso direto na ONU, montável em campo.
- **Perda de inserção:** ≤ 0,5dB
- **Perda de retorno:** ≥55 dB (APC), ≥45 dB (UPC)
---
### Modelo C04 Reutilizável (CNSCAPC04 / CNSCUPC04):
- **Aplicação:** Cabos Drop Flat até 3mm, cordões 2mm/3mm.
- **Perda de inserção:** Média ≤ 0.3dB
- **Perda de retorno:** ≥ 55dB (APC), ≥ 45dB (UPC)
- **Durabilidade:** ≥ 30 anos, reutilizável.
---
### Modelo C03 Homologado ANATEL (CNSCAPC03 / CNSCUPC03):
- **Diferencial:** Homologado na ANATEL, estrutura com dois ferrolhos de Zircônia.
- **Perda de inserção:** Média ≤ 0.3dB
- **Perda de retorno:** ≥ 50dB (APC), ≥ 45dB (UPC)`
  },
  {
      name: "TP-Link Roteadores e Soluções Wi-Fi (Consumo)",
      keywords: ["tp-link", "roteador", "router", "archer", "deco", "mesh", "repetidor", "extensor", "adaptador", "switch", "wi-fi 7", "wi-fi 6", "wi-fi 5", "BE900", "AX72", "X50", "RE705X", "TL-SG108"],
      details: `- **Visão Geral**: A TP-Link, distribuída pela Greatek, oferece uma linha completa de soluções de conectividade para residências e pequenos escritórios (SOHO), desde roteadores de alta performance a sistemas Mesh que garantem cobertura total.
---
### Roteadores Wi-Fi Archer
- **Foco**: Desempenho, velocidade e recursos avançados para diferentes perfis de usuário.
---
### Sistemas Wi-Fi Mesh Deco
- **Foco**: Cobertura Wi-Fi total e inteligente, eliminando zonas mortas com uma rede unificada e roaming contínuo.
---
### Repetidores de Sinal (Range Extenders)
- **Foco**: Expandir de forma simples a cobertura de uma rede Wi-Fi existente.
---
### Adaptadores de Rede
- **Foco**: Conectar ou atualizar desktops e laptops com as tecnologias de rede mais recentes.
---
### Switches SOHO
- **Foco**: Expandir a rede cabeada de forma fácil (Plug and Play) e silenciosa.`
    },
    {
    name: "TP-Link Omada - Solução de Rede Empresarial",
    keywords: ["omada", "sdn", "rede empresarial", "b2b", "access point", "switch", "roteador"],
    details: `- **Visão Geral:** TP-Link Omada é uma solução de rede definida por software (SDN) para SMBs e Enterprise, integrando Access Points, Switches e Gateways em uma única plataforma de gerenciamento.`
    },
    {
    name: "SkyWatch da Greatek - Monitoramento de Redes",
    keywords: ["skywatch", "monitoramento", "layer 7", "dns", "latência", "noc"],
    details: `- **O que é o SkyWatch?** É a solução de monitoramento inteligente da Greatek para provedores acompanharem a experiência real do usuário.`
    }
];

export const KNOWLEDGE_BASE_SKYWATCH = `
# Base de Conhecimento SkyWatch
O SkyWatch é a solução de monitoramento inteligente da Greatek, projetada para que provedores e empresas possam enxergar a qualidade da sua rede com os olhos do cliente final.
`;

export const FULL_KNOWLEDGE_BASE_TEXT = "--- INÍCIO DA BASE DE CONHECIMENTO INTERNA ---\n...";
