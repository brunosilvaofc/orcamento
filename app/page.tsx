"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ServiceSelector } from "@/components/service-selector"
import { MaterialForm } from "@/components/material-form"
import { ClientForm } from "@/components/client-form"
import { LogoUpload } from "@/components/logo-upload"
import { Spinner } from "@/components/ui/spinner"
import { Paintbrush, Zap, User, Wrench, Package, Plus, Trash2, ChevronRight, FileText, Building2, AlignLeft } from "lucide-react"


import { formatCurrency, generateId, type Budget, type BudgetService, type BudgetMaterial, type Client } from "@/lib/budget-types"

function ColorPicker({ color, onColorChange }: { color: string, onColorChange: (c: string) => void }) {
  const colors = [
    { name: "Azul", value: "from-blue-700 to-blue-500", bg: "bg-blue-600" },
    { name: "Verde", value: "from-emerald-700 to-emerald-500", bg: "bg-emerald-600" },
    { name: "Vermelho", value: "from-red-700 to-red-500", bg: "bg-red-600" },
    { name: "Laranja", value: "from-orange-600 to-orange-400", bg: "bg-orange-500" },
    { name: "Preto", value: "from-slate-900 to-slate-700", bg: "bg-slate-800" },
    { name: "Roxo", value: "from-purple-700 to-purple-500", bg: "bg-purple-600" },
  ]

  return (
    <Card className="p-4 shadow-sm">
      <h2 className="font-semibold text-foreground flex items-center gap-2 mb-3 text-slate-800">
        <Paintbrush className="w-4 h-4 text-primary" />
        Cor do Tema do Orçamento
      </h2>
      <div className="flex flex-wrap gap-3">
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => onColorChange(c.value)}
            className={`w-10 h-10 rounded-full border-2 transition-all ${
              color === c.value ? "scale-130 shadow-lg" : "border-transparent opacity-40 hover:opacity-100"
            } ${c.bg}`}
          />
        ))}
      </div>
    </Card>
  )
}

const BudgetPreview = dynamic(() => 
  import("@/components/budget-preview").then((mod) => mod.BudgetPreview), 
  { ssr: false, loading: () => <div className="min-h-screen flex items-center justify-center"><Spinner /></div> }
);

type View = "main" | "client" | "services" | "materials" | "preview"

