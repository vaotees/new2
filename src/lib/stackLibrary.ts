/* ─────────────────────────────────────────────────────────────
   Stack Library — shared between admin and public pages
   Each entry: name (stored value), category, brand color,
   foreground color, and short abbreviation shown inside badge.
──────────────────────────────────────────────────────────────*/

export interface StackDef {
  name: string
  category: string
  color: string   // brand background color
  fg: string      // text/icon color on that background
  abbr: string    // short code shown in the badge (1–3 chars)
}

export const STACK_LIBRARY: StackDef[] = [
  // ── Frameworks ───────────────────────────────────────────
  { name: "Next.js",      category: "Framework",      color: "#000000", fg: "#ffffff", abbr: "N↑"  },
  { name: "React",        category: "Framework",      color: "#61DAFB", fg: "#000000", abbr: "⚛"   },
  { name: "Vue.js",       category: "Framework",      color: "#42b883", fg: "#ffffff", abbr: "V"   },
  { name: "Nuxt.js",      category: "Framework",      color: "#00DC82", fg: "#000000", abbr: "Nu"  },
  { name: "Svelte",       category: "Framework",      color: "#FF3E00", fg: "#ffffff", abbr: "Sv"  },
  { name: "SvelteKit",    category: "Framework",      color: "#FF3E00", fg: "#ffffff", abbr: "SK"  },
  { name: "Angular",      category: "Framework",      color: "#DD0031", fg: "#ffffff", abbr: "A"   },
  { name: "Remix",        category: "Framework",      color: "#121212", fg: "#ffffff", abbr: "Rm"  },
  { name: "Astro",        category: "Framework",      color: "#FF5D01", fg: "#ffffff", abbr: "As"  },
  { name: "Gatsby",       category: "Framework",      color: "#663399", fg: "#ffffff", abbr: "Gs"  },
  { name: "Expo",         category: "Framework",      color: "#000020", fg: "#ffffff", abbr: "Ex"  },
  { name: "React Native", category: "Framework",      color: "#61DAFB", fg: "#000000", abbr: "RN"  },

  // ── Linguagens ───────────────────────────────────────────
  { name: "TypeScript",   category: "Linguagem",      color: "#3178C6", fg: "#ffffff", abbr: "TS"  },
  { name: "JavaScript",   category: "Linguagem",      color: "#F7DF1E", fg: "#000000", abbr: "JS"  },
  { name: "Python",       category: "Linguagem",      color: "#3776AB", fg: "#ffffff", abbr: "Py"  },
  { name: "Go",           category: "Linguagem",      color: "#00ADD8", fg: "#ffffff", abbr: "Go"  },
  { name: "Rust",         category: "Linguagem",      color: "#CE4A22", fg: "#ffffff", abbr: "Rs"  },
  { name: "PHP",          category: "Linguagem",      color: "#777BB4", fg: "#ffffff", abbr: "PHP" },
  { name: "Ruby",         category: "Linguagem",      color: "#CC342D", fg: "#ffffff", abbr: "Rb"  },
  { name: "Swift",        category: "Linguagem",      color: "#F05138", fg: "#ffffff", abbr: "Sw"  },
  { name: "Kotlin",       category: "Linguagem",      color: "#7F52FF", fg: "#ffffff", abbr: "Kt"  },

  // ── Banco de Dados ───────────────────────────────────────
  { name: "PostgreSQL",   category: "Banco de Dados", color: "#4169E1", fg: "#ffffff", abbr: "PG"  },
  { name: "Neon Postgres",category: "Banco de Dados", color: "#00E699", fg: "#000000", abbr: "Ne"  },
  { name: "MySQL",        category: "Banco de Dados", color: "#4479A1", fg: "#ffffff", abbr: "My"  },
  { name: "SQLite",       category: "Banco de Dados", color: "#003B57", fg: "#ffffff", abbr: "Sq"  },
  { name: "MongoDB",      category: "Banco de Dados", color: "#47A248", fg: "#ffffff", abbr: "Mo"  },
  { name: "Redis",        category: "Banco de Dados", color: "#DC382D", fg: "#ffffff", abbr: "Rd"  },
  { name: "Supabase",     category: "Banco de Dados", color: "#3ECF8E", fg: "#000000", abbr: "Su"  },
  { name: "Firebase",     category: "Banco de Dados", color: "#FFCA28", fg: "#000000", abbr: "Fb"  },
  { name: "PlanetScale",  category: "Banco de Dados", color: "#000000", fg: "#ffffff", abbr: "PS"  },
  { name: "Turso",        category: "Banco de Dados", color: "#4FF8D2", fg: "#000000", abbr: "Tu"  },

  // ── ORM & Runtime ────────────────────────────────────────
  { name: "Prisma",       category: "ORM / Runtime",  color: "#2D3748", fg: "#ffffff", abbr: "Pri" },
  { name: "Drizzle",      category: "ORM / Runtime",  color: "#C5F74F", fg: "#000000", abbr: "Dr"  },
  { name: "Node.js",      category: "ORM / Runtime",  color: "#339933", fg: "#ffffff", abbr: "No"  },
  { name: "Bun",          category: "ORM / Runtime",  color: "#FBF0DF", fg: "#000000", abbr: "Bn"  },
  { name: "Deno",         category: "ORM / Runtime",  color: "#000000", fg: "#ffffff", abbr: "De"  },
  { name: "Express.js",   category: "ORM / Runtime",  color: "#000000", fg: "#ffffff", abbr: "Ep"  },
  { name: "Fastify",      category: "ORM / Runtime",  color: "#000000", fg: "#ffffff", abbr: "Fa"  },
  { name: "Hono",         category: "ORM / Runtime",  color: "#E36002", fg: "#ffffff", abbr: "Ho"  },

  // ── API ──────────────────────────────────────────────────
  { name: "GraphQL",      category: "API",            color: "#E10098", fg: "#ffffff", abbr: "GQ"  },
  { name: "tRPC",         category: "API",            color: "#2596BE", fg: "#ffffff", abbr: "tR"  },
  { name: "REST API",     category: "API",            color: "#6E6E6E", fg: "#ffffff", abbr: "Re"  },
  { name: "Webhook",      category: "API",            color: "#5A5A5A", fg: "#ffffff", abbr: "Wh"  },

  // ── Auth ─────────────────────────────────────────────────
  { name: "Google Auth",  category: "Auth",           color: "#4285F4", fg: "#ffffff", abbr: "GA"  },
  { name: "NextAuth",     category: "Auth",           color: "#7B68EE", fg: "#ffffff", abbr: "NA"  },
  { name: "Auth.js",      category: "Auth",           color: "#7B68EE", fg: "#ffffff", abbr: "Au"  },
  { name: "Clerk",        category: "Auth",           color: "#6C47FF", fg: "#ffffff", abbr: "Cl"  },
  { name: "Lucia",        category: "Auth",           color: "#5C6BC0", fg: "#ffffff", abbr: "Lu"  },
  { name: "JWT",          category: "Auth",           color: "#000000", fg: "#ffffff", abbr: "JWT" },

  // ── Hosting & DevOps ─────────────────────────────────────
  { name: "Vercel",       category: "Hosting",        color: "#000000", fg: "#ffffff", abbr: "▲"   },
  { name: "AWS",          category: "Hosting",        color: "#FF9900", fg: "#000000", abbr: "AWS" },
  { name: "Google Cloud", category: "Hosting",        color: "#4285F4", fg: "#ffffff", abbr: "GC"  },
  { name: "Railway",      category: "Hosting",        color: "#0B0D0E", fg: "#ffffff", abbr: "Rw"  },
  { name: "Render",       category: "Hosting",        color: "#46E3B7", fg: "#000000", abbr: "Rn"  },
  { name: "Fly.io",       category: "Hosting",        color: "#7C3AED", fg: "#ffffff", abbr: "Fly" },
  { name: "Netlify",      category: "Hosting",        color: "#00C7B7", fg: "#ffffff", abbr: "Nl"  },
  { name: "Docker",       category: "DevOps",         color: "#2496ED", fg: "#ffffff", abbr: "Dk"  },
  { name: "Kubernetes",   category: "DevOps",         color: "#326CE5", fg: "#ffffff", abbr: "K8"  },
  { name: "GitHub Actions",category:"DevOps",         color: "#2088FF", fg: "#ffffff", abbr: "GA"  },

  // ── UI & Styling ─────────────────────────────────────────
  { name: "Tailwind CSS", category: "UI / CSS",       color: "#06B6D4", fg: "#ffffff", abbr: "TW"  },
  { name: "Framer Motion",category: "UI / CSS",       color: "#0055FF", fg: "#ffffff", abbr: "FM"  },
  { name: "Shadcn/ui",    category: "UI / CSS",       color: "#000000", fg: "#ffffff", abbr: "Sh"  },
  { name: "Radix UI",     category: "UI / CSS",       color: "#8E4EC6", fg: "#ffffff", abbr: "Rx"  },
  { name: "Styled Comp.", category: "UI / CSS",       color: "#DB7093", fg: "#ffffff", abbr: "SC"  },
  { name: "Chakra UI",    category: "UI / CSS",       color: "#319795", fg: "#ffffff", abbr: "Ch"  },
  { name: "Material UI",  category: "UI / CSS",       color: "#007FFF", fg: "#ffffff", abbr: "MUI" },
  { name: "Lucide",       category: "UI / CSS",       color: "#F97316", fg: "#ffffff", abbr: "Lc"  },

  // ── Pagamentos & Serviços ────────────────────────────────
  { name: "Stripe",       category: "Pagamento",      color: "#635BFF", fg: "#ffffff", abbr: "💳"  },
  { name: "Mercado Pago", category: "Pagamento",      color: "#009EE3", fg: "#ffffff", abbr: "MP"  },
  { name: "Pix",          category: "Pagamento",      color: "#32BCAD", fg: "#ffffff", abbr: "PIX" },

  // ── Mídia & Comunicação ──────────────────────────────────
  { name: "Cloudinary",   category: "Mídia / Email",  color: "#3448C5", fg: "#ffffff", abbr: "Cy"  },
  { name: "Uploadthing",  category: "Mídia / Email",  color: "#D00000", fg: "#ffffff", abbr: "Ut"  },
  { name: "AWS S3",       category: "Mídia / Email",  color: "#FF9900", fg: "#000000", abbr: "S3"  },
  { name: "Resend",       category: "Mídia / Email",  color: "#000000", fg: "#ffffff", abbr: "Rs"  },
  { name: "SendGrid",     category: "Mídia / Email",  color: "#1A82E2", fg: "#ffffff", abbr: "SG"  },
  { name: "Twilio",       category: "Mídia / Email",  color: "#F22F46", fg: "#ffffff", abbr: "Tw"  },

  // ── IA & ML ──────────────────────────────────────────────
  { name: "OpenAI",       category: "IA / ML",        color: "#000000", fg: "#ffffff", abbr: "⚙"   },
  { name: "LangChain",    category: "IA / ML",        color: "#1C3C3C", fg: "#ffffff", abbr: "LC"  },
  { name: "Vercel AI SDK",category: "IA / ML",        color: "#000000", fg: "#ffffff", abbr: "AI"  },
  { name: "Hugging Face", category: "IA / ML",        color: "#FFD21E", fg: "#000000", abbr: "HF"  },
  { name: "Anthropic",    category: "IA / ML",        color: "#CC785C", fg: "#ffffff", abbr: "An"  },

  // ── CMS & Conteúdo ───────────────────────────────────────
  { name: "Sanity",       category: "CMS",            color: "#F03E2F", fg: "#ffffff", abbr: "Sa"  },
  { name: "Contentful",   category: "CMS",            color: "#2478CC", fg: "#ffffff", abbr: "Co"  },
  { name: "Strapi",       category: "CMS",            color: "#4945FF", fg: "#ffffff", abbr: "St"  },
  { name: "Payload CMS",  category: "CMS",            color: "#000000", fg: "#ffffff", abbr: "Pl"  },
]

/** Retorna a definição de uma stack pelo nome (case-insensitive + partial match) */
export function findStack(name: string): StackDef | undefined {
  const n = name.trim().toLowerCase()
  return (
    STACK_LIBRARY.find(s => s.name.toLowerCase() === n) ||
    STACK_LIBRARY.find(s => n.includes(s.name.toLowerCase()) || s.name.toLowerCase().includes(n))
  )
}

/** Retorna categorias únicas na ordem original */
export function getCategories(): string[] {
  const seen = new Set<string>()
  const cats: string[] = []
  for (const s of STACK_LIBRARY) {
    if (!seen.has(s.category)) { seen.add(s.category); cats.push(s.category) }
  }
  return cats
}
