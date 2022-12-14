<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MessageController;

Route::post("/login", [AuthController::class, "login"])->name("login");
Route::post("/signup", [AuthController::class, "register"])->name("signup");

Route::group(["middleware" => "auth:api"], function(){
    Route::post("/me", [AuthController::class, "me"])->name("me");  
    Route::post("/getUsers", [UserController::class, "getUsers"])->name("getUsers");  
    Route::post("/blockUser", [UserController::class, "blockUser"])->name("block"); 
    Route::post("/unblockUser", [UserController::class, "unblockUser"])->name("unblock"); 
    Route::post("/favUser", [UserController::class, "favUser"])->name("favourite"); 
    Route::post("/unfavUser", [UserController::class, "unfavUser"])->name("un-favourite"); 
    Route::post("/sendMessage", [MessageController::class, "sendMessage"])->name("send-message"); 
    Route::post("/getMessages", [MessageController::class, "getMessages"])->name("get-messages"); 
    Route::post("/getFavUsers", [UserController::class, "getFavUsers"])->name("get-fav-users"); 
    Route::post("/checkIfFav", [UserController::class, "checkIfFav"])->name("check-if-fav"); 
    Route::post("/updateProfile", [UserController::class, "updateProfile"])->name("update-profile");  


});
