# Pulse-Chat


Desenvolvido com WebSocket, sua principal função é enviar e receber mensagens para todos participantes da sala em tempo real.

## Funcionalidades

- Cadastro e autenticação com JWT
- Mensagens em tempo real usando WebSocket
- Lista de usuários online
- Indicador de digitação
- Ambiente totalmente conteinerizado com Docker

## Tecnologias

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Socket.IO Client
- Axios

### Backend

- Node.js
- Fastify
- TypeScript
- Socket.IO
- Prisma ORM
- PostgreSQL
- JWT

### DevOps

- Docker
- Docker Compose

## Estrutura do Projeto

```text
.
├── backend
├── frontend
├── docker-compose.yml
└── README.md
```

## Como executar esse projeto?

### Clone o projeto

```bash
git clone https://github.com/wolfhackd/Pulse-Chat

cd pulse-chat
```

### Execute

```bash
docker compose up --build
```

## Variáveis de ambiente

### Backend

```env
DATABASE_URL=
JWT_SECRET=
```

### Frontend

```env
VITE_API_URL=http://localhost:8000
```

## Roadmap

- [x] Cadastro
- [x] Login
- [x] Salas
- [x] Mensagens em tempo real
- [x] Usuários online
- [x] Indicador de digitação
- [x] Docker
- [ ] Upload de imagens
- [ ] Mensagens privadas
- [ ] Recuperar Mensagens

## Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.