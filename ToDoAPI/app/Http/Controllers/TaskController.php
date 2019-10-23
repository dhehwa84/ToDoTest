<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    public function index(){
        return Task::all();
    }
    public function show($id){
        // return Task::find($id);
        return Task::where('created_by', '=', $id)->get();
    }
    public function showtask($id){
        return Task::find($id);

    }
    public function store(Request $request){

        $task =  Task::create($request->all());
        if($task) {
            return response()->json(['message' => 'success'], 201);
        }
        else {
            return Task::create($request->all());
        }

    }
    public function update(Request $request, $id){
        $task = Task::findOrFail($id);
        $task->update($request->all());
        return $task;
    }
    function delete(Request $request, $id){
        $task = Task::findORFail($id);
        $task->delete();

        return 204;
    }

}
