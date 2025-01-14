<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Função para visualizar todas as tarefas
    public function index()
    {
        return Task::all();
    }

    // Função para criar uma nova tarefa
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:nao iniciado,em andamento,concluido',
        ]);

        return Task::create($validated);
    }

    // Função para visualizar uma tarefa específica com base no seu "id"
    public function show($id)
    {
        return Task::findOrFail($id);
    }

}
