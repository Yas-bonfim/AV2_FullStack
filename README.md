# 🔐 API de Autenticação com JWT

Este projeto é uma API RESTful desenvolvida com Node.js, Express e MongoDB. Ele implementa autenticação de usuários utilizando JWT (JSON Web Token), seguindo uma arquitetura em camadas.

---

## 📌 Funcionalidades

### 🔓 Rotas públicas

- **POST /register**: Criação de novo usuário
- **POST /login**: Autenticação e geração de token JWT

### 🔒 Rotas protegidas (requer token JWT)

- **GET /protected**: Retorna uma mensagem de acesso autorizado

---

## 🗂️ Estrutura de pastas

project/ 
│ 
├── app.js 
├── .env 
├── package.json 
├── requests/ 
│ └── *.sh (scripts curl para testar a API) 
├── controllers/ 
│ └── protectedController.js 
├── routes/ 
│ ├── authRoutes.js 
│ └── protectedRoutes.js 
├── middlewares/ 
│ ├── authMiddleware.js 
│ └── errorMiddleware.js 
├── services/ 
│ └── authService.js 
├── models/ 
│ └── User.js 
├── database/ 
│ └── mongo.js 



---

## ⚙️ Tecnologias usadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Bcrypt
- dotenv
- Morgan

---

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/Yas-bonfim/AV2_FullStack.git
cd AV2_FullStack

# Instale as dependências
npm install
