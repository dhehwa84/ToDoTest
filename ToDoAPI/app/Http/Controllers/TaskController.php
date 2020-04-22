<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    /**
     * returns all tasks that were created by a user
     * @param $id - takes  user id as param
     * @return JSON object
     */
    public function show($id){
        $tasks = Task::where('created_by', '=', $id)->get();
        
        if(sizeof($tasks) > 0) {
            return response()->json([
                'message' => 'successully retrieved tasks',
                'tasks' => $tasks
            ], 201);
        }
        else {
            return response()->json([
                'error' => 'you do not have any tasks, click the + button to add.'
            ], 404);
        }
    }
     /**
     * returns a task
     * @param $id - takes  task id as param
     * @return JSON object
     */
    public function showtask($id){
        $task = Task::find($id);
        if($task) {
            return response()->json([
                'message' => 'successully created task',
                'task' => $task
            ], 201);
        }
        else {
            return response()->json([
                'error' => 'failed to add task'
            ], 404);
        }

    }
    /**
     * saves a new task
     */
    public function store(Request $request){

       if(Task::create($request->all())) {
        return response()->json([
            'message' => 'successully created task'
        ], 201);
    }
    else {
        return response()->json([
            'error' => 'failed to add task'
        ], 404);
    }
    }
    
    /**
     * updates a function
     */
    public function update(Request $request){
        $task = Task::findOrFail($request['id']);
   
        if( $task->update($request->all())) {
            return response()->json([
                'message' => 'successully updated task'
            ], 201);
        }
        else {
            return response()->json([
                'error' => 'failed to update task'
            ], 404);
        }

    }
    /**
     * deletes a task
     * @param $id - takes the task ID as parameter
     */
    function delete($id){
        $task = Task::findORFail($id);

        if($task->delete()) {
            return response()->json([
                'message' => 'successully deleted task: '.$task->title
            ], 201);
        }
        else {
            return response()->json([
                'error' => 'failed to delete task'
            ], 404);
        }
    }

}
