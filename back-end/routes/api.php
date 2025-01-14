<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

/*
    Rotas da CRUD Task (Index): faz a requisição para obter todos os registros
*/
Route::get('/task', 'App\Http\Controllers\TaskController@index');

/*
    Rotas da CRUD Task (Create): faz a requisição para criar um novo registro de task
*/
Route::post('/task', 'App\Http\Controllers\TaskController@store');

/*
    Rotas da CRUD Task (Index): faz a requisição para obter 1 registro com base no seu id
*/
Route::get('/task/{id}', 'App\Http\Controllers\TaskController@show');


