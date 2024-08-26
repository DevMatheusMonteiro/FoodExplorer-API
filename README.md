# Food Explorer API

Bem-vindo ao **Food Explorer API**, a API backend para um aplicativo de restaurante delivery. Este projeto foi desenvolvido utilizando Node.js e outras tecnologias modernas para criar um serviço eficiente e seguro para gerenciar operações de um restaurante.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para o backend.
- **Express**: Framework web rápido e minimalista para Node.js.
- **JSON Web Token (JWT)**: Implementação de autenticação baseada em tokens.
- **Knex.js**: SQL query builder para interações com bancos de dados.
- **SQLite**: Banco de dados relacional leve para armazenar dados da aplicação.

## Link do projeto

[https://foodexplorer-api-6cw6.onrender.com](https://foodexplorer-api-6cw6.onrender.com)

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
    AUTH_SECRET=
    PORT=
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

# Endpoints

## Users Endpoints

- **POST** `/users`

  - **Descrição**: Cria um novo usuário.
  - **Request Body**: JSON contendo os detalhes do usuário.

- **PUT** `/users`

  - **Descrição**: Atualiza as informações do usuário autenticado.
  - **Request Body**: JSON contendo os detalhes a serem atualizados.
  - **Requer Autenticação**

- **DELETE** `/users`

  - **Descrição**: Deleta o usuário autenticado.
  - **Requer Autenticação**

- **GET** `/users/validate`
  - **Descrição**: Retorna a validação do usuário autenticado.
  - **Requer Autenticação**

## Sessions Endpoints

- **POST `/sessions`**

  - **Descrição**: Cria uma nova sessão.

- **DELETE `/sessions`**
  - **Descrição**: Encerra a sessão atual.

## Sales Endpoints

- **GET `/sales`**

  - **Descrição**: Retorna uma lista de todas as vendas.
  - **Requer Autorização admin ou employee**
  - **Requer Autenticação**

- **GET `/sales/:id`**
  - **Descrição**: Retorna os detalhes de uma venda específica pelo ID.
  - **Requer Autorização admin ou employee**
  - **Requer Autenticação**

## Products Endpoints

- **GET `/products`**

  - **Descrição**: Retorna uma lista de todos os produtos.
  - **Requer Autorização admin ou employee**
  - **Requer Autenticação**

- **GET `/products/:id`**

  - **Descrição**: Retorna os detalhes de um produto específico pelo ID.
  - **Requer Autorização admin ou employee**
  - **Requer Autenticação**

- **POST `/products`**

  - **Descrição**: Cria um novo produto.
  - **Requer Autorização admin ou employee**
  - **Requer Autenticação**

- **PUT `/products/:id`**

  - **Descrição**: Atualiza um produto existente pelo ID.
  - **Requer Autorização admin ou employee**
  - **Requer Autenticação**

- **DELETE `/products/:id`**

  - **Descrição**: Remove um produto existente pelo ID.
  - **Requer Autorização admin ou employee**
  - **Requer Autenticação**

- **PATCH `/products/image/:id`**

  - **Descrição**: Atualiza a imagem de um produto específico pelo ID.
  - **Requer Autorização admin ou employee**
  - **Requer Autenticação**

- **POST `/products/image`**

  - **Descrição**: Cria uma nova imagem de produto.
  - **Requer Autorização admin ou employee**
  - **Requer Autenticação**

## Orders Endpoints

- **POST `/orders`**

  - **Descrição**: Cria um novo pedido.
  - **Requer Autenticação**

- **GET `/orders`**

  - **Descrição**: Retorna uma lista de todos os pedidos.
  - **Requer Autenticação**

- **GET `/orders/:id`**

  - **Descrição**: Retorna os detalhes de um pedido específico pelo ID.
  - **Requer Autenticação**

- **PATCH `/orders/:id`**

  - **Descrição**: Atualiza o status de um pedido específico pelo ID.
  - **Requer Autenticação**

## Employees Endpoints

- **POST `/employees`**

  - **Descrição**: Cria um novo funcionário.
  - **Requer Autorização admin**
  - **Requer Autenticação**

- **GET `/employees`**

  - **Descrição**: Retorna uma lista de todos os funcionários.
  - **Requer Autorização admin**
  - **Requer Autenticação**

- **GET `/employees/:id`**

  - **Descrição**: Retorna os detalhes de um funcionário específico pelo ID.
  - **Requer Autorização admin**
  - **Requer Autenticação**

- **PUT `/employees/:id`**

  - **Descrição**: Atualiza um funcionário existente pelo ID.
  - **Requer Autorização admin**
  - **Requer Autenticação**

- **DELETE `/employees/:id`**
  - **Descrição**: Remove um funcionário existente pelo ID.
  - **Requer Autorização admin**
  - **Requer Autenticação**

## Addresses Endpoints

- **POST `/addresses`**

  - **Descrição**: Cria um novo endereço.
  - **Requer Autenticação**

- **GET `/addresses`**

  - **Descrição**: Retorna uma lista de todos os endereços.
  - **Requer Autenticação**

- **GET `/addresses/:id`**

  - **Descrição**: Retorna os detalhes de um endereço específico pelo ID.
  - **Requer Autenticação**

- **PUT `/addresses/:id`**

  - **Descrição**: Atualiza um endereço existente pelo ID.
  - **Requer Autenticação**

- **DELETE `/addresses/:id`**

  - **Descrição**: Remove um endereço existente pelo ID.
  - **Requer Autenticação**

- **PATCH `/addresses/:id`**
  - **Descrição**: Atualiza o status de seleção de um endereço específico pelo ID.
  - **Requer Autenticação**

## Cards Endpoints

- **POST `/cards`**

  - **Descrição**: Cria um novo cartão.
  - **Requer Autenticação**

- **GET `/cards`**

  - **Descrição**: Retorna uma lista de todos os cartões.
  - **Requer Autenticação**

- **GET `/cards/:id`**

  - **Descrição**: Retorna os detalhes de um cartão específico pelo ID.
  - **Requer Autenticação**

- **PUT `/cards/:id`**

  - **Descrição**: Atualiza um cartão existente pelo ID.
  - **Requer Autenticação**

- **DELETE `/cards/:id`**
  - **Descrição**: Remove um cartão existente pelo ID.
  - **Requer Autenticação**

## Categories Endpoints

- **GET `/categories`**
  - **Descrição**: Retorna uma lista de todas as categorias.
  - **Requer Autenticação**

## Feedbacks Endpoints

- **POST `/feedbacks`**
  - **Descrição**: Cria um novo feedback.
  - **Requer Autenticação**

## Favorites Endpoints

- **POST `/favorites`**

  - **Descrição**: Adiciona um item à lista de favoritos.
  - **Requer Autenticação**

- **GET `/favorites`**

  - **Descrição**: Retorna a lista de itens favoritos.
  - **Requer Autenticação**

- **DELETE `/favorites/:id`**
  - **Descrição**: Remove um item da lista de favoritos pelo ID.
  - **Requer Autenticação**

## File Endpoints

- **GET `/file/:nome-do-arquivo`**

  - **Descrição**: Retorna a imagem do produto.
  - **Requer Autenticação**
