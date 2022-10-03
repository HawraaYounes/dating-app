<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post("/login", [AuthController::class, "login"])->name("login");

Route::group(["middleware" => "auth:api"], function(){
    Route::get("/getUsers", [UserController::class, "getUsers"])->name("getUsers");  

});
