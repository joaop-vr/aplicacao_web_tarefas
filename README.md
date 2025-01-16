# Documentação

- **Autor:** Joao Pedro Vicente Ramalho
- **Contato:** [jpv.ramalho2013@gmail.com](mailto:jpv.ramalho2013@gmail.com)

## **Parte 1: Back-end - Laravel com PostgreSQL**

- **1. Instalação do Laravel**

  - Verificar requisitos (PHP, Composer e Git).
  - Criar um projeto Laravel.
  - Iniciar o servidor local para verificar a instalação.

- **2. Configuração do Banco de Dados (PostgreSQL)**

  - **2.1. Instalar e Configurar o PostgreSQL**
    - Instalação do PostgreSQL.
    - Criação do banco de dados, usuário e configuração de permissões.
  - **2.2. Instalar Extensão do PostgreSQL no PHP**
    - Instalação da extensão `php-pgsql`.
  - **2.3. Configurar o Laravel para usar PostgreSQL**
    - Configuração do arquivo `.env`.
    - Limpeza do cache de configuração.
    - Execução das migrações do banco de dados.

- **3. Testar a Aplicação**
  - Verificar o servidor local e testar a funcionalidade da aplicação no navegador.

---

## **Parte 2: Front-end - Vue.js**

- **1. Pré-requisitos**

  - Garantir a instalação do **Node.js** (v16 ou superior) e **npm**.

- **2. Instalação das Dependências**

  - Navegar até o diretório do projeto clonado.
  - Instalar as dependências com `npm install`.

- **3. Executar o Projeto**
  - Iniciar o servidor de desenvolvimento com `npm run dev`.
  - Testar o front-end no navegador.

---

## 1. **Instalação do Laravel**

1. Certifique-se de ter o PHP, Composer e Git instalados no sistema.
2. Crie um novo projeto Laravel:

   ```bash
   composer create-project laravel/laravel aplicacao_web_tarefas
   ```

3. Navegue até o diretório do projeto:

   ```bash
   cd aplicacao_web_tarefas
   ```

4. Inicie o servidor local para verificar se a instalação está correta:

   ```bash
   php artisan serve
   ```

   Acesse `http://127.0.0.1:8000` no navegador para confirmar que a página inicial do Laravel aparece.

---

## 2. **Configuração do Banco de Dados (PostgreSQL)**

### 2.1. **Instalar e Configurar o PostgreSQL**

1. Instale o PostgreSQL:

   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   ```

2. Acesse o terminal do PostgreSQL:

   ```bash
   sudo -u postgres psql
   ```

3. Crie um banco de dados para o projeto:

   ```sql
   CREATE DATABASE task_db;
   ```

4. Crie um usuário e defina uma senha:

   ```sql
   CREATE USER root WITH PASSWORD 'senha';
   ```

5. Conceda privilégios ao usuário:

   ```sql
   GRANT ALL PRIVILEGES ON DATABASE task_db TO root;
   ```

6. Saia do PostgreSQL:

   ```sql
   \q
   ```

---

### 2.2. **Instalar Extensão do PostgreSQL no PHP**

1. Instale a extensão do PostgreSQL para PHP:

   ```bash
   sudo apt install php-pgsql
   ```

---

### 2.3. **Configurar o Laravel para usar PostgreSQL**

1. No arquivo `.env` do projeto, configure as credenciais do banco de dados:

   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=task_db
   DB_USERNAME=root
   DB_PASSWORD=senha
   ```

2. Limpe o cache de configuração:

   ```bash
   php artisan config:clear
   ```

3. Execute as migrações do banco:

   ```bash
   php artisan migrate
   ```

---

## 3. **Testar a Aplicação**

1. Inicie o servidor local do Laravel:

   ```bash
   php artisan serve
   ```

2. Acesse o navegador em `http://127.0.0.1:8000`.

Se a página inicial do Laravel for exibida, a instalação foi concluída com sucesso!

---

# Documentação: Configuração e Execução do Front-end Vue

## 1. **Pré-requisitos**

Certifique-se de ter instalado no sistema:

- **Node.js** (v16 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

---

## 2. **Instalação das Dependências**

1. Após clonar o repositório, navegue até o diretório do projeto:

   ```bash
   cd caminho/do/projeto

   ```

2.Instale as dependências do projeto:

    ```bash
    npm install

    ```

---

## 3. **Executar o Projeto**

1. Para iniciar o servidor de desenvolvimento, execute:

   ```bash
   npm run dev

   ```

2. Acesse o navegador em `http://127.0.0.1:8000`.

Se a página inicial da Aplicação for exibida, a instalação foi concluída com sucesso!

---
