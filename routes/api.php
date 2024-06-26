<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register',[AuthController::class,'signup'])->name('register');
Route::post('/login',[AuthController::class,'login'])->name('login');
Route::post('/store',[WalletController::class,'store'])->middleware('auth:sanctum');   
Route::post('/send',[WalletController::class,'send'])->middleware('auth:sanctum');   
Route::post('/ajouter',[WalletController::class,'add'])->middleware('auth:sanctum');   
Route::get('/get',[WalletController::class,'get']);   
Route::get('/mine',[WalletController::class,'mine'])->middleware('auth:sanctum');   
Route::get('/Mywallets',[WalletController::class,'history'])->middleware('auth:sanctum');
Route::get('/logout',[AuthController::class,'logout'])->name('logout');
