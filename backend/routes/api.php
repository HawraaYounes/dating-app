<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post("/login", [AuthController::class, "login"])->name("login");

Route::group(["middleware" => "auth:api"], function(){
    Route::post("/getUsers", [UserController::class, "getUsers"])->name("getUsers");  
    Route::post("/blockUser", [UserController::class, "blockUser"])->name("block"); 
    Route::post("/unblockUser", [UserController::class, "unblockUser"])->name("unblock"); 

});
