
<!-- README frontend: BookShare -->

<h1 align="center">📚 <span style="color:#1e90ff">BookShare</span> — Frontend (React + Vite)</h1>

Bem-vindo ao frontend do BookShare. Este README descreve como o app funciona, como executar localmente, dependências e como conectar ao backend (API). As instruções usam PowerShell no Windows.

---

**Visão geral**

- Frontend: React + Vite (dev server rápido, HMR)
- Roteamento: `react-router-dom`
- Comunicação com backend: fetch/axios usando API REST (JWT para rotas protegidas)

---

Requisitos locais

- Node.js (recomendado >= 18)
- npm (ou yarn)
- PostgreSQL (local ou remoto)
- Terminal: PowerShell (os exemplos abaixo usam PowerShell no Windows)

---

Instalação e execução (passo a passo)

1) Backend — rodar primeiro

 - Entre na pasta do backend e instale dependências:

```powershell
cd 'c:\Users\kevin\OneDrive\Documentos\app-sebo\bookshare\backend'
npm install
```

 - Crie um arquivo `.env` na pasta `backend` com as variáveis usadas pelo projeto. Exemplo mínimo:

```text
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookshare_db
DB_USER=bookshare_user
DB_PASS=senha_segura
JWT_SECRET=sua_chave_jwt_super_secreta
```

 - (Opcional) Crie o banco e o usuário no Postgres:

```sql
CREATE DATABASE bookshare_db;
CREATE USER bookshare_user WITH ENCRYPTED PASSWORD 'senha_segura';
GRANT ALL PRIVILEGES ON DATABASE bookshare_db TO bookshare_user;
```

 - Inicie o backend:

```powershell
npm run dev   # ou 'node server.js' dependendo do package.json do backend
```

O backend deve ficar disponível em `http://localhost:5000` por padrão.

2) Frontend — após backend ativo

 - Entre na pasta do frontend e instale dependências:

```powershell
cd 'c:\Users\kevin\OneDrive\Documentos\app-sebo\bookshare\frontend'
npm install
npm run dev
```

 - O Vite geralmente abre em `http://localhost:5173`.

3) Configurar URL do backend (opcional)

 - Para configurar a URL da API do backend, crie `.env` no `frontend` com:

```text
VITE_API_URL=http://localhost:5000
```

e use `import.meta.env.VITE_API_URL` no código para montar as chamadas.

---

Como o app funciona

- Autenticação: o backend fornece tokens JWT em `POST /api/auth/login`. O frontend armazena o token em `localStorage` e envia nos headers `Authorization: Bearer <token>` para rotas protegidas.
- Multi-usuário: os recursos (books, clients, borrow) devem ser associados ao usuário (campo `userId`) — o backend filtra por `req.user.id` quando protegido pelo middleware.
- Empréstimos: ao criar um empréstimo, o backend marca o livro como `emprestado`. Ao devolver, o status volta para `disponivel`.

Principais rotas (resumo)

- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Books: `GET /books`, `POST /books`, `DELETE /books/:id`
- Clients: `GET /clients`, `POST /clients`, `DELETE /clients/:id`
- Borrow: `POST /borrow`, `POST /return`, `GET /borrow/ativos/:id_usuario`

Observação: verifique se as rotas do backend estão protegidas pelo middleware `authMiddleware` quando necessário.

---

Dicas de desenvolvimento

- Sincronização do DB: o backend usa `sequelize.sync()` (útil em dev). Em produção, prefira migrations.
- Se alterar modelos, você pode usar `sequelize.sync({ force: true })` localmente para recriar tabelas (apague dados se necessário).
- Frontend: garanta que as chamadas protegidas incluam o header `Authorization` com o token.

Exemplo de fetch com token:

```js
const token = localStorage.getItem('token');
fetch(`${API_URL}/books`, {
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${token}`,
	}
})
```

---

Problemas comuns

- Erro de CORS: confira `server.js` e a origem em `cors()` (frontend geralmente em `http://localhost:5173`).
- Token inválido: verifique `JWT_SECRET` no `.env` do backend e se o token expirou.
- Erro de conexão ao Postgres: verifique credenciais e se o serviço está rodando.


