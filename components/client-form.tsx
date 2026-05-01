"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type Client } from "@/lib/budget-types"
import { User, Phone, Mail, MapPin, FileText } from "lucide-react"

interface ClientFormProps {
  client: Client | null
  onSave: (client: Client) => void
  onClose: () => void
}

export function ClientForm({ client, onSave, onClose }: ClientFormProps) {
  const [name, setName] = useState(client?.name || "")
  const [phone, setPhone] = useState(client?.phone || "")
  const [email, setEmail] = useState(client?.email || "")
  const [address, setAddress] = useState(client?.address || "")
  const [document, setDocument] = useState(client?.document || "")

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 11)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const formatDocument = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      // CPF
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
      if (numbers.length <= 9)
        return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`
    } else {
      // CNPJ
      if (numbers.length <= 2) return numbers
      if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
      if (numbers.length <= 8)
        return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
      if (numbers.length <= 12)
        return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim()) return

    onSave({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      address: address.trim() || undefined,
      document: document.trim() || undefined,
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="sticky top-0 bg-background z-10 p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground">
            ← Voltar
          </Button>
          <h2 className="text-lg font-semibold text-foreground">Dados do Cliente</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 p-4 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            Nome do Cliente *
          </Label>
          <Input
            id="name"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            Telefone/Celular com DDD *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email (Opcional)
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            Endereço (Opcional)
          </Label>
          <Input
            id="address"
            placeholder="Rua, número, bairro, cidade"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="document" className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            CPF ou CNPJ (Opcional)
          </Label>
          <Input
            id="document"
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            value={document}
            onChange={(e) => setDocument(formatDocument(e.target.value))}
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!name.trim() || !phone.trim()}
          >
            Salvar Cliente
          </Button>
        </div>
      </form>
    </div>
  )
}