export default function Home() {
  const [view, setView] = useState<View>("main")
  const [client, setClient] = useState<Client | null>(null)
  const [services, setServices] = useState<BudgetService[]>([])
  const [materials, setMaterials] = useState<BudgetMaterial[]>([])
  const [budget, setBudget] = useState<Budget | null>(null)
  const [logo, setLogo] = useState<string | null>(null)
  const [themeColor, setThemeColor] = useState<string>("from-blue-700 to-blue-500")
  
  // Novos Estados
  const [companyName, setCompanyName] = useState("")
  const [companyCNPJ, setCompanyCNPJ] = useState("")
  const [description, setDescription] = useState("")

  const servicesTotal = services.reduce((sum, s) => sum + s.total, 0)
  const materialsTotal = materials.reduce((sum, m) => sum + m.total, 0)
  const grandTotal = servicesTotal + materialsTotal

  const handleGenerateBudget = () => {
    if (!client) return
    const newBudget: Budget = {
      id: `${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${generateId()}`,
      date: new Date(),
      client,
      services,
      materials,
      servicesTotal,
      materialsTotal,
      grandTotal,
      warranty: "90 dias",
      validity: "7 dias",
      paymentMethods: "Dinheiro / Cartão de Crédito / PIX",
      companyName,
      companyCNPJ,
      description
    }
    setBudget(newBudget)
    setView("preview")
  }

  const handleNewBudget = () => {
    setClient(null); setServices([]); setMaterials([]); setBudget(null); 
    setCompanyName(""); setCompanyCNPJ(""); setDescription(""); setView("main");
  }

  if (view === "client") return <ClientForm client={client} onSave={(c) => {setClient(c); setView("main")}} onClose={() => setView("main")} />
 if (view === "services") {
  return (
    <ServiceSelector 
      onAddServices={(newServices) => {
  setServices([...services, ...newServices]); // Os três pontos antes de newServices são cruciais
  setView("main");
}}
      onClose={() => setView("main")} 
    />
  );
}
  if (view === "materials") return <MaterialForm onAddMaterial={(m) => {setMaterials([...materials, m]); setView("main")} } onClose={() => setView("main")} />
  
  if (view === "preview" && budget) {
    return <BudgetPreview budget={budget} onClose={() => setView("main")} onNewBudget={handleNewBudget} logo={logo} themeColor={themeColor} />
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
    <header className="bg-primary text-primary-foreground p-6 pb-12">
  <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
    <Zap className="w-8 h-8" />
  </div>
</header>

      <div className="max-w-2xl mx-auto p-4 -mt-8 space-y-4">
        
        <Card className="p-4 shadow-sm">
          <LogoUpload logo={logo} onLogoChange={setLogo} />
        </Card>

        {/* NOVO: Dados da Empresa */}
        <Card className="p-4 shadow-sm">
          <h2 className="font-semibold flex items-center gap-2 mb-3 text-slate-800">
            <Building2 className="w-4 h-4 text-primary" /> Identificação da Empresa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input 
              placeholder="Nome da Empresa / Profissional" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input 
              placeholder="CNPJ / CPF" 
              value={companyCNPJ} 
              onChange={(e) => setCompanyCNPJ(e.target.value)}
            />
          </div>
        </Card>

        {/* NOVO: Descrição das Atividades */}
        <Card className="p-4 shadow-sm">
          <h2 className="font-semibold flex items-center gap-2 mb-3 text-slate-800">
            <AlignLeft className="w-4 h-4 text-primary" /> Descrição das Atividades
          </h2>
          <Textarea 
            placeholder="Descreva brevemente o que será realizado..." 
            className="min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Card>

        <ColorPicker color={themeColor} onColorChange={setThemeColor} />

        {/* ... (Manter o restante igual: Cliente, Serviços, Materiais) ... */}
        <Card className="p-4 shadow-sm">
          <h2 className="font-semibold flex items-center gap-2 mb-3 text-slate-800">
            <User className="w-4 h-4 text-primary" /> Cliente <span className="font-medium text-[12px]">(Obrigatório) </span>
          </h2>
          {client ? (
            <div onClick={() => setView("client")} className="flex justify-between items-center cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <div><p className="font-medium text-slate-900">{client.name}</p><p className="text-sm text-muted-foreground">{client.phone}</p></div>
              <ChevronRight className="text-slate-400" />
            </div>
          ) : (
            <Button variant="outline" className="w-full border-dashed" onClick={() => setView("client")}><Plus className="mr-2 h-4 w-4" /> Adicionar Cliente</Button>
          )}
        </Card>

        <Card className="p-4 shadow-sm">
           <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold flex items-center gap-2 text-slate-800"><Wrench className="w-4 h-4 text-primary" /> Serviços <span className="font-medium text-[12px]">(Obrigatório) </span></h2>
            <span className="text-accent font-bold">{formatCurrency(servicesTotal)}</span>
           </div>
           <div className="space-y-2">
           {services.map((s, index) => (
  // Usamos s.id, mas garantimos um fallback com o índice se necessário
  <div key={s.id || `service-${index}`} className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
    <span className="font-medium text-slate-700">{s.name}</span>
    <button onClick={() => setServices(services.filter(i => i.id !== s.id))}>
      <Trash2 className="w-4 h-4 text-destructive"/>
    </button>
  </div>
))}
           </div>
           <Button variant="outline" className="w-full mt-3 border-dashed" onClick={() => setView("services")}><Plus className="mr-2 h-4 w-4" /> Adicionar Serviço</Button>
        </Card>

        <Card className="p-4 shadow-sm">
           <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold flex items-center gap-2 text-slate-800"><Package className="w-4 h-4 text-primary" /> Materiais</h2>
            <span className="text-accent font-bold">{formatCurrency(materialsTotal)}</span>
           </div>
           <div className="space-y-2">
            {materials.map(m => (
              <div key={m.id} className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-700">{m.name}</span>
                <button onClick={() => setMaterials(materials.filter(i => i.id !== m.id))}><Trash2 className="w-4 h-4 text-destructive"/></button>
              </div>
            ))}
           </div>
           <Button variant="outline" className="w-full mt-3 border-dashed" onClick={() => setView("materials")}><Plus className="mr-2 h-4 w-4" /> Adicionar Material</Button>
        </Card>

        <div className="pt-4 mt-3 mb-8">
          <Button className="w-full h-12 text-lg shadow-lg" disabled={!client || services.length == 0 } onClick={handleGenerateBudget}>
            <FileText className="mr-2 h-5 w-5" /> Gerar Orçamento
          </Button>
        </div>
      </div>
    </main>
  )
}