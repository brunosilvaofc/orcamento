"use client"

import { Card } from "@/components/ui/card"
import { Paintbrush } from "lucide-react"

interface ColorPickerProps {
  color: string
  onColorChange: (color: string) => void
}

const colors = [
  { name: "Azul", value: "from-blue-700 to-blue-500", bg: "bg-blue-600" },
  { name: "Verde", value: "from-emerald-700 to-emerald-500", bg: "bg-emerald-600" },
  { name: "Vermelho", value: "from-red-700 to-red-500", bg: "bg-red-600" },
  { name: "Laranja", value: "from-orange-600 to-orange-400", bg: "bg-orange-500" },
  { name: "Preto", value: "from-slate-900 to-slate-700", bg: "bg-slate-800" },
  { name: "Roxo", value: "from-purple-700 to-purple-500", bg: "bg-purple-600" },
]

export function ColorPicker({ color, onColorChange }: ColorPickerProps) {
  return (
    <Card className="p-4">
      <h2 className="font-semibold text-foreground flex items-center gap-2 mb-3">
        <Paintbrush className="w-4 h-4 text-primary" />
        Cor do Orçamento
      </h2>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c.value}
            onClick={() => onColorChange(c.value)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              color === c.value ? "border-primary scale-110 shadow-md" : "border-transparent opacity-70"
            } ${c.bg}`}
            title={c.name}
          />
        ))}
      </div>
    </Card>
  )
}