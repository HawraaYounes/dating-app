<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function getUsers(){
        $user = User::where('preffered_gender', Auth::user()->preffered_gender)
        ->orderBy('location')->get();
        return response()->json([
            "status" => "Success",
            "data" => $user
        ]);
    }
}
