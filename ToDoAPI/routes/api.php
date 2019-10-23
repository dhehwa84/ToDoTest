<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group([

    'middleware' => 'api'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me/{id}', 'UserController@me');
    Route::put('update/{id}', 'UserController@update');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');

    Route::get('task', 'TaskController@index');
    Route::get('showtask/{id}', 'TaskController@showtask');
    Route::get('tasks/{id}', 'TaskController@show');
    Route::post('task', 'TaskController@store');
    Route::put('task/{id}', 'TaskController@update');
    Route::delete('task/{id}', 'TaskController@delete');
});
