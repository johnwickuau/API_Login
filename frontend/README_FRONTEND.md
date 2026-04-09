# 🏁 RaceFlow - Sistema de Corridas

Frontend completo e profissional para gerenciar corridas, pilotos e voltas.

## 📋 Descrição

RaceFlow é um sistema de corridas moderno com interface intuitiva, design elegante em tema roxo e preto, com efeitos neon e completamente responsivo. O frontend está pronto para ser integrado com seu backend Node.js.

## ✨ Características

### 🎨 Design & UX
- **Tema Moderno**: Cores roxo (#8B5CF6) e preto
- **Efeitos Visuais**: Gradientes, glow/neon, animações fluidas
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Acessibilidade**: Interface clara e intuitiva

### 📄 Páginas Desenvolvidas

#### 1. **Index (Página Inicial)**
- Apresentação do sistema
- Features destacadas
- Estatísticas gerais
- Links de navegação

#### 2. **Login**
- Autenticação para usuários
- Autenticação para corredores
- Alternância entre tipos de login
- Lembrar credenciais
- Validação de formulário

#### 3. **Cadastro**
- Cadastro de usuários
- Cadastro de corredores (com turma e equipe)
- Validação de senhas
- Termos e condições

#### 4. **Dashboard**
- **Estatísticas**: Total de corredores, usuários, voltas e melhor volta
- **Rankings**: Top 5 voltas, ranking por equipe, ranking geral
- **Listagens**: Corredores, usuários, voltas com CRUD básico
- **Modais**: Para adicionar/editar registros
- **Navigation**: Menu lateral intuitivo
- **Dados Mock**: Exemplos de dados para demonstração

#### 5. **Admin**
- Gerenciamento completo de corredores
- Gerenciamento de usuários
- Histórico de voltas
- Logs do sistema
- Busca e filtro em tabelas
- Exportação de dados
- Interface administrativa

### 🔧 Funcionalidades

✅ Autenticação simulada (localStorage)
✅ Dashboard com estatísticas em tempo real
✅ Tabelas responsivas com dados mock
✅ Modais para CRUD
✅ Busca e filtro de dados
✅ Logs do sistema
✅ Exportação de dados
✅ Layout totalmente responsivo
✅ Animações e transições suaves
✅ Tema consistente em todas as páginas

## 📁 Estrutura de Arquivos

```
frontend/
├── index.html          # Página inicial
├── login.html          # Página de login
├── cadastro.html       # Página de cadastro
├── dashboard.html      # Dashboard principal
├── admin.html          # Painel administrativo
├── styles.css          # Estilos CSS (único arquivo)
├── script.js           # JavaScript funcionalidades globais
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. **Abrir o Frontend**
```bash
# Basta abrir qualquer arquivo HTML em um navegador
# Ou usar um servidor local:
python -m http.server 8000
# Depois acesse: http://localhost:8000
```

### 2. **Fluxo de Navegação**

```
index.html (Home)
    ↓
login.html (Login como Usuário ou Corredor)
    ↓
dashboard.html (Dashboard Principal)
    ├── Ver Dashboard
    ├── Listar Corredores
    ├── Listar Usuários
    ├── Ver Rankings
    └── Ver Voltas
    
admin.html (Painel Admin)
    ├── Gerenciar Corredores
    ├── Gerenciar Usuários
    ├── Histórico de Voltas
    └── Logs do Sistema
```

### 3. **Dados de Teste**

O sistema vem com dados mock para demonstração. Você pode fazer login com qualquer email durante o cadastro ou login.

Exemplo:
- Email: `teste@email.com`
- Senha: `123456`

## 🔌 Integração com Backend

### Preparação para Integração

1. **Substitua as chamadas mock por fetch() ou axios()**

No arquivo `dashboard.html`, altere:
```javascript
// De:
const corredores = generateMockCorredores();

// Para:
const corredores = await fetch('/api/corredores').then(r => r.json());
```

2. **Endpoints Esperados**

```javascript
// Usuários
GET    /api/usuarios          - Listar usuários
POST   /api/usuarios          - Criar usuário
PUT    /api/usuarios/:id      - Atualizar usuário
DELETE /api/usuarios/:id      - Deletar usuário

// Corredores
GET    /api/corredores        - Listar corredores
POST   /api/corredores        - Criar corredor
PUT    /api/corredores/:id    - Atualizar corredor
DELETE /api/corredores/:id    - Deletar corredor

// Voltas
GET    /api/voltas            - Listar voltas
POST   /api/voltas            - Criar volta
DELETE /api/voltas/:id        - Deletar volta

// Auth
POST   /api/auth/login        - Fazer login
POST   /api/auth/register     - Registrar novo usuário
```

3. **Exemplos de Fetch**

```javascript
// Login
async function loginUsuario(email, senha) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha, tipo: 'usuario' })
    });
    const data = await response.json();
    localStorage.setItem('userLoggedIn', JSON.stringify(data.user));
}

