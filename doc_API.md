# Documentação da API: Gerenciamento de Tarefas

**Autor:** Joao Pedro Vicente Ramalho
**Contato:** [jpv.ramalho2013@gmail.com.com](mailto:jpv.ramalho2013@gmail.com)

## **Base URL**

A API está hospedada em:  
`http://127.0.0.1:8000/api`

---

## **Endpoints**

### **1. Listar Todas as Tarefas**

- **URL:** `/tasks`
- **Método:** `GET`
- **Descrição:** Retorna uma lista com todas as tarefas cadastradas.
- **Exemplo de Resposta (200):**
  ```json
  [
    {
      "id": 1,
      "title": "Comprar pão",
      "description": "Ir na padaria às 8h",
      "status": "nao-iniciado",
      "created_at": "2023-01-15T12:00:00.000000Z",
      "updated_at": "2023-01-15T12:00:00.000000Z"
    }
  ]
  ```

---

### **2. Criar Nova Tarefa**

- **URL:** `/task`
- **Método:** `POST`
- **Descrição:** Cria uma nova tarefa no sistema.
- **Body da Requisição:**

  ```json
  {
    "title": "Nome da tarefa",
    "description": "Descrição da tarefa",
    "status": "nao-iniciado"
  }
  ```

- **Campos obrigatórios:** `title` e `description`(string, máx. 255 caracteres); `status` (string, valores permitidos: nao-iniciado, em-andamento, concluido).

- **Exemplo de Resposta (201 - Criado):**

  ```json
  {
    "message": "Tarefa criada com sucesso!",
    "data": {
      "id": 3,
      "title": "Nova tarefa",
      "description": "descricao",
      "status": "nao-iniciado",
      "created_at": "2023-01-15T16:00:00.000000Z",
      "updated_at": "2023-01-15T16:00:00.000000Z"
    }
  }
  ```

- **Exemplo de Erro (422 - Validação):**

  ```json
  {
    "message": "Erro de validação",
    "errors": {
      "title": ["O campo título é obrigatório."],
      "status": ["O campo status é obrigatório."]
    }
  }
  ```

---

### **3. Visualizar uma Tarefa Específica**

- **URL:** `/task/{id}`
- **Método:** `GET`
- **Descrição:** Retorna os detalhes de uma tarefa com base no seu ID.
- **Parâmetros na URL:** `id` (inteiro, obrigatório).
- **Exemplo de Resposta (200)**

  ```json
  {
    "message": "Sucesso, tarefa encontrada!",
    "data": {
      "id": 1,
      "title": "Comprar pão",
      "description": "Ir na padaria às 8h",
      "status": "nao-iniciado",
      "created_at": "2023-01-15T12:00:00.000000Z",
      "updated_at": "2023-01-15T12:00:00.000000Z"
    }
  }
  ```

- **Exemplo de Erro (404):**

  ```json
  {
    "message": "Tarefa não encontrada"
  }
  ```

---

### **4. Atualizar uma Tarefa**

- **URL:** `/task/{id}`
- **Método:** `PUT`
- **Descrição:** Atualiza os dados de uma tarefa com base no seu ID.
- **Parâmetros na URL::** `id` (inteiro, obrigatório)
- **Body da Requisição:**

  ```json
  {
    "title": "Novo título da tarefa",
    "description": "Nova descrição da tarefa",
    "status": "em-andamento"
  }
  ```

- **Campos obrigatórios:** `title` e `description`(string, máx. 255 caracteres); `status` (string, valores permitidos: nao-iniciado, em-andamento, concluido).

- **Exemplo de Resposta (201 - Criado):**

  ```json
  {
    "message": "Tarefa atualizada com sucesso!",
    "data": {
      "id": 1,
      "title": "Comprar pão e leite",
      "description": "Ir na padaria e supermercado às 8h",
      "status": "em-andamento",
      "created_at": "2023-01-15T12:00:00.000000Z",
      "updated_at": "2023-01-15T18:00:00.000000Z"
    }
  }
  ```

- **Exemplo de Erro (404):**

  ```json
  {
    "message": "Tarefa não encontrada para atualização"
  }
  ```

---

### **5. Deletar uma Tarefa**

- **URL:** `/task/{id}`
- **Método:** `DELETE`
- **Descrição:** Remove uma tarefa com base no seu ID.
- **Parâmetros na URL:** `id` (inteiro, obrigatório).
- **Exemplo de Resposta (200)**

  ```json
  {
    "message": "Tarefa excluída com sucesso"
  }
  ```

- **Exemplo de Erro (404):**

  ```json
  {
    "message": "Tarefa não encontrada para exclusão"
  }
  ```

---

### **6. Códigos de Status**

- 200: Operação bem-sucedida.
- 201: Recurso criado com sucesso.
- 404: Recurso não encontrado.
- 422: Erro de validação nos dados enviados.
