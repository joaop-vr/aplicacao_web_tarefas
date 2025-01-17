# Documentação

- **Autor:** Joao Pedro Vicente Ramalho
- **Contato:** [jpv.ramalho2013@gmail.com](mailto:jpv.ramalho2013@gmail.com)

## **Sumário**

### **Parte 1: Back-end - Laravel com PostgreSQL**

- **1. Pré-requisitos**
- **2. Instalação das Dependências**
- **3. Configuração do Banco de Dados (PostgreSQL)**
  - **3.1. Instalar e Configurar o PostgreSQL**
  - **3.2. Instalar Extensão do PostgreSQL no PHP**
  - **3.3. Configurar o Laravel para usar PostgreSQL**
- **4. Executar o Projeto**

### **Parte 2: Front-end - Vue.js**

- **1. Pré-requisitos**
- **2. Instalação das Dependências**
- **3. Executar o Projeto**
---


### **Parte 1: Back-end - Laravel com PostgreSQL**

---

## 1. **Pré-requisitos**

Certifique-se de ter instalado no sistema:

- **PHP** (v8.0 ou superior).  
- **Composer** (gerenciador de dependências para PHP).  
- **Extensões do PHP**: Certifique-se de ter habilitado extensões básicas como `openssl`, `pdo`, `mbstring`, `tokenizer`, `xml`, e `ctype` no seu ambiente PHP.  

## 2. **Instalação das Dependências**

1. Após clonar o repositório, navegue até o diretório do projeto:

   ```bash
   cd back-end

   ```

2. Instale as dependências do projeto:

    ```bash
    composer install

    ```
## 3. **Configuração do Banco de Dados (PostgreSQL)**

### 3.1. **Instalar e Configurar o PostgreSQL**

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

6. Tornar o usuário root um superusuário (caso tenha acontecido algum erro na etapa anterior)

  ```sql
  ALTER USER root WITH SUPERUSER;
  ```
7. Saia do PostgreSQL:

   ```sql
   \q
   ```

---

### 3.2. **Instalar Extensão do PostgreSQL no PHP**

1. Instale a extensão do PostgreSQL para PHP:

   ```bash
   sudo apt install php-pgsql
   ```

---

### 3.3. **Configurar o Laravel para usar PostgreSQL**

1. No diretório `back-end` do seu projeto, renomeie o arquivo `.env.example` para `.env` (caso o arquivo `.env` não exista):

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

3. Gerar a chave no Laravel

  ```bash
  php artisan key:generate
  ```

4. Execute as migrações do banco:

   ```bash
   php artisan migrate
   ```

---

## 4. **Executar o Projeto**

1. Inicie o servidor local do Laravel:

   ```bash
   php artisan serve
   ```

2. Acesse o navegador em `http://127.0.0.1:8000`.

Se a página inicial do Laravel for exibida, a instalação foi concluída com sucesso!

---

### **Parte 2: Front-end - Vue.js**

---

## 1. **Pré-requisitos**

Certifique-se de ter instalado no sistema:

- **Node.js** (v16 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

---

## 2. **Instalação das Dependências**

1. Após clonar o repositório, navegue até o diretório do projeto:

   ```bash
   cd front-end

   ```

2. Instale as dependências do projeto:

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
