export interface Client {
  name: string
  phone: string
  email?: string
  address?: string
  document?: string // CPF ou CNPJ
}

export interface BudgetService {
  id: string
  name: string
  unitPrice: number
  quantity: number
  total: number
}

export interface BudgetMaterial {
  id: string
  name: string
  unit: string
  unitPrice: number
  quantity: number
  profitMargin?: number
  total: number
}

export interface Budget {
  id: string
  date: Date
  client: Client
  services: BudgetService[]
  materials: BudgetMaterial[]
  servicesTotal: number
  materialsTotal: number
  grandTotal: number
  warranty: string
  validity: string
  paymentMethods: string
  observations?: string
  companyName?: string
  companyCNPJ?: string
  description?: string
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
