<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define o namespace para o controlador.
     *
     * @var string
     */
    protected $namespace = 'App\\Http\\Controllers';

    /**
     * Registra os serviços.
     *
     * @return void
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap os serviços.
     *
     * @return void
     */
    public function boot(): void
    {
        // Registrando as rotas da API
        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));

        // Registrando as rotas web (caso tenha)
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }

}
