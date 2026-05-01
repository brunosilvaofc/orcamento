"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { formatCurrency, type Budget } from "@/lib/budget-types"
import { Zap, ImageIcon, FileDown, Loader2 } from "lucide-react"
import * as htmlToImage from "html-to-image"
import jsPDF from "jspdf"

interface BudgetPreviewProps {
  budget: Budget & { companyName?: string; companyCNPJ?: string; description?: string }
  onClose?: () => void
  onNewBudget: () => void
  logo?: string | null
  themeColor: string
}

export function BudgetPreview({ budget, onClose, onNewBudget, logo, themeColor }: BudgetPreviewProps) {
  const printRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationType, setGenerationType] = useState<"pdf" | "image" | null>(null)

  const getTextColor = (color: string) => {
    if (color.includes("blue")) return "text-blue-600"
    if (color.includes("emerald")) return "text-emerald-600"
    if (color.includes("red")) return "text-red-600"
    if (color.includes("orange")) return "text-orange-600"
    if (color.includes("slate")) return "text-slate-800"
    if (color.includes("purple")) return "text-purple-600"
    return "text-blue-600"
  }

  const accentTextColor = getTextColor(themeColor)

  const handleDownload = async (type: "pdf" | "image") => {
    setIsGenerating(true)
    setGenerationType(type)
    if (!printRef.current) return

    try {
      const element = printRef.current

      const contentHeight = element.scrollHeight
      const pageHeightPx = 1123
      const numberOfPages = Math.ceil(contentHeight / pageHeightPx)
      const finalHeight = numberOfPages * pageHeightPx

      const originalHeight = element.style.height

      // 🔥 Apenas força altura (SEM hacks que quebram render)
      element.style.height = `${finalHeight}px`

      const dataUrl = await htmlToImage.toPng(element, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2,
        width: 794,
        height: finalHeight
      })

      if (type === "pdf") {
        const pdf = new jsPDF("p", "mm", "a4")
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        const ratio = pdfWidth / 794
        const totalHeightMm = finalHeight * ratio

        for (let i = 0; i < numberOfPages; i++) {
          if (i > 0) pdf.addPage()

          // 🔥 pequeno ajuste pra evitar cortar texto feio
          const position = -(i * pdfHeight) + 2

          pdf.addImage(
            dataUrl,
            "PNG",
            0,
            position,
            pdfWidth,
            totalHeightMm,
            undefined,
            "FAST"
          )
        }

        pdf.save(`orcamento-${budget.id}.pdf`)
      } else {
        const link = document.createElement("a")
        link.download = `orcamento-${budget.id}.png`
        link.href = dataUrl
        link.click()
      }

      element.style.height = originalHeight

    } catch (error) {
      console.error(error)
    } finally {
      setIsGenerating(false)
      setGenerationType(null)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="p-3 sm:p-4 border-b bg-white flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <Button variant="outline" onClick={onClose} size="sm">
          ← <span className="hidden sm:inline ml-1">Voltar</span>
        </Button>
        <div className="flex gap-2">
          <Button onClick={() => handleDownload("pdf")} disabled={isGenerating} size="sm">
            {isGenerating && generationType === "pdf"
              ? <Loader2 className="animate-spin" size={16}/>
              : <FileDown size={16}/>
            }
            <span className="ml-2">PDF</span>
          </Button>
          <Button onClick={() => handleDownload("image")} variant="secondary" disabled={isGenerating} size="sm">
            <ImageIcon size={16}/>
            <span className="ml-2 hidden sm:inline">Imagem</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center p-4 sm:p-6 overflow-x-hidden">
        <div className="w-full flex justify-center overflow-visible py-4">
          <div 
            className="origin-top shadow-2xl transition-transform duration-300 sm:scale-100 scale-[0.45] min-[400px]:scale-[0.5] min-[500px]:scale-[0.65] min-[600px]:scale-[0.75] min-[700px]:scale-[0.9]"
            style={{ width: "794px" }}
          >
            <div 
              ref={printRef} 
              style={{ 
                width: "794px", 
                minHeight: "1123px", 
                backgroundColor: "#ffffff", 
                display: "flex", 
                flexDirection: "column",
              }}
              className="relative"
            >

              {/* --- CABEÇALHO --- */}
              <div className={`bg-gradient-to-r ${themeColor} text-white p-8`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-inner flex-shrink-0">
                      {logo ? <img src={logo} className="max-w-full max-h-full object-contain p-1" /> : <Zap className={`${accentTextColor} w-8 h-8`} />}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight leading-none mb-1 uppercase">ORÇAMENTO</h1>
                      <div className="opacity-90 font-medium text-lg leading-snug">
                        {budget.companyName && <div className="uppercase">{budget.companyName}</div>}
                        {budget.companyCNPJ && <div className="text-sm opacity-80 mt-1">CNPJ/CPF: {budget.companyCNPJ}</div>}
                      </div>
                      <div className="mt-2 text-xs opacity-75 font-bold tracking-wider">
                        #{budget.id} | {new Date(budget.date).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                  </div>
                  <div className="text-right bg-white/20 px-4 py-2 rounded-lg border border-white/10">
                    <span className="text-xs uppercase font-bold opacity-80">Validade</span><br/>
                    <span className="font-bold text-lg">{budget.validity}</span>
                  </div>
                </div>
              </div>

              {/* --- DADOS CLIENTE --- */}
              <div className="p-8 border-b border-gray-100 flex flex-col gap-6">
                <div>
                  <h3 className={`${accentTextColor} font-bold mb-1 text-xs uppercase tracking-widest`}>
                    Dados do Cliente
                  </h3>
                  <p className="text-2xl font-bold text-slate-800 leading-tight uppercase">
                    {budget.client.name}
                  </p>
                  <p className="text-slate-500 font-medium">
                    {budget.client.phone}
                  </p>
                </div>

                {budget.description && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h3 className={`${accentTextColor} font-bold mb-2 text-xs uppercase tracking-widest`}>
                      Descrição dos Serviços
                    </h3>
                    <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed italic">
                      "{budget.description}"
                    </p>
                  </div>
                )}
              </div>

              {/* --- CONTEÚDO --- */}
              <div className="flex-grow">
                {budget.services.length > 0 && (
                  <div className="p-8 pb-4">
                    <h3 className={`${accentTextColor} font-bold mb-4 text-xs uppercase tracking-widest`}>
                      Tabela de Serviços
                    </h3>

                    <div className="bg-slate-50 p-3 rounded-t-lg text-xs font-bold text-slate-500 grid grid-cols-4 uppercase">
                      <span>Descrição</span>
                      <span className="text-center">Qtd</span>
                      <span className="text-center">Unitário</span>
                      <span className="text-right">Total</span>
                    </div>

                    <div className="divide-y border-x border-b rounded-b-lg">
                      {budget.services.map(s => (
                        <div
                          key={s.id}
                          className="grid grid-cols-4 px-3 py-4 text-sm items-center"
                          style={{ breakInside: "avoid" }}
                        >
                          <span className="font-semibold text-slate-700 uppercase tracking-tight break-words pr-2">
                            {s.name}
                          </span>
                          <span className="text-center font-medium">{s.quantity}</span>
                          <span className="text-center text-slate-500">
                            {formatCurrency(s.unitPrice)}
                          </span>
                          <span className="text-right font-bold text-slate-900">
                            {formatCurrency(s.total)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {budget.materials.length > 0 && (
                  <div className="p-8 pt-4 pb-4">
                    <h3 className={`${accentTextColor} font-bold mb-4 text-xs uppercase tracking-widest`}>
                      Tabela de Materiais
                    </h3>

                    <div className="bg-slate-50 p-3 rounded-t-lg text-xs font-bold text-slate-500 grid grid-cols-4 uppercase">
                      <span>Descrição</span>
                      <span className="text-center">Qtd</span>
                      <span className="text-center">Unitário</span>
                      <span className="text-right">Total</span>
                    </div>

                    <div className="divide-y border-x border-b rounded-b-lg">
                      {budget.materials.map(m => (
                        <div
                          key={m.id}
                          className="grid grid-cols-4 px-3 py-4 text-sm items-center"
                          style={{ breakInside: "avoid" }}
                        >
                          <span className="font-semibold text-slate-700 uppercase tracking-tight break-words pr-2">
                            {m.name}
                          </span>
                          <span className="text-center font-medium">
                            {m.quantity} {m.unit}
                          </span>
                          <span className="text-center text-slate-500">
                            {formatCurrency(m.unitPrice)}
                          </span>
                          <span className="text-right font-bold text-slate-900">
                            {formatCurrency(m.total)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* --- RODAPÉ --- */}
              <div className="p-8 mt-auto">
                <div className="bg-green-600 text-white rounded-2xl p-8 flex justify-between items-center shadow-lg">
                  <div>
                    <p className="text-xs uppercase opacity-80 mb-1 font-bold tracking-wider">
                      Valor Total
                    </p>
                    <p className="text-5xl font-black tracking-tighter">
                      {formatCurrency(budget.grandTotal)}
                    </p>
                  </div>
                  <div className="text-right text-sm border-l border-white/20 pl-6 space-y-1">
                    <p className="uppercase text-[10px] opacity-70">Condições</p>
                    <p>Garantia: <b>{budget.warranty}</b></p>
                    <p>Pagamento: <b>{budget.paymentMethods}</b></p>
                  </div>
                </div>

                <div className={`${themeColor} bg-gradient-to-r text-white text-center p-5 text-xs font-bold uppercase tracking-widest mt-6 rounded-xl`}>
                  {budget.companyName || "Empresa Nome"} - Qualidade e Segurança
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
