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

    function getMessages(Request $request){
        $token=$request->token;
        if(!$token){
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
        $my_id = Auth::user()->id;
        $user_id = $request->user_id;
        // Get all message from selected user
        $messages = Message::where(function ($query) use ($user_id, $my_id) {
            $query->where('sender_id', $user_id)->where('receiver_id', $my_id);
        })->oRwhere(function ($query) use ($user_id, $my_id) {
            $query->where('sender_id', $my_id)->where('receiver_id', $user_id);
        })->orderBy('created_at')->get();
        return response()->json([
            "status" => "Success",
            "data" => $messages
        ]);
    }
}
