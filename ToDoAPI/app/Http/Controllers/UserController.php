<?php

namespace App\Http\Controllers;

use App\User;
use http\Env\Response;
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
        $user = User::find($id);
        $user['baseUrl'] = url('');
        return  $user;
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

    public function setimage(Request $request, $id){
        if ($request->hasFile('image'))
        {
            $fileName = $_FILES["image"]["name"];
            $fileUrl = "/img/".$_FILES["image"]["name"];
            $path = $request->file('image')->move(public_path('/img'), $fileName);
            User::where('id', $id)->update(array('image' => $fileUrl));

            return url(''.$fileUrl);
        }else{
            return response()->json(['error' => 'no files'], 500);
        }
    }
    public function testImageDownload(){
        return response()->download(public_path('img/image.jpg'), 'image');
    }

}
