# Food Explorer API

Bem-vindo ao **Food Explorer API**, a API backend para um aplicativo de restaurante delivery. Este projeto foi desenvolvido utilizando Node.js e outras tecnologias modernas para criar um serviço eficiente e seguro para gerenciar operações de um restaurante.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para o backend.
- **Express**: Framework web rápido e minimalista para Node.js.
- **JSON Web Token (JWT)**: Implementação de autenticação baseada em tokens.
- **Knex.js**: SQL query builder para interações com bancos de dados.
- **SQLite**: Banco de dados relacional leve para armazenar dados da aplicação.

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) v12 ou superior
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos para Instalar

1. Clone o repositório:

   ```bash
    git clone https://github.com/DevMatheusMonteiro/FoodExplorer-API.git
   ```

2. Navegue até o diretório do projeto:

```bash
    cd FoodExplorer-API
```

3. Instale as dependências

```bash
    npm install
```

ou

```bash
    yarn install
```

### Configuração

1. Crie um arquivo `.env` na raiz do projeto

```env
    PORT=3333
    JWT_SECRET=sua_chave_secreta_jwt
```

2. Execute as migrações para configurar o banco de dados:

```bash
     npm run migrate
```

### Uso

#### Scripts Disponíveis

- `npm start`: Inicia a aplicação em modo de produção.
- `npm run dev`: Inicia a aplicação em modo de desenvolvimento com recarregamento automático
- `npm run migrate`: Executa as migrações pendentes.

# Endpoints de Users

- **POST** `/users/`

  - **Descrição**: Cria um novo usuário.
  - **Request Body**: JSON contendo os detalhes do usuário.

- **PUT** `/users/`

  - **Descrição**: Atualiza as informações do usuário autenticado.
  - **Request Body**: JSON contendo os detalhes a serem atualizados.
  - **Requer Autenticação**

- **DELETE** `/users/`

  - **Descrição**: Deleta o usuário autenticado.
  - **Requer Autenticação**

- **GET** `/users/validate`
  - **Descrição**: Retorna a validação do usuário autenticado.
  - **Requer Autenticação**

# Endpoints de Sessions

- **POST /sessions**

  - **Descrição**: Cria uma nova sessão.

- **DELETE /sessions**
  - **Descrição**: Encerra a sessão atual.

### Sales Endpoints

- **GET /sales**

  - **Descrição**: Retorna uma lista de todas as vendas.
  - **Requer Autenticação**

- **GET /sales/:id**
  - **Descrição**: Retorna os detalhes de uma venda específica pelo ID.
  - **Requer Autenticação**

### Products Endpoints

- **GET /products**

  - **Descrição**: Retorna uma lista de todos os produtos.
  - **Requer Autenticação**

- **GET /products/:id**

  - **Descrição**: Retorna os detalhes de um produto específico pelo ID.
  - **Requer Autenticação**

- **POST /products**

  - **Descrição**: Cria um novo produto.
  - **Requer Autenticação**

- **PUT /products/:id**

  - **Descrição**: Atualiza um produto existente pelo ID.
  - **Requer Autenticação**

- **DELETE /products/:id**

  - **Descrição**: Remove um produto existente pelo ID.
  - **Requer Autenticação**

- **PATCH /products/:id/image**
  - **Descrição**: Atualiza a imagem de um produto específico pelo ID.
  - **Requer Autenticação**
