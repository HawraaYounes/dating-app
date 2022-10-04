<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function getUsers(Request $request){
        $token=$request->token;
        if(!$token){
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
        $user = Auth::user();
        $blockedIds = $user->blockedUsers->pluck('id')->toArray();
        $users = User::whereNotIn('id',$blockedIds)
        ->where('id',"!=",$user->id)->
        where('gender','=',$user->preffered_gender)->get();
        return response()->json([
            "status" => "Success",
            "data" => $users
        ]);
    }
}
