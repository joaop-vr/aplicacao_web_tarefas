<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    // Função para visualizar todas as tarefas
    public function index()
    {
        return Task::all();
    }

    public function store(Request $request)
    {
        try {
            // Validação dos dados
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'status' => 'required|in:nao iniciado,em andamento,concluido',
            ]);

            $task = Task::create($validated);

            // Feedback de sucesso
            return response()->json([
                'message' => 'Tarefa criada com sucesso!',
                'data' => $task
            ], 201);
            
        } catch (ValidationException $e) {
            // Feedback de erro
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function show($id)
    {
        $task = Task::find($id);

        // Se não encontrar a tarefa, retorna erro 404
        if (!$task) {
            return response()->json([
                'message' => 'Tarefa não encontrada'
            ], 404);
        }

        // Se encontrar, manda a mensagem de sucesso pro usuário
        return response()->json([
            'message' => 'Sucesso, tarefa encontrada!',
            'data' => $task
        ], 200);
    }
}
