<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Get the phone record associated with the user.
     */

    public function index(){
        return User::all();
    }
    public function me($id){
        //return Auth::user();
        return User::find($id);
    }
    public function store(Request $request){
        return User::create($request->all());
    }
    public function update(Request $request, $id){
        $user = User::findOrFail($id);
        $user->update($request->all());

        if($user) {
            return response()->json(['response' => 'success'], 201);
        }
        else {
            return response()->json(['error' => 'failed to update'], 401);
        }
    }
    function delete(Request $request, $id){
        $task = User::findORFail($id);
        $task->delete();

        return 204;
    }

}
