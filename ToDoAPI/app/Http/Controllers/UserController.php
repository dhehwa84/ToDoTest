<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;



class UserController extends Controller
{
    /**
     * create a user
     * @param $id - user id
     * @return - returns user infor
     */
    public function me($id){
        $user = User::find($id);
        $user['baseUrl'] = url('');
        return  $user;
    }
    /**
     * create a user
     * @param $request - takes request object
     * @return - returns a JSON response
     */
    public function store(Request $request){

        $id = DB::table('users')->insertGetId([
            'name' => $request['name'],
            'surname' => $request['surname'],
            'email' => $request['email'],
            'image' => $request['image'],
            'password' => $request['password'],
            'thumbnail' => $request['thumbnail']
            ]);
        if(User::create($request->all())) {
            return response()->json(['response' => 'success'], 201);
        }
        else {
            return response()->json(['error' => 'failed to update'], 401);
        }
    } 
    /**
    * update a user
    * @param $request - takes request object
    * @param $id - user id
    * @return - returns a JSON response
    */
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

    public function setimage(Request $request, $id){
        if($request->hasFile('image')) {
            
            //Upload File
           $filenametostore = Storage::disk('public') -> put('fullImage',$request->file('image'));
            
           // store image to convert later as thumbnail
            $thumbnail = Storage::disk('public') -> put('thumbnail',$request->file('image'));

            // create thumbnail
             $this->createThumbnail( public_path().'/img/thumbnail/'.basename($thumbnail), 10, 93);


             // update user profile image and thumbnail
             User::where('id', $id)->update(array(
                 'image' =>  '/img/fullImage/'.basename($filenametostore), 
                 'thumbnail' => '/img/thumbnail/'.basename($thumbnail)
                ));

            return response()->json([
                'image' => '/img/fullImage/'.basename($filenametostore),
                'thumbnail' => '/img/fullImage/'.basename($thumbnail),
                'baseUrl' => url('')
            ], 201);
        }else{
            return response()->json(['error' => 'no files'], 500);
        }
        }
    /**
     * Create a thumbnail of specified size
     *
     * @param string $path path of thumbnail
     * @param int $width
     * @param int $height
     */
    public function createThumbnail($path, $width, $height)
    {
        $img = Image::make($path)->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });
        $img->save($path);
    }

}
