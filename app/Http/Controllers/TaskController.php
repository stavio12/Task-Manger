<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;


class TaskController extends Controller
{

    public function _contruct()
    {
        $this->middleware("auth");
    }



    public function index(Request $request, Task $task)
    {
        //Get all tasks based on user id

        $allTasks = $task->whereIn("user_id", $request->user())->with('user');
        

        //take method show how many of the tasks to query
        $tasks = $allTasks->orderBy("created_at", "desc")->take(10)->get();
    
        //return tasks as objects

        return response()->json([
            'tasks'=>$tasks
        ]);

        // dd($allTasks);
    }

  
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        // Validate Input
$this->validate($request, ["name"=>"required|max:255"]);  


//create a new task based on user taks relationship
$task = $request->user()->tasks()->create([
    "name"=>$request->name,
]);


//Return task with user object

return response()->json($task->with("user")->find($task->id));

}




  
    public function show($id)
    {
        //
    }

  
    public function edit($id)
    {
$task = Task::findOrFail($id);
return response()->json([
    "task"=>$task
]);
    }

  
    public function update(Request $request, $id)
    {
$input = $request->all();
$task = Task::findorFail($id);
$task->update($input);
return response()->json($task->with('user')->find($task->id));  
  }

   
    public function destroy($id)
    {
Task::findOrFail($id)->delete();
    }
}
