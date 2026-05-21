# JRM Corp

Plataforma web corporativa de **servicios digitales y empresariales**: diseño de
páginas web, marketing digital, productora musical y asesoramiento empresarial.

Incluye web pública, autenticación, agenda de citas, pagos con tarjeta y panel
de administración.

## 🛠️ Tecnologías

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** — diseño modo oscuro premium
- **Framer Motion** — animaciones
- **three.js / React Three Fiber** — elementos 3D
- **Supabase** — autenticación, base de datos PostgreSQL y seguridad (RLS)
- **Stripe** — pagos con tarjeta
- **Recharts** — gráficas del panel administrativo

## ✨ Funcionalidades

- Landing page en modo oscuro con elementos 3D
- Registro, inicio de sesión y recuperación de contraseña
- Panel de cliente: perfil, citas y pagos
- Sistema de citas con calendario
- Pagos con Stripe e historial de facturas
- Panel de administración: estadísticas, usuarios, citas e ingresos

## 🚀 Instalación local

### 1. Requisitos

- Node.js 20.9 o superior
- Una cuenta de [Supabase](https://supabase.com) y una de [Stripe](https://stripe.com)

### 2. Dependencias

```bash
npm install
```

### 3. Variables de entorno

Copia `.env.example` como `.env.local` y completa los valores:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
```

### 4. Base de datos

En el **SQL Editor** de Supabase, ejecuta en este orden:

1. `supabase/schema.sql` — perfiles, roles y autenticación
2. `supabase/appointments.sql` — sistema de citas
3. `supabase/payments.sql` — sistema de pagos

### 5. Ejecutar

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## ☁️ Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en [vercel.com/new](https://vercel.com/new).
3. Agrega las variables de entorno del archivo `.env.example`.
4. Vercel detecta Next.js y despliega automáticamente.
5. En Supabase → Authentication → URL Configuration, agrega la URL de
   producción de Vercel a *Site URL* y *Redirect URLs*.

## 📁 Estructura

```
src/
  app/          Rutas: landing, auth, panel de cliente, admin, API
  components/   Componentes: ui, layout, sections, panel, admin, three (3D)
  config/       Configuración del sitio y contenido
  lib/          Supabase, Stripe, validaciones y servicios
  types/        Tipos TypeScript
supabase/       Scripts SQL de la base de datos
```

---

Construido con Next.js, Supabase y Vercel.
