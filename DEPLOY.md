# 🚀 Deploy Gratuito — BookShare

Stack: **React (Vite)** + **Node.js/Express** + **PostgreSQL**

| Parte | Serviço gratuito | Link |
|-------|-----------------|------|
| Frontend | [Vercel](https://vercel.com) | vercel.com |
| Backend | [Render](https://render.com) | render.com |
| Banco de dados | [Neon](https://neon.tech) | neon.tech |

---

## Pré-requisitos

- Conta no **GitHub** com o repositório do projeto
- Contas criadas em **Vercel**, **Render** e **Neon** (todas gratuitas usando login com GitHub)

---

## Parte 1 — Banco de Dados PostgreSQL no Neon

1. Acesse [neon.tech](https://neon.tech) e faça login com GitHub
2. Clique em **"New Project"**
3. Dê um nome ao projeto (ex: `bookshare`)
4. Selecione a região mais próxima (ex: `US East`)
5. Clique em **"Create Project"**
6. Após criar, vá em **"Connection Details"** e copie a **Connection String**, que tem este formato:
   ```
   postgresql://user:password@host/dbname?sslmode=require
   ```
   > ⚠️ Guarde essa string, você vai precisar dela no próximo passo.

---

## Parte 2 — Backend no Render

### 2.1 — Preparar o código do backend

Certifique-se de que o `backend/server.js` tem um script `start` no `package.json`:

```json
// backend/package.json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### 2.2 — Criar o serviço no Render

1. Acesse [render.com](https://render.com) e faça login com GitHub
2. Clique em **"New +"** → **"Web Service"**
3. Conecte o repositório do **bookshare** no GitHub
4. Preencha as configurações:

   | Campo | Valor |
   |-------|-------|
   | **Name** | `bookshare-backend` |
   | **Root Directory** | `backend` |
   | **Environment** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |

5. Clique em **"Advanced"** → **"Add Environment Variable"** e adicione:

   | Chave | Valor |
   |-------|-------|
   | `DB_HOST` | (host do Neon, ex: `ep-xxx.us-east-2.aws.neon.tech`) |
   | `DB_PORT` | `5432` |
   | `DB_NAME` | (nome do banco no Neon) |
   | `DB_USER` | (usuário do Neon) |
   | `DB_PASS` | (senha do Neon) |
   | `DB_DIALECT` | `postgres` |
   | `JWT_SECRET` | (uma string longa e aleatória, ex: `minha_chave_super_secreta_123!`) |

   > 💡 Você encontra todos esses valores na **Connection String** do Neon:
   > `postgresql://DB_USER:DB_PASS@DB_HOST/DB_NAME?sslmode=require`

6. Clique em **"Create Web Service"**
7. Aguarde o deploy (2–5 minutos). Ao terminar, copie a URL gerada:
   ```
   https://bookshare-backend.onrender.com
   ```
   > ⚠️ Guarde essa URL, você vai precisar dela para o frontend.

### 2.3 — Ajustar SSL no banco (obrigatório no Neon)

No arquivo `backend/config/database.js`, adicione a opção SSL:

```js
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necessário no Neon
      },
    },
  }
);
```

Faça commit e push dessa alteração antes de continuar.

---

## Parte 3 — Frontend no Vercel

### 3.1 — Apontar o frontend para o backend em produção

No frontend, substitua as chamadas `http://localhost:5000` pela URL do Render.

A forma recomendada é usar uma variável de ambiente. Crie o arquivo `frontend/.env.production`:

```env
VITE_API_URL=https://bookshare-backend.onrender.com
```

E em **todos os arquivos** do frontend que fazem `fetch("http://localhost:5000/...")`, substitua por:

```js
fetch(`${import.meta.env.VITE_API_URL}/...`)
```

> Exemplo: `fetch("http://localhost:5000/api/auth/login")` vira:
> ```js
> fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`)
> ```

### 3.2 — Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Importe o repositório **bookshare**
4. Configure o projeto:

   | Campo | Valor |
   |-------|-------|
   | **Root Directory** | `frontend` |
   | **Framework Preset** | `Vite` |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |

5. Em **"Environment Variables"**, adicione:

   | Chave | Valor |
   |-------|-------|
   | `VITE_API_URL` | `https://bookshare-backend.onrender.com` |

6. Clique em **"Deploy"**
7. Após o deploy, a Vercel fornecerá uma URL como:
   ```
   https://bookshare.vercel.app
   ```

---

## Parte 4 — Configurar CORS no Backend

Para que o frontend na Vercel possa chamar o backend no Render, adicione a URL do frontend nas origens permitidas pelo CORS no `backend/server.js`:

```js
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',                  // desenvolvimento local
    'https://bookshare.vercel.app',           // produção (substitua pela sua URL da Vercel)
  ],
  credentials: true,
}));
```

Faça commit e push. O Render vai re-deployar automaticamente.

---

## Resumo Final

| O quê | URL |
|-------|-----|
| 🌐 Frontend | `https://bookshare.vercel.app` |
| ⚙️ Backend API | `https://bookshare-backend.onrender.com` |
| 🗄️ Banco de dados | Hospedado no Neon (acessado pelo backend) |

---

## ⚠️ Observações Importantes

- **Render free tier**: O serviço entra em suspensão após 15 minutos sem uso. A primeira requisição após a suspensão pode demorar ~30s para "acordar" o servidor.
- **Neon free tier**: 512 MB de armazenamento e 1 banco de dados gratuito.
- **Vercel free tier**: Sem limitações relevantes para projetos pessoais.
- O banco SQLite (`database.sqlite`) **não deve ser usado em produção** — no Render o sistema de arquivos é efêmero e os dados seriam perdidos a cada re-deploy. Use o Neon (PostgreSQL) conforme este guia.
