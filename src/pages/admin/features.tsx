import AdminLayout from "../../components/AdminLayout"
import { useState, useEffect, useRef } from "react"
import { Plus, Pencil, Trash2, X, Check, Loader2, LayoutGrid, ChevronUp, ChevronDown } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface Feature {
  id: string
  title: string
  description: string
  icon: string
  highlight: boolean
  order?: number
  createdAt?: string
}

const ICON_OPTIONS = [
  "Check", "Star", "Zap", "Globe", "Shield", "Rocket", "Code2", "Cpu",
  "Users", "BarChart2", "Award", "Target", "Lightbulb", "Lock", "Bolt", "Layers"
]

interface FormData {
  title: string
  description: string
  icon: string
  highlight: boolean
}

const emptyForm: FormData = { title: "", description: "", icon: "Check", highlight: false }

export default function AdminFeatures() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  // modal / form state
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [error, setError] = useState("")
  const titleRef = useRef<HTMLInputElement>(null)

  const load = () => {
    setLoading(true)
    fetch("/api/features")
      .then((r) => r.json())
      .then((d) => setFeatures(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])
  useEffect(() => {
    if (showForm) setTimeout(() => titleRef.current?.focus(), 50)
  }, [showForm])

  const moveFeature = async (index: number, direction: 'up' | 'down') => {
    const newFeatures = [...features]
    if (direction === 'up' && index > 0) {
      const temp = newFeatures[index]
      newFeatures[index] = newFeatures[index - 1]
      newFeatures[index - 1] = temp
    } else if (direction === 'down' && index < newFeatures.length - 1) {
      const temp = newFeatures[index]
      newFeatures[index] = newFeatures[index + 1]
      newFeatures[index + 1] = temp
    } else {
      return
    }
    
    setFeatures(newFeatures)
  
    const ids = newFeatures.map(f => f.id)
    try {
      await fetch("/api/features/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      })
    } catch(e) {
      console.error(e)
    }
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError("")
    setShowForm(true)
  }

  const openEdit = (f: Feature) => {
    setEditingId(f.id)
    setForm({ title: f.title, description: f.description, icon: f.icon, highlight: f.highlight })
    setError("")
    setShowForm(true)
  }

  const closeForm = () => { setShowForm(false); setError("") }

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError("Título e descrição são obrigatórios.")
      return
    }
    setSaving(true)
    setError("")
    try {
      const url = editingId ? `/api/features/${editingId}` : "/api/features"
      const method = editingId ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      closeForm()
      load()
    } catch {
      setError("Erro ao salvar. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta feature?")) return
    setDeleting(id)
    try {
      await fetch(`/api/features/${id}`, { method: "DELETE" })
      setFeatures((prev) => prev.filter((f) => f.id !== id))
    } finally {
      setDeleting(null)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Features</h1>
            <p className="text-white/50">Gerencie os itens exibidos na seção de features do site. Altere a ordem usando as setas para cima ou para baixo.</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            Nova Feature
          </button>
        </div>

        {/* Feature List */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-white/40">
            <Loader2 className="w-8 h-8 animate-spin mr-3" />
            Carregando...
          </div>
        ) : features.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/40 border border-dashed border-white/20 rounded-2xl">
            <LayoutGrid className="w-12 h-12 mb-4 opacity-50" />
            <p className="font-medium">Nenhuma feature cadastrada</p>
            <p className="text-sm mt-1">Clique em "Nova Feature" para começar.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {features.map((feature, idx) => {
              const IconComp = (LucideIcons as any)[feature.icon] || LucideIcons.Check
              return (
                <div
                  key={feature.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/8 transition-colors group relative"
                >
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button disabled={idx === 0} onClick={() => moveFeature(idx, 'up')} className="text-white/40 hover:text-white disabled:opacity-20" title="Mover para cima"><ChevronUp size={16} /></button>
                    <button disabled={idx === features.length - 1} onClick={() => moveFeature(idx, 'down')} className="text-white/40 hover:text-white disabled:opacity-20" title="Mover para baixo"><ChevronDown size={16} /></button>
                  </div>
                  
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate flex items-center gap-3">
                      {feature.title}
                      {feature.highlight && (
                        <span className="bg-[#F97316] text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </h3>
                    <p className="text-white/50 text-sm mt-0.5 line-clamp-2">{feature.description}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      onClick={() => openEdit(feature)}
                      className="p-2 rounded-lg text-white/60 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(feature.id)}
                      disabled={deleting === feature.id}
                      className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                      title="Excluir"
                    >
                      {deleting === feature.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal / Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeForm}
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-6">
            {/* Modal header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Editar Feature" : "Nova Feature"}
              </h2>
              <button
                onClick={closeForm}
                className="text-white/40 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Título *</label>
                <input
                  ref={titleRef}
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Performance Otimizada"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-white/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Descrição *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Descreva esta feature em uma ou duas frases..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 placeholder-white/20 transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Ícone (Lucide)</label>
                <div className="grid grid-cols-8 gap-2 p-3 bg-white/5 border border-white/10 rounded-xl max-h-36 overflow-y-auto">
                  {ICON_OPTIONS.map((icon) => {
                    const DynIcon = (LucideIcons as any)[icon] || LucideIcons.Check
                    return (
                      <button
                        key={icon}
                        title={icon}
                        onClick={() => setForm({ ...form, icon })}
                        className={`h-9 rounded-lg text-xs flex items-center justify-center transition-all ${
                          form.icon === icon
                            ? "bg-blue-500 text-white"
                            : "text-white/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <DynIcon className="w-5 h-5" />
                      </button>
                    )
                  })}
                </div>
                <p className="text-white/30 text-xs mt-1.5">
                  Ícone selecionado: <span className="text-white/60">{form.icon}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mt-2 cursor-pointer" onClick={() => setForm({ ...form, highlight: !form.highlight })}>
                <input 
                  type="checkbox" 
                  checked={form.highlight} 
                  onChange={() => {}} 
                  className="w-5 h-5 rounded accent-[#F97316] outline-none cursor-pointer"
                />
                <div>
                  <p className="text-white font-medium text-sm">Destacar como Popular</p>
                  <p className="text-white/50 text-xs">Aplica um glow laranja e a tag POPULAR.</p>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeForm}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</>
                ) : (
                  <><Check className="w-4 h-4" /> {editingId ? "Salvar alterações" : "Criar feature"}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

