<?php

namespace App\Http\Controllers;

use App\Models\Block;
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

    function blockUser(Request $request){
        $token=$request->token;
        if(!$token){
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
        $block = Block::create([
            'blocker_id' => Auth::user()->id,
            'blocking_id'=>$request->blocking_id
        ]);
        $block->save();
        return response()->json([
            "status" => "Success",
            "data" => $block
        ]);
    }

    function unblockUser(Request $request){
        $token=$request->token;
        if(!$token){
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
        $block = Block::where('blocker_id','=',Auth::user()->id)
                      ->where('blocking_id','=',$request->blocking_id)->delete();
        return response()->json([
            "status" => "Success",
            "data" => $block
        ]);
    }
}
