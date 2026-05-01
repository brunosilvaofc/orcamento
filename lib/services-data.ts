export interface Service {
  id: string
  category: string
  name: string
  minPrice: number
  maxPrice: number
  avgPrice: number
}

export const services: Service[] = [
  // ILUMINAÇÃO
  { id: "1", category: "Iluminação", name: "Instalação de Interruptor Simples ou Pulsador", minPrice: 55, maxPrice: 80, avgPrice: 68 },
  { id: "2", category: "Iluminação", name: "Instalação de Interruptor Three-Way ou Four-Way", minPrice: 70, maxPrice: 90, avgPrice: 80 },
  { id: "3", category: "Iluminação", name: "Instalação de Interruptor Duplo ou Bipolar", minPrice: 70, maxPrice: 90, avgPrice: 80 },
  { id: "4", category: "Iluminação", name: "Instalação de Interruptor e Tomada (Juntos)", minPrice: 70, maxPrice: 90, avgPrice: 80 },
  { id: "5", category: "Iluminação", name: "Instalação de Arandela, Pendente ou Spot Comum", minPrice: 75, maxPrice: 110, avgPrice: 93 },
  { id: "6", category: "Iluminação", name: "Instalação de Lâmpada Fluorescente ou LED (Tubular)", minPrice: 80, maxPrice: 105, avgPrice: 93 },
  { id: "7", category: "Iluminação", name: "Instalação de Lustres Simples ou Luminária", minPrice: 105, maxPrice: 135, avgPrice: 120 },
  { id: "8", category: "Iluminação", name: "Instalação de Lustres Grandes ou Luminária", minPrice: 160, maxPrice: 200, avgPrice: 180 },
  { id: "9", category: "Iluminação", name: "Instalação de Refletor de Jardim", minPrice: 115, maxPrice: 150, avgPrice: 133 },
  { id: "10", category: "Iluminação", name: "Instalação de Refletor de Poste Comum", minPrice: 145, maxPrice: 200, avgPrice: 173 },
  { id: "11", category: "Iluminação", name: "Instalação de Refletor de Poste com Lâmpada a Vapor", minPrice: 145, maxPrice: 200, avgPrice: 173 },
  { id: "12", category: "Iluminação", name: "Instalação de Reator de Lâmpada a Vapor", minPrice: 90, maxPrice: 120, avgPrice: 105.5 },
  { id: "13", category: "Iluminação", name: "Instalação de Fotocélula ou Sensor de Presença", minPrice: 90, maxPrice: 140, avgPrice: 115 },
  { id: "14", category: "Iluminação", name: "Instalação de Refletor LED + Fotocélula ou Sensor de Presença", minPrice: 80, maxPrice: 130, avgPrice: 105 },
  { id: "15", category: "Iluminação", name: "Instalação de Luminária de Emergência de Sobrepor", minPrice: 90, maxPrice: 140, avgPrice: 115 },
  { id: "16", category: "Iluminação", name: "Instalação de Luminária de Emergência de Embutir (caixinha 2x4)", minPrice: 70, maxPrice: 105, avgPrice: 88 },
  { id: "17", category: "Iluminação", name: "Instalação de Perfil de LED (por metro linear)", minPrice: 180, maxPrice: 230, avgPrice: 205 },
  { id: "18", category: "Iluminação", name: "Instalação de Luminária Tubular ou Troca de Reator/LED", minPrice: 90, maxPrice: 130, avgPrice: 110 },

  // PONTO DE UTILIZAÇÃO
  { id: "19", category: "Ponto de Utilização", name: "Instalação de Tomada Simples", minPrice: 45, maxPrice: 70, avgPrice: 58 },
  { id: "20", category: "Ponto de Utilização", name: "Instalação de Tomada Dupla", minPrice: 55, maxPrice: 80, avgPrice: 68 },
  { id: "21", category: "Ponto de Utilização", name: "Instalação de Tomada Tripla", minPrice: 70, maxPrice: 90, avgPrice: 80 },
  { id: "22", category: "Ponto de Utilização", name: "Instalação de Tomada de Piso e/ou Telefone", minPrice: 70, maxPrice: 90, avgPrice: 80 },
  { id: "23", category: "Ponto de Utilização", name: "Instalação de Tomada Industrial (3P+T)", minPrice: 105, maxPrice: 150, avgPrice: 128 },
  { id: "24", category: "Ponto de Utilização", name: "Instalação de Tomada de Sobrepor com Canaleta", minPrice: 70, maxPrice: 90, avgPrice: 80 },
  { id: "25", category: "Ponto de Utilização", name: "Instalação de Chave de Bóia Superior e Inferior (Residência)", minPrice: 135, maxPrice: 175, avgPrice: 155 },
  { id: "26", category: "Ponto de Utilização", name: "Instalação de Ventilador de Teto", minPrice: 160, maxPrice: 200, avgPrice: 180 },
  { id: "27", category: "Ponto de Utilização", name: "Instalação de Ventilador de Parede", minPrice: 105, maxPrice: 125, avgPrice: 115 },
  { id: "28", category: "Ponto de Utilização", name: "Instalação de Chuveiro Elétrico Simples", minPrice: 105, maxPrice: 125, avgPrice: 115 },
  { id: "29", category: "Ponto de Utilização", name: "Instalação de Chuveiro Luxo (Eletrônico ou Pressurizado ou Ducha)", minPrice: 160, maxPrice: 180, avgPrice: 170 },
  { id: "30", category: "Ponto de Utilização", name: "Troca de Resistência de Chuveiro (Elétrico ou Eletrônico)", minPrice: 90, maxPrice: 115, avgPrice: 103 },
  { id: "31", category: "Ponto de Utilização", name: "Instalação de Torneira Elétrica", minPrice: 105, maxPrice: 120, avgPrice: 113 },
  { id: "32", category: "Ponto de Utilização", name: "Instalação de Campainha até 20m", minPrice: 80, maxPrice: 100, avgPrice: 90 },
  { id: "33", category: "Ponto de Utilização", name: "Instalação de Interfone 1 Chamada", minPrice: 170, maxPrice: 230, avgPrice: 200 },
  { id: "34", category: "Ponto de Utilização", name: "Instalação de Interfone 2 Chamadas", minPrice: 220, maxPrice: 170, avgPrice: 195 },
  { id: "35", category: "Ponto de Utilização", name: "Instalação de Interfone 4 Chamadas", minPrice: 480, maxPrice: 550, avgPrice: 515 },
  { id: "36", category: "Ponto de Utilização", name: "Instalação de Vídeo Porteiro", minPrice: 205, maxPrice: 230, avgPrice: 218 },
  { id: "37", category: "Ponto de Utilização", name: "Instalação de Câmera CFTV 1 Câmera Wi-Fi (sem ponto elétrico)", minPrice: 170, maxPrice: 210, avgPrice: 190 },
  { id: "38", category: "Ponto de Utilização", name: "Instalação de Câmeras CFTV 3 Câmeras Wi-Fi (sem ponto elétrico)", minPrice: 410, maxPrice: 450, avgPrice: 430 },
  { id: "39", category: "Ponto de Utilização", name: "Instalação de Portão Eletrônico Deslizante", minPrice: 300, maxPrice: 350, avgPrice: 325 },
  { id: "40", category: "Ponto de Utilização", name: "Instalação de Portão Eletrônico Pivotante ou Basculante", minPrice: 560, maxPrice: 610, avgPrice: 585 },
  { id: "41", category: "Ponto de Utilização", name: "Instalação de Botoeira para Fechadura Eletrônica (Portão Social)", minPrice: 70, maxPrice: 100, avgPrice: 85 },
  { id: "42", category: "Ponto de Utilização", name: "Instalação de Fechadura Eletrônica (Portão Social)", minPrice: 170, maxPrice: 200, avgPrice: 185 },
  { id: "43", category: "Ponto de Utilização", name: "Instalação de Exaustor Cozinha ou Banheiro", minPrice: 260, maxPrice: 300, avgPrice: 280 },
  { id: "44", category: "Ponto de Utilização", name: "Instalação de Sistema de Alarme Residencial", minPrice: 900, maxPrice: 1200, avgPrice: 1050 },
  { id: "45", category: "Ponto de Utilização", name: "Instalação de Aquecedor Elétrico (com passagem de cabos)", minPrice: 2330, maxPrice: 3200, avgPrice: 2765 },
  { id: "46", category: "Ponto de Utilização", name: "Instalação de Detector de Fumaça", minPrice: 1290, maxPrice: 1800, avgPrice: 1545 },
  { id: "47", category: "Ponto de Utilização", name: "Instalação de Cerca Elétrica (por metro)", minPrice: 70, maxPrice: 110, avgPrice: 90 },
  { id: "48", category: "Ponto de Utilização", name: "Instalação de Nobreak", minPrice: 325, maxPrice: 360, avgPrice: 343 },
  { id: "49", category: "Ponto de Utilização", name: "Instalação de Aquecedor a Gás", minPrice: 350, maxPrice: 450, avgPrice: 400 },
  { id: "50", category: "Ponto de Utilização", name: "Instalação de Termostato ou Temporizador", minPrice: 105, maxPrice: 150, avgPrice: 128 },

  // QUADROS DE DISTRIBUIÇÃO
  { id: "51", category: "Quadros de Distribuição", name: "Substituição de Disjuntor Monofásico", minPrice: 60, maxPrice: 80, avgPrice: 70 },
  { id: "52", category: "Quadros de Distribuição", name: "Substituição de Disjuntor Bifásico", minPrice: 80, maxPrice: 100, avgPrice: 90 },
  { id: "53", category: "Quadros de Distribuição", name: "Substituição de Disjuntor Trifásico", minPrice: 120, maxPrice: 130, avgPrice: 115 },
  { id: "54", category: "Quadros de Distribuição", name: "Instalação de IDR (Interruptor Diferencial Residual)", minPrice: 150, maxPrice: 170, avgPrice: 160 },
  { id: "55", category: "Quadros de Distribuição", name: "Instalação de DPS - Dispositivo de Proteção Contra Surtos", minPrice: 120, maxPrice: 140, avgPrice: 130 },
  { id: "56", category: "Quadros de Distribuição", name: "Instalação de Barramento Pente Monopolar no QDC", minPrice: 70, maxPrice: 90, avgPrice: 80 },
  { id: "57", category: "Quadros de Distribuição", name: "Instalação de Barramento Pente Bipolar no QDC", minPrice: 80, maxPrice: 100, avgPrice: 90 },
  { id: "58", category: "Quadros de Distribuição", name: "Instalação de Barramento Pente Tripolar no QDC", minPrice: 90, maxPrice: 110, avgPrice: 100 },
  { id: "59", category: "Quadros de Distribuição", name: "Instalação de Barramento de Neutro e/ou Terra", minPrice: 100, maxPrice: 120, avgPrice: 110 },
  { id: "60", category: "Quadros de Distribuição", name: "Instalação de Haste de Aterramento", minPrice: 250, maxPrice: 500, avgPrice: 350 },
  { id: "61", category: "Quadros de Distribuição", name: "Instalação de Contator e/ou Relé Térmico", minPrice: 200, maxPrice: 250, avgPrice: 230 },
  { id: "62", category: "Quadros de Distribuição", name: "Instalação e Montagem QDC (6 Circuitos + DR + DPS)", minPrice: 650, maxPrice: 800, avgPrice: 725 },
  { id: "63", category: "Quadros de Distribuição", name: "Instalação e Montagem QDC (12 Circuitos + DR + DPS)", minPrice: 850, maxPrice: 1000, avgPrice: 925 },
  { id: "64", category: "Quadros de Distribuição", name: "Instalação e Montagem QDC (18 Circuitos + DR + DPS)", minPrice: 1000, maxPrice: 1500, avgPrice: 1250 },
  { id: "65", category: "Quadros de Distribuição", name: "Instalação e Montagem QDC (24 Circuitos + DR + DPS)", minPrice: 1500, maxPrice: 3000, avgPrice: 2300 },

  // PASSAGEM DE CABOS
  { id: "66", category: "Passagem de Cabos", name: "Entrada Monofásica (QM para QDC)", minPrice: 220, maxPrice: 250, avgPrice: 230 },
  { id: "67", category: "Passagem de Cabos", name: "Entrada Bifásica ou Trifásica (QM para QDC)", minPrice: 250, maxPrice: 300, avgPrice: 280 },
  { id: "68", category: "Passagem de Cabos", name: "Alimentação para Motores", minPrice: 300, maxPrice: 350, avgPrice: 325 },

  // SOLUÇÃO DE PROBLEMAS
  { id: "69", category: "Solução de Problemas", name: "Curto Circuito Monofásico", minPrice: 130, maxPrice: 600, avgPrice: 400 },
  { id: "70", category: "Solução de Problemas", name: "Curto Circuito Bifásico", minPrice: 200, maxPrice: 1000, avgPrice: 600 },
  { id: "71", category: "Solução de Problemas", name: "Curto Circuito Trifásico", minPrice: 300, maxPrice: 1200, avgPrice: 800 },

  // PADRÃO DE ENTRADA
  { id: "72", category: "Padrão de Entrada", name: "Instalação de Medidor (Padrão de entrada - Monofásico 127V ou 220V)", minPrice: 1200, maxPrice: 1800, avgPrice: 1500 },
  { id: "73", category: "Padrão de Entrada", name: "Instalação de Medidor (Padrão de entrada - Bifásico 220V)", minPrice: 1400, maxPrice: 2000, avgPrice: 1700 },
  { id: "74", category: "Padrão de Entrada", name: "Instalação de Medidor (Padrão de entrada - Trifásico 220V)", minPrice: 2000, maxPrice: 2500, avgPrice: 2250 },

  // AUTOMAÇÃO RESIDENCIAL
  { id: "75", category: "Automação Residencial", name: "Instalação de Interruptor Inteligente", minPrice: 150, maxPrice: 300, avgPrice: 225 },
  { id: "76", category: "Automação Residencial", name: "Instalação Mini Relé Interruptor", minPrice: 200, maxPrice: 300, avgPrice: 250 },
  { id: "77", category: "Automação Residencial", name: "Instalação Relé de Impulso", minPrice: 150, maxPrice: 220, avgPrice: 175 },
  { id: "78", category: "Automação Residencial", name: "Instalação Relé Dimmer", minPrice: 200, maxPrice: 300, avgPrice: 250 },
  { id: "79", category: "Automação Residencial", name: "Instalação e Configuração Controle Remoto Universal", minPrice: 110, maxPrice: 150, avgPrice: 130 },
  { id: "80", category: "Automação Residencial", name: "Instalação e Configuração Assistente Virtual", minPrice: 200, maxPrice: 300, avgPrice: 250 },
  { id: "81", category: "Automação Residencial", name: "Instalação de Tomada Inteligente", minPrice: 150, maxPrice: 200, avgPrice: 175 },
  { id: "82", category: "Automação Residencial", name: "Instalação Mini Relé Controle de Persiana", minPrice: 200, maxPrice: 300, avgPrice: 250 },
  { id: "83", category: "Automação Residencial", name: "Instalação e Configuração Hub", minPrice: 200, maxPrice: 250, avgPrice: 225 },
  { id: "84", category: "Automação Residencial", name: "Instalação e Configuração Roteador", minPrice: 150, maxPrice: 300, avgPrice: 225 },
  { id: "85", category: "Automação Residencial", name: "Instalação e Configuração Fechadura Inteligente", minPrice: 250, maxPrice: 400, avgPrice: 325 },

  // CARREGADOR VEICULAR
  { id: "86", category: "Carregador Veicular", name: "Instalação de Carregador Veicular", minPrice: 1200, maxPrice: 1800, avgPrice: 1500 },
]

export const categories = [
  "Iluminação",
  "Ponto de Utilização",
  "Quadros de Distribuição",
  "Passagem de Cabos",
  "Solução de Problemas",
  "Padrão de Entrada",
  "Automação Residencial",
  "Carregador Veicular",
]
