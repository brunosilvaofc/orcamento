"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { generateId, type BudgetMaterial } from "@/lib/budget-types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Package } from "lucide-react"

interface MaterialFormProps {
  onAddMaterial: (material: BudgetMaterial) => void
  onClose: () => void
}

const units = [
  { value: "und", label: "Unidade (und)" },
  { value: "m", label: "Metro (m)" },
  { value: "m²", label: "Metro Quadrado (m²)" },
  { value: "kg", label: "Quilograma (kg)" },
  { value: "pç", label: "Peça (pç)" },
  { value: "cx", label: "Caixa (cx)" },
  { value: "rolo", label: "Rolo" },
  { value: "kit", label: "Kit" },
]

export function MaterialForm({ onAddMaterial, onClose }: MaterialFormProps) {
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("und")
  const [unitPrice, setUnitPrice] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [enableMargin, setEnableMargin] = useState(false)
  const [margin, setMargin] = useState("20")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !unitPrice) return

    const price = parseFloat(unitPrice.replace(",", "."))
    const qty = parseFloat(quantity.replace(",", ".")) || 1
    const marginValue = enableMargin ? parseFloat(margin) / 100 : 0
    const totalWithMargin = price * qty * (1 + marginValue)

    onAddMaterial({
      id: generateId(),
      name: name.trim(),
      unit,
      unitPrice: price,
      quantity: qty,
      profitMargin: enableMargin ? parseFloat(margin) : undefined,
      total: totalWithMargin,
    })

    setName("")
    setUnitPrice("")
    setQuantity("1")
  }

  const calculateTotal = () => {
    const price = parseFloat(unitPrice.replace(",", ".")) || 0
    const qty = parseFloat(quantity.replace(",", ".")) || 1
    const marginValue = enableMargin ? parseFloat(margin) / 100 : 0
    return price * qty * (1 + marginValue)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 bg-background z-10 p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground">
            ← Voltar
          </Button>
          <h2 className="text-lg font-semibold text-foreground">Adicionar Material</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Material</Label>
          <Input
            id="name"
            placeholder="Ex: Cabo flexível 2,5mm²"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Unidade de Medida</Label>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a unidade" />
            </SelectTrigger>
            <SelectContent>
              {units.map((u) => (
                <SelectItem key={u.value} value={u.value}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Valor Unitário (R$)</Label>
            <Input
              id="price"
              type="text"
              inputMode="decimal"
              placeholder="0,00"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="text"
              inputMode="decimal"
              placeholder="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Margem de Lucro</p>
              <p className="text-sm text-muted-foreground">
                Adicionar percentual sobre o valor
              </p>
            </div>
            <Switch checked={enableMargin} onCheckedChange={setEnableMargin} />
          </div>

          {enableMargin && (
            <div className="space-y-2">
              <Label htmlFor="margin">Percentual (%)</Label>
              <Input
                id="margin"
                type="text"
                inputMode="decimal"
                placeholder="20"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
              />
            </div>
          )}
        </div>

        {unitPrice && (
          <div className="bg-accent/10 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground">Total:</span>
            </div>
            <span className="text-xl font-bold text-accent">
              R$ {calculateTotal().toFixed(2).replace(".", ",")}
            </span>
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" disabled={!name.trim() || !unitPrice}>
          Adicionar Material
        </Button>
      </form>
    </div>
  )
}
