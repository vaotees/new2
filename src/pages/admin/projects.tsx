import AdminLayout from "../../components/AdminLayout"
import { useState, useEffect, useRef } from "react"
import {
  Plus, Pencil, Trash2, X, Check, Loader2, ChevronUp, ChevronDown,
  ExternalLink, Eye, EyeOff, Building2, Image, Tag, FileText,
  Lightbulb, Save, RefreshCw, AlertCircle
} from "lucide-react"
import * as LucideIcons from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   Types
──────────────────────────────────────────────────────────────*/
interface Highlight {
  id?: string
  iconName: string
  title: string
  body: string
  order?: number
}

interface ClientProject {
  id: string
  slug: string
  order?: number
  category: string
  clientName: string
  tagline: string
  description: string
  role: string
  status: string
  year: string
  liveUrl: string
  caseUrl: string
  mockupUrl?: string | null
  stackTags: string
  challengeText: string
  solutionText: string
  impactText: string
  published: boolean
  highlights: Highlight[]
  createdAt?: string
}

const ICON_OPTIONS = [
  "Zap", "Search", "ShieldCheck", "Layers", "Server", "Cloud",
  "Star", "Rocket", "Code2", "Globe", "Users", "BarChart2",
  "Award", "Target", "Lightbulb", "Lock", "Package", "Cpu",
  "Building2", "Image", "MessageSquare", "CheckCircle2", "ArrowRight",
  "TrendingUp", "Database", "Settings", "Monitor", "Smartphone"
]

const emptyHighlight = (): Highlight => ({ iconName: "Zap", title: "", body: "" })

const emptyForm = (): Omit<ClientProject, "id" | "order" | "createdAt"> => ({
  slug: "",
  category: "",
  clientName: "",
  tagline: "",
  description: "",
  role: "",
  status: "Em Produção",
  year: new Date().getFullYear().toString(),
  liveUrl: "",
  caseUrl: "",
  mockupUrl: "",
  stackTags: "",
  challengeText: "",
  solutionText: "",
  impactText: "",
  published: true,
  highlights: [emptyHighlight()],
})

/* ─────────────────────────────────────────────────────────────
   Tabs
──────────────────────────────────────────────────────────────*/
const TABS = [
  { id: "info", label: "Informações", icon: Building2 },
  { id: "content", label: "Conteúdo", icon: FileText },
  { id: "highlights", label: "Destaques", icon: Lightbulb },
  { id: "media", label: "Mídia & Links", icon: Image },
]

/* ─────────────────────────────────────────────────────────────
   Field helpers
──────────────────────────────────────────────────────────────*/
function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-1.5 font-medium">{label}</label>
      {children}
      {hint && <p className="text-white/30 text-xs mt-1">{hint}</p>}
    </div>
  )
}

function Input({
  value, onChange, placeholder, disabled
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none
        focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 placeholder-white/20
        transition-all disabled:opacity-40 disabled:cursor-not-allowed"
    />
  )
}

function Textarea({
  value, onChange, placeholder, rows = 4
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 outline-none
        focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 placeholder-white/20
        transition-all resize-none"
    />
  )
}

