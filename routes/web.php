<?php

use App\Http\Controllers\detailController;
use App\Http\Controllers\ListController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/home', function () {
    return Inertia::render('Home');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/search', [detailController::class, "index"]);

Route::resource('/list', ListController::class);
Route::get('/list/{id}/{order}', [ListController::class, "show"]);
Route::get('/list/{id}/{order}/{sort}', [ListController::class, "show"]);

Route::resource('/detail', detailController::class);
