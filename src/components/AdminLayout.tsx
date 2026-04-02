import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, ReactNode } from "react"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Carregando painel admin...</div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar Simples */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-8">
          Admin CMS
        </h2>
        <nav className="space-y-4 flex-1">
          <a href="/admin" className="block text-white/70 hover:text-white transition-colors">
            Dashboard
          </a>
          <a href="/admin/features" className="block text-white/70 hover:text-white transition-colors">
            Serviços
          </a>
        </nav>
        <button
          onClick={() => {
            import("next-auth/react").then((mod) => mod.signOut({ callbackUrl: "/" }))
          }}
          className="text-red-400 hover:text-red-300 transition-colors text-left"
        >
          Sair
        </button>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
