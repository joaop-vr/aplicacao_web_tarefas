<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Executa a migração das tabelas para o banco de dados.
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('status', ['nao-iniciado', 'em-andamento', 'concluido'])->default('nao-iniciado');
            $table->timestamps();
        });
    }

    /**
     * Deleta as tabelas do banco de dados.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