// Buscar corredores
async function getCorredores() {
    const response = await fetch('/api/corredores');
    return await response.json();
}

// Criar corredor
async function criarCorredor(dados) {
    const response = await fetch('/api/corredores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    return await response.json();
}
```

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #8B5CF6;      /* Roxo principal */
    --secondary-color: #1F2937;    /* Preto */
    --accent-color: #EC4899;       /* Rosa/Magenta */
    /* ... mais cores ... */
}
```

### Fontes
Altere em `styles.css`:

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* Substitua por sua fonte preferida */
}
```

### Logo
Altere em todos os HTMLs:

```html
<span class="logo-icon">🏁</span> <!-- Substitua o emoji -->
<span class="logo-text">RaceFlow</span> <!-- Altere o texto -->
```

## 📱 Responsividade

O sistema é totalmente responsivo:

- **Desktop**: Layout completo com sidebar
- **Tablet**: Layout adaptado (768px - 1024px)
- **Mobile**: Layout mobile-first (< 768px)

## 🔐 Segurança (Implementar no Backend)

⚠️ **IMPORTANTE**: O frontend atual usa apenas localStorage. Implemente no backend:

- Hash de senhas (bcrypt)
- JWT para autenticação
- CORS configurado
- Validação de entrada
- Rate limiting
- HTTPS

## 🛠️ Tecnologias Usadas

- **HTML5**: Semântico e moderno
- **CSS3**: Gradientes, animações, flexbox, grid
- **JavaScript Vanilla**: Sem dependências externas
- **LocalStorage**: Para dados de sessão (apenas para demo)

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Suporte a ES6+
- Servidor web local (opcional)

## 🚀 Performance

- Sem frameworks pesados
- CSS otimizado
- JavaScript minimizado
- Imagens em emoji (sem assets externos)
- Carregamento rápido

## 📱 Compatibilidade

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers (iOS, Android)

## 🔄 Funcionalidades Prontas para Backend

Todas as funções abaixo estão preparadas para receber dados do backend:

- `loadDashboardData()`
- `populateCorredoresTable()`
- `populateUsuariosTable()`
- `populateVoltasTable()`
- `populateTopVoltas()`
- `populateRankingEquipe()`

## 📝 Próximos Passos

1. ✅ Frontend concluído
2. ⏳ Conectar com seu backend Node.js
3. ⏳ Implementar autenticação real (JWT)
4. ⏳ Adicionar validação de formulários avançada
5. ⏳ Implementar upload de imagens
6. ⏳ Adicionar notificações em tempo real
7. ⏳ Implementar filtros avançados

## 🐛 Troubleshooting

### As páginas não carregam CSS
- Verifique se o arquivo `styles.css` está no mesmo diretório

### LocalStorage não funciona
- Use um servidor web local, não abra o arquivo diretamente

### Modais não abrem
- Verifique o console do navegador (F12) para erros

## 📞 Suporte

Para dúvidas sobre integração com seu backend, consulte:
- [Express.js Documentation](https://expressjs.com/)
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## 📄 Licença

Uso livre para seu projeto!

---

**v1.0** | Desenvolvido com ❤️ para RaceFlow

🏁 **Pronto para integração com seu backend!**
