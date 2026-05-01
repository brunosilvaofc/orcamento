"use client"

import { useState, useMemo } from "react"
import { Search, Plus, Zap, Pencil, Trash2, CheckCircle2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { services, categories } from "@/lib/services-data"
import { formatCurrency, generateId, type BudgetService } from "@/lib/budget-types"
import { toast } from "react-toastify"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ServiceSelectorProps {
  onAddServices: (services: BudgetService[]) => void
  onClose: () => void
}

export function ServiceSelector({ onAddServices, onClose }: ServiceSelectorProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [selectedPrices, setSelectedPrices] = useState<Record<string, number>>({})
  const [pendingServices, setPendingServices] = useState<BudgetService[]>([])

  const [manualName, setManualName] = useState("")
  const [manualPrice, setManualPrice] = useState("")
  const [manualQty, setManualQty] = useState(1)

  const [showManualModal, setShowManualModal] = useState(false)

  const filteredServices = useMemo(() => {
    let filtered = services

    filtered = filtered.filter(
      (s) => !pendingServices.some(ps => ps.name === s.name)
    )

    if (selectedCategory !== "all") {
      filtered = filtered.filter((s) => s.category === selectedCategory)
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter((s) => 
        s.name.toLowerCase().includes(searchLower) || 
        s.category.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [search, selectedCategory, pendingServices])

  const queueService = (name: string, price: number, qty: number) => {
    const newService: BudgetService = {
      id: generateId(),
      name,
      unitPrice: price,
      quantity: qty,
      total: price * qty,
    }

    setPendingServices(prev => [newService, ...prev])
    toast.success(`${name} adicionado (${qty}x)`)
  }

  // ✅ AQUI FOI ADICIONADO O TOAST AO EXCLUIR
  const removePending = (id: string) => {
    const removed = pendingServices.find(s => s.id === id)

    setPendingServices(prev => prev.filter(s => s.id !== id))

    if (removed) {
      toast.info(`${removed.name} removido`)
    }
  }

  const handleFinish = () => {
    if (pendingServices.length > 0) {
      onAddServices(pendingServices)
      toast.success(`${pendingServices.length} serviço(s) adicionados`)
      onClose()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background relative">

      {/* HEADER */}
      <div className="sticky top-0 bg-background z-20 p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>← Voltar</Button>
            <h2 className="text-lg font-semibold">Adicionar Serviço</h2>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => setShowManualModal(true)}>
              <Pencil className="w-4 h-4 mr-1" /> Personalizado
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* LISTA */}
      <div className="flex-1 overflow-auto p-4 space-y-4 pb-32">
        
        {pendingServices.length > 0 && (
          <Card className="p-4 border-primary/20 bg-primary/5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Serviços na lista atual
            </h3>
            <div className="space-y-2">
              {pendingServices.map((ps) => (
                <div key={ps.id} className="flex items-center justify-between bg-background p-2 rounded-md border text-sm">
                  <div className="flex-1 pr-2">
                    <p className="font-medium line-clamp-1 uppercase text-[11px]">{ps.name}</p>
                    <p className="text-muted-foreground text-xs">{ps.quantity}x {formatCurrency(ps.unitPrice)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removePending(ps.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {filteredServices.map((service) => {
          const qty = quantities[service.id] || 1
          const price = selectedPrices[service.id] || service.avgPrice
          return (
            <Card key={service.id} className="p-4">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-primary uppercase">{service.category}</p>
                <h3 className="font-medium text-sm">{service.name}</h3>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Mín', val: service.minPrice },
                    { label: 'Méd', val: service.avgPrice },
                    { label: 'Máx', val: service.maxPrice }
                  ].map(p => (
                    <button
                      key={p.label}
                      onClick={() => setSelectedPrices(prev => ({...prev, [service.id]: p.val}))}
                      className={`p-1 rounded border text-[10px] ${price === p.val ? 'border-primary bg-primary/10' : ''}`}
                    >
                      <div className="text-muted-foreground">{p.label}</div>
                      <div className="font-bold">{formatCurrency(p.val)}</div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center border rounded-lg scale-90 origin-left">
                    <button onClick={() => setQuantities(prev => ({...prev, [service.id]: Math.max(1, qty - 1)}))} className="px-3 py-1">-</button>
                    <span className="px-2 font-bold">{qty}</span>
                    <button onClick={() => setQuantities(prev => ({...prev, [service.id]: qty + 1}))} className="px-3 py-1">+</button>
                  </div>
                  <Button size="sm" onClick={() => queueService(service.name, price, qty)}>
                    <Plus className="w-4 h-4 mr-1" /> Adicionar
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* MODAL */}
      {showManualModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold">Adicionar personalizado</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowManualModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <Input 
              placeholder="Nome do serviço..." 
              value={manualName} 
              onChange={(e) => setManualName(e.target.value)} 
            />

            <div className="flex gap-2">
              <Input 
                type="number" 
                placeholder="Preço" 
                value={manualPrice} 
                onChange={(e) => setManualPrice(e.target.value)} 
              />
              <div className="flex items-center border rounded-md px-2">
                <button onClick={() => setManualQty(q => Math.max(1, q - 1))}>-</button>
                <span className="w-8 text-center">{manualQty}</span>
                <button onClick={() => setManualQty(q => q + 1)}>+</button>
              </div>
            </div>

            <Button
              className="w-full"
              disabled={!manualName || !manualPrice}
              onClick={() => {
                queueService(manualName, parseFloat(manualPrice), manualQty)
                setManualName("")
                setManualPrice("")
                setManualQty(1)
                setShowManualModal(false)
              }}
            >
              Adicionar
            </Button>
          </Card>
        </div>
      )}

      {pendingServices.length > 0 && (
        <div className="fixed bottom-6 left-0 right-0 px-6 z-30">
          <Button 
            onClick={handleFinish}
            className="w-full h-14 shadow-2xl rounded-full text-lg font-bold gap-3 border-4 border-background"
          >
            Salvar Serviços ({pendingServices.length})
          </Button>
        </div>
      )}
    </div>
  )
}
