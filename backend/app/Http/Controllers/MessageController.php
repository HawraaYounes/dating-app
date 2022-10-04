<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Auth;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    function sendMessage(Request $request){
        $token=$request->token;
        if(!$token){
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
        $message = Message::create([
            'sender_id' => Auth::user()->id,
            'receiver_id'=>$request->receiver_id,
            'content'=>$request->content
        ]);
        $message->save();
        return response()->json([
            "status" => "Success",
            "data" => $message
        ]);
    }
}