/* ─────────────────────────────────────────────────────────────
   Icon picker
──────────────────────────────────────────────────────────────*/
function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-8 gap-1.5 p-3 bg-white/5 border border-white/10 rounded-xl max-h-40 overflow-y-auto">
      {ICON_OPTIONS.map(icon => {
        const Ic = (LucideIcons as any)[icon] || LucideIcons.Zap
        return (
          <button
            key={icon}
            title={icon}
            type="button"
            onClick={() => onChange(icon)}
            className={`h-9 rounded-lg flex items-center justify-center transition-all ${
              value === icon
                ? "bg-orange-500 text-white"
                : "text-white/40 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Ic className="w-4 h-4" />
          </button>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main Page
──────────────────────────────────────────────────────────────*/
export default function AdminProjects() {
  const [projects, setProjects] = useState<ClientProject[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)

  // drawer / form
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm())
  const [activeTab, setActiveTab] = useState("info")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const nameRef = useRef<HTMLInputElement>(null)

  /* ── Load ──────────────────────────────── */
  const load = () => {
    setLoading(true)
    fetch("/api/projects")
      .then(r => r.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])
  useEffect(() => {
    if (drawerOpen) setTimeout(() => nameRef.current?.focus(), 80)
  }, [drawerOpen])

  /* ── Drawer helpers ─────────────────────── */
  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm())
    setError("")
    setSuccess("")
    setActiveTab("info")
    setDrawerOpen(true)
  }

  const openEdit = (p: ClientProject) => {
    setEditingId(p.id)
    setForm({
      slug: p.slug,
      category: p.category,
      clientName: p.clientName,
      tagline: p.tagline,
      description: p.description,
      role: p.role,
      status: p.status,
      year: p.year,
      liveUrl: p.liveUrl,
      caseUrl: p.caseUrl,
      mockupUrl: p.mockupUrl || "",
      stackTags: p.stackTags,
      challengeText: p.challengeText,
      solutionText: p.solutionText,
      impactText: p.impactText,
      published: p.published,
      highlights: p.highlights.length ? p.highlights : [emptyHighlight()],
    })
    setError("")
    setSuccess("")
    setActiveTab("info")
    setDrawerOpen(true)
  }

  const closeDrawer = () => { setDrawerOpen(false); setError(""); setSuccess("") }

  /* ── Save ─────────────────────────────────*/
  const handleSave = async () => {
    if (!form.clientName.trim() || !form.slug.trim()) {
      setError("Nome do cliente e slug são obrigatórios.")
      setActiveTab("info")
      return
    }
    setSaving(true); setError(""); setSuccess("")
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects"
      const method = editingId ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erro desconhecido")
      setSuccess("Projeto salvo com sucesso!")
      load()
      setTimeout(closeDrawer, 800)
    } catch (err: any) {
      setError(err.message || "Erro ao salvar. Tente novamente.")
    } finally {
      setSaving(false)
    }
  }

  /* ── Delete ───────────────────────────────*/
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Excluir o projeto "${name}"? Esta ação não pode ser desfeita.`)) return
    setDeleting(id)
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch { alert("Erro ao excluir.") }
    finally { setDeleting(null) }
  }

  /* ── Toggle published ─────────────────── */
  const handleToggle = async (p: ClientProject) => {
    setToggling(p.id)
    try {
      await fetch(`/api/projects/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, published: !p.published }),
      })
      setProjects(prev => prev.map(x => x.id === p.id ? { ...x, published: !x.published } : x))
    } catch { alert("Erro ao alternar visibilidade.") }
    finally { setToggling(null) }
  }

  /* ── Reorder ──────────────────────────── */
  const reorder = async (idx: number, dir: "up" | "down") => {
    const arr = [...projects]
    if (dir === "up" && idx === 0) return
    if (dir === "down" && idx === arr.length - 1) return
    const swap = dir === "up" ? idx - 1 : idx + 1
    const tmp = arr[idx]; arr[idx] = arr[swap]; arr[swap] = tmp
    setProjects(arr)
    try {
      await fetch("/api/projects/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: arr.map(p => p.id) }),
      })
    } catch (e) { console.error(e) }
  }

  /* ── Highlight helpers ─────────────────── */
  const setHL = (idx: number, field: keyof Highlight, val: string) => {
    const hs = [...form.highlights]
    hs[idx] = { ...hs[idx], [field]: val }
    setForm({ ...form, highlights: hs })
  }
  const addHL = () => setForm({ ...form, highlights: [...form.highlights, emptyHighlight()] })
  const removeHL = (idx: number) => {
    if (form.highlights.length === 1) return
    setForm({ ...form, highlights: form.highlights.filter((_, i) => i !== idx) })
  }
  const moveHL = (idx: number, dir: "up" | "down") => {
    const hs = [...form.highlights]
    if (dir === "up" && idx === 0) return
    if (dir === "down" && idx === hs.length - 1) return
    const swap = dir === "up" ? idx - 1 : idx + 1
    const tmp = hs[idx]; hs[idx] = hs[swap]; hs[swap] = tmp
    setForm({ ...form, highlights: hs })
  }

  /* ── Auto-slug ────────────────────────── */
  const autoSlug = (name: string) =>
    name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim().replace(/\s+/g, "-")

  /* ─────────────────────────────────────────
     Render
  ──────────────────────────────────────────*/
  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">

        {/* ── Page header ──────────────────────── */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Projetos de Clientes</h1>
            <p className="text-white/50">
              Gerencie todos os cases exibidos na página /casos e nos case studies.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              disabled={loading}
              className="p-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
              title="Recarregar"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600
                hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl
                font-semibold text-sm transition-all shadow-lg shadow-orange-500/20"
            >
              <Plus className="w-4 h-4" />
              Novo Projeto
            </button>
          </div>
        </div>

        {/* ── Stats ────────────────────────────── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total de Projetos", value: projects.length },
            { label: "Publicados", value: projects.filter(p => p.published).length },
            { label: "Rascunhos", value: projects.filter(p => !p.published).length },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <p className="text-white/50 text-sm mb-1">{s.label}</p>
              <p className="text-3xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Projects list ────────────────────── */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-white/40">
            <Loader2 className="w-8 h-8 animate-spin mr-3" />
            Carregando projetos...
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-white/40
            border border-dashed border-white/15 rounded-2xl gap-4"
          >
            <Building2 className="w-14 h-14 opacity-40" />
            <div className="text-center">
              <p className="font-semibold text-lg">Nenhum projeto cadastrado</p>
              <p className="text-sm mt-1">Clique em "Novo Projeto" para começar.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project, idx) => {
              const isDeleting = deleting === project.id
              const isToggling = toggling === project.id
              return (
                <div
                  key={project.id}
                  className={`bg-white/5 border rounded-2xl p-5 flex items-center gap-4
                    hover:bg-white/8 transition-all group relative
                    ${project.published ? "border-white/10" : "border-white/5 opacity-60"}`}
                >
                  {/* Order controls */}
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => reorder(idx, "up")} disabled={idx === 0}
                      className="text-white/40 hover:text-white disabled:opacity-20 transition-colors">
                      <ChevronUp size={15} />
                    </button>
                    <button onClick={() => reorder(idx, projects.length - 1)} disabled={idx === projects.length - 1}
                      className="text-white/40 hover:text-white disabled:opacity-20 transition-colors">
                      <ChevronDown size={15} />
                    </button>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10
                    border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-orange-400" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-white truncate">{project.clientName}</h3>
                      {!project.published && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white/50 uppercase tracking-wider">
                          Rascunho
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm truncate">
                      <span className="text-orange-400/70">{project.category}</span>
                      {project.category && project.tagline ? " · " : ""}
                      {project.tagline}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-white/30 text-xs font-mono">/{project.slug}</span>
                      {project.highlights.length > 0 && (
                        <span className="text-white/25 text-xs">
                          {project.highlights.length} destaques
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="hidden lg:flex flex-wrap gap-1.5 max-w-[200px]">
                    {project.stackTags.split(",").filter(Boolean).slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5
                        border border-white/10 text-white/40">
                        {t.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        title="Ver ao vivo">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleToggle(project)}
                      disabled={isToggling}
                      className="p-2 rounded-lg text-white/40 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                      title={project.published ? "Despublicar" : "Publicar"}
                    >
                      {isToggling
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : project.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => openEdit(project)}
                      className="p-2 rounded-lg text-white/40 hover:text-orange-400 hover:bg-orange-500/10 transition-all"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id, project.clientName)}
                      disabled={isDeleting}
                      className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                      title="Excluir"
                    >
                      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          DRAWER / FORM PANEL
      ═══════════════════════════════════════════ */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Slide-in panel */}
          <div className="relative ml-auto w-full max-w-2xl h-full bg-[#0d0d0d] border-l border-white/10
            flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-white/10 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingId ? "Editar Projeto" : "Novo Projeto de Cliente"}
                </h2>
                {form.clientName && (
                  <p className="text-white/40 text-sm mt-0.5">{form.clientName}</p>
                )}
              </div>
              <button onClick={closeDrawer} className="text-white/40 hover:text-white transition-colors p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 flex-shrink-0">
              {TABS.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all relative
                      ${activeTab === tab.id
                        ? "text-orange-400"
                        : "text-white/40 hover:text-white/70"}`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-t-full" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-5">

              {/* ── TAB: Informações ──────────────── */}
              {activeTab === "info" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Nome do Cliente *">
                      <input
                        ref={nameRef}
                        type="text"
                        value={form.clientName}
                        onChange={e => {
                          const v = e.target.value
                          setForm(f => ({
                            ...f,
                            clientName: v,
                            slug: editingId ? f.slug : autoSlug(v)
                          }))
                        }}
                        placeholder="Ex: CM Imóveis"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5
                          outline-none focus:border-orange-500/50 placeholder-white/20 transition-all"
                      />
                    </Field>
                    <Field label="Slug (URL) *" hint="Gerado automaticamente. Edite se necessário.">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">/</span>
                        <input
                          type="text"
                          value={form.slug}
                          onChange={e => setForm(f => ({ ...f, slug: autoSlug(e.target.value) }))}
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-6 pr-4 py-2.5
                            outline-none focus:border-orange-500/50 placeholder-white/20 transition-all font-mono text-sm"
                        />
                      </div>
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Categoria">
                      <Input value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} placeholder="Ex: Plataforma Imobiliária" />
                    </Field>
                    <Field label="Tagline">
                      <Input value={form.tagline} onChange={v => setForm(f => ({ ...f, tagline: v }))} placeholder="Ex: Full-Stack & CRM" />
                    </Field>
                  </div>

                  <Field label="Descrição do Card (Resumo)">
                    <Textarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))}
                      placeholder="Resumo exibido no card do portfólio..." rows={3} />
                  </Field>

                  <Field label="Papel / Role">
                    <Input value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))} placeholder="Ex: Senior Design Engineer (UI/UX, Front-end & Back-end)" />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Ano">
                      <Input value={form.year} onChange={v => setForm(f => ({ ...f, year: v }))} placeholder="2024" />
                    </Field>
                    <Field label="Status">
                      <select
                        value={form.status}
                        onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5
                          outline-none focus:border-orange-500/50 transition-all"
                      >
                        {["Em Produção", "Em Desenvolvimento", "Concluído", "Arquivado"].map(s => (
                          <option key={s} value={s} className="bg-[#111]">{s}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Stack (tags separadas por vírgula)">
                    <Input value={form.stackTags} onChange={v => setForm(f => ({ ...f, stackTags: v }))}
                      placeholder="Next.js, Neon Postgres, Google Auth, Framer Motion" />
                  </Field>

                  {/* Published toggle */}
                  <div
                    className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer"
                    onClick={() => setForm(f => ({ ...f, published: !f.published }))}
                  >
                    <div className={`w-10 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                      form.published ? "bg-emerald-500" : "bg-white/20"}`}>
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                        form.published ? "left-5" : "left-1"}`} />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">
                        {form.published ? "Publicado" : "Rascunho"}
                      </p>
                      <p className="text-white/40 text-xs">
                        {form.published ? "Visível na página /casos" : "Oculto ao público"}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* ── TAB: Conteúdo ─────────────────── */}
              {activeTab === "content" && (
                <>
                  <div className="text-white/40 text-xs mb-2 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" />
                    Textos exibidos na página de case study detalhada.
                  </div>

                  <Field label="🎯 O Desafio">
                    <Textarea value={form.challengeText} onChange={v => setForm(f => ({ ...f, challengeText: v }))}
                      placeholder="Descreva o problema/desafio que o cliente enfrentava..." rows={5} />
                  </Field>

                  <Field label="💡 A Solução">
                    <Textarea value={form.solutionText} onChange={v => setForm(f => ({ ...f, solutionText: v }))}
                      placeholder="Como você solucionou o problema..." rows={5} />
                  </Field>

                  <Field label="📈 O Impacto">
                    <Textarea value={form.impactText} onChange={v => setForm(f => ({ ...f, impactText: v }))}
                      placeholder="Quais foram os resultados e impactos alcançados..." rows={4} />
                  </Field>
                </>
              )}

              {/* ── TAB: Destaques ────────────────── */}
              {activeTab === "highlights" && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white/40 text-xs flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5" />
                      Itens do Bento Grid na página de case study.
                    </p>
                    <button
                      onClick={addHL}
                      className="flex items-center gap-1.5 text-xs font-medium text-orange-400
                        hover:text-orange-300 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Adicionar destaque
                    </button>
                  </div>

                  <div className="space-y-5">
                    {form.highlights.map((hl, idx) => (
                      <div key={idx}
                        className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 relative">
                        {/* Header row */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-white/30">
                            Destaque {idx + 1}
                          </span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => moveHL(idx, "up")} disabled={idx === 0}
                              className="p-1 text-white/30 hover:text-white disabled:opacity-20 transition-colors">
                              <ChevronUp size={14} />
                            </button>
                            <button onClick={() => moveHL(idx, "down")} disabled={idx === form.highlights.length - 1}
                              className="p-1 text-white/30 hover:text-white disabled:opacity-20 transition-colors">
                              <ChevronDown size={14} />
                            </button>
                            <button onClick={() => removeHL(idx)}
                              disabled={form.highlights.length === 1}
                              className="p-1 text-white/30 hover:text-red-400 disabled:opacity-20 transition-colors ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        </div>

                        <Field label="Ícone">
                          <IconPicker value={hl.iconName} onChange={v => setHL(idx, "iconName", v)} />
                          <p className="text-white/30 text-xs mt-1">Selecionado: <span className="text-white/50">{hl.iconName}</span></p>
                        </Field>

                        <Field label="Título do Destaque">
                          <Input value={hl.title} onChange={v => setHL(idx, "title", v)} placeholder="Ex: Engenharia de Busca Inteligente" />
                        </Field>

                        <Field label="Descrição do Destaque">
                          <Textarea value={hl.body} onChange={v => setHL(idx, "body", v)}
                            placeholder="Descrição detalhada do que foi construído/implementado..." rows={3} />
                        </Field>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ── TAB: Mídia & Links ────────────── */}
              {activeTab === "media" && (
                <>
                  <div className="text-white/40 text-xs mb-2 flex items-center gap-2">
                    <Image className="w-3.5 h-3.5" />
                    Links e imagem de mockup do projeto.
                  </div>

                  <Field label="URL do Projeto Ao Vivo">
                    <div className="relative">
                      <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="url"
                        value={form.liveUrl}
                        onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))}
                        placeholder="https://cliente.vercel.app"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-2.5
                          outline-none focus:border-orange-500/50 placeholder-white/20 transition-all"
                      />
                    </div>
                  </Field>

                  <Field label="URL da Página de Case (interna)" hint="Deixe em branco para usar /cases/{slug} automaticamente.">
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="text"
                        value={form.caseUrl}
                        onChange={e => setForm(f => ({ ...f, caseUrl: e.target.value }))}
                        placeholder={`/cases/${form.slug || "seu-projeto"}`}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-2.5
                          outline-none focus:border-orange-500/50 placeholder-white/20 transition-all"
                      />
                    </div>
                  </Field>

                  <Field
                    label="URL do Mockup / Imagem de Capa"
                    hint="Cole a URL de uma imagem hospedada (Google Cloud, Imgur, etc.) ou suba via painel."
                  >
                    <Textarea
                      value={form.mockupUrl || ""}
                      onChange={v => setForm(f => ({ ...f, mockupUrl: v }))}
                      placeholder="https://storage.googleapis.com/.../mockup.png"
                      rows={2}
                    />
                  </Field>

                  {/* Mockup preview */}
                  {form.mockupUrl && (
                    <div className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-white/5">
                      <img
                        src={form.mockupUrl}
                        alt="Mockup preview"
                        className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Feedback messages */}
            {(error || success) && (
              <div className={`mx-7 mb-4 rounded-xl px-4 py-3 flex items-center gap-2.5 text-sm ${
                error
                  ? "bg-red-500/10 border border-red-500/20 text-red-400"
                  : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              }`}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error || success}
              </div>
            )}

            {/* Drawer footer */}
            <div className="flex gap-3 px-7 py-5 border-t border-white/10 flex-shrink-0">
              <button
                onClick={closeDrawer}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/60
                  hover:text-white hover:border-white/30 font-medium text-sm transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600
                  hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-sm
                  transition-all flex items-center justify-center gap-2 disabled:opacity-60
                  shadow-lg shadow-orange-500/20"
              >
                {saving
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</>
                  : <><Save className="w-4 h-4" /> {editingId ? "Salvar alterações" : "Criar projeto"}</>
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
