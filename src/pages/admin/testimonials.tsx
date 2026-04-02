import AdminLayout from "../../components/AdminLayout"
import { useState, useEffect, useRef } from "react"
import { Plus, Pencil, Trash2, X, Loader2, LayoutGrid, ChevronUp, ChevronDown, Save, Star } from "lucide-react"

interface Testimonial {
  id: string
  authorName: string
  authorRole: string
  content: string
  rating: number
  order?: number
}

interface SectionConfig {
  tagline: string
  title1: string
  titleHighlight: string
  description: string
}

interface FormData {
  authorName: string
  authorRole: string
  content: string
  rating: number
}

const emptyForm: FormData = { authorName: "", authorRole: "", content: "", rating: 5 }

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  // config state
  const [config, setConfig] = useState<SectionConfig>({
    tagline: "", title1: "", titleHighlight: "", description: ""
  })
  const [savingConfig, setSavingConfig] = useState(false)

  // modal / form state
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [error, setError] = useState("")
  const authorRef = useRef<HTMLInputElement>(null)

  const load = () => {
    setLoading(true)
    Promise.all([
      fetch("/api/testimonials").then(r => r.json()),
      fetch("/api/testimonials/config").then(r => r.json())
    ])
    .then(([testData, configData]) => {
      setTestimonials(Array.isArray(testData) ? testData : [])
      if (configData && !configData.error) {
        setConfig({
          tagline: configData.tagline,
          title1: configData.title1,
          titleHighlight: configData.titleHighlight,
          description: configData.description
        })
      }
    })
    .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])
  useEffect(() => {
    if (showForm) setTimeout(() => authorRef.current?.focus(), 50)
  }, [showForm])

  const handleSaveConfig = async () => {
    setSavingConfig(true)
    try {
      await fetch("/api/testimonials/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })
      alert("Textos atualizados!")
    } catch {
      alert("Erro ao atualizar textos.")
    } finally {
      setSavingConfig(false)
    }
  }

  const moveTestimonial = async (index: number, direction: 'up' | 'down') => {
    const newItems = [...testimonials]
    if (direction === 'up' && index > 0) {
      const temp = newItems[index]
      newItems[index] = newItems[index - 1]
      newItems[index - 1] = temp
    } else if (direction === 'down' && index < newItems.length - 1) {
      const temp = newItems[index]
      newItems[index] = newItems[index + 1]
      newItems[index + 1] = temp
    } else {
      return
    }
    
    setTestimonials(newItems)
  
    const ids = newItems.map(f => f.id)
    try {
      await fetch("/api/testimonials/reorder", {
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

  const openEdit = (f: Testimonial) => {
    setEditingId(f.id)
    setForm({ authorName: f.authorName, authorRole: f.authorRole, content: f.content, rating: f.rating })
    setError("")
    setShowForm(true)
  }

  const closeForm = () => { setShowForm(false); setError("") }

  const handleSave = async () => {
    if (!form.authorName.trim() || !form.content.trim()) {
      setError("Nome e depoimento são obrigatórios.")
      return
    }
    setSaving(true)
    setError("")
    try {
      const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials"
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
    if (!confirm("Tem certeza que deseja excluir este depoimento?")) return
    setDeleting(id)
    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
      setTestimonials((prev) => prev.filter((f) => f.id !== id))
    } finally {
      setDeleting(null)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Configuration */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Textos da Seção</h1>
              <p className="text-white/50">Edite as manchetes e descrições do cabeçalho de Depoimentos.</p>
            </div>
            <button
              onClick={handleSaveConfig}
              disabled={savingConfig || loading}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-medium transition-all"
            >
              {savingConfig ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Salvar Textos
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-1.5">Tagline (Laranja)</label>
              <input
                type="text"
                value={config.tagline}
                onChange={e => setConfig({...config, tagline: e.target.value})}
                className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-2 outline-none focus:border-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Título Branco</label>
              <input
                type="text"
                value={config.title1}
                onChange={e => setConfig({...config, title1: e.target.value})}
                className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-2 outline-none focus:border-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Título Laranja (Final)</label>
              <input
                type="text"
                value={config.titleHighlight}
                onChange={e => setConfig({...config, titleHighlight: e.target.value})}
                className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-2 outline-none focus:border-blue-500/50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-1.5">Descrição/Subtítulo</label>
              <textarea
                value={config.description}
                onChange={e => setConfig({...config, description: e.target.value})}
                className="w-full bg-[#111] border border-white/10 text-white rounded-xl px-4 py-2 outline-none focus:border-blue-500/50 resize-none h-20"
              />
            </div>
          </div>
        </div>

        {/* List */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Itens de Depoimentos</h1>
              <p className="text-white/50">Gerencie e ordene os depoimentos de clientes exibidos no site.</p>
            </div>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-3 rounded-xl font-medium transition-all shadow-lg shadow-orange-500/20"
            >
              <Plus className="w-4 h-4" />
              Novo Depoimento
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-white/40">
              <Loader2 className="w-8 h-8 animate-spin mr-3" />
              Carregando...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/40 border border-dashed border-white/20 rounded-2xl">
              <LayoutGrid className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-medium">Nenhum depoimento cadastrado</p>
              <p className="text-sm mt-1">Clique em "Novo Depoimento" para começar.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {testimonials.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-white/8 transition-colors group relative"
                >
                  <div className="flex flex-row md:flex-col gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button disabled={idx === 0} onClick={() => moveTestimonial(idx, 'up')} className="text-white/40 hover:text-white disabled:opacity-20 flex pt-2 md:pt-0" title="Mover para cima"><ChevronUp size={16} /></button>
                    <button disabled={idx === testimonials.length - 1} onClick={() => moveTestimonial(idx, 'down')} className="text-white/40 hover:text-white disabled:opacity-20 flex pb-2 md:pb-0" title="Mover para baixo"><ChevronDown size={16} /></button>
                  </div>
                  
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 font-bold border border-white/10 flex items-center justify-center flex-shrink-0 uppercase">
                    {item.authorName.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate items-center flex gap-3">
                      {item.authorName}
                      <span className="text-xs text-white/40 font-normal">{item.authorRole}</span>
                    </h3>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < item.rating ? "text-orange-500 fill-orange-500" : "text-white/20"}`} />
                      ))}
                    </div>
                    <p className="text-white/50 text-sm mt-0.5 line-clamp-2 md:line-clamp-1 italic">"{item.content}"</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 self-end md:self-center mt-2 md:mt-0">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-2 rounded-lg text-white/60 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deleting === item.id}
                      className="p-2 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                      title="Excluir"
                    >
                      {deleting === item.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal / Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeForm}
          />

          <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Editar Depoimento" : "Novo Depoimento"}
              </h2>
              <button
                onClick={closeForm}
                className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-6">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-1.5">Nome do Cliente *</label>
                <input
                  ref={authorRef}
                  type="text"
                  value={form.authorName}
                  onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500/50"
                  placeholder="Ex: Rafael Mendes"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Cargo / Empresa</label>
                <input
                  type="text"
                  value={form.authorRole}
                  onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500/50"
                  placeholder="Ex: CEO, Mendes Investimentos"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Nota (Estrelas)</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 appearance-none"
                >
                  <option value="5">5 estrelas</option>
                  <option value="4">4 estrelas</option>
                  <option value="3">3 estrelas</option>
                  <option value="2">2 estrelas</option>
                  <option value="1">1 estrela</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-1.5">Depoimento *</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 resize-none h-32"
                  placeholder="Ex: A agência transformou completamente a nossa presença digital..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={closeForm}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                Salvar Depoimento
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
