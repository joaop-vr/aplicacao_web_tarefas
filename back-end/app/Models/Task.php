<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // Define quais atributos podem ser preenchidos
    protected $fillable = [
        'title',        // Título da tarefa
        'description',  // Descrição da tarefa
        'status',       // Status da tarefa
    ];
}
