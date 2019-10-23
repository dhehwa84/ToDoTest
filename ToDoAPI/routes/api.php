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

    // user routes
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');

    Route::get('me/{id}', 'UserController@me');
    Route::put('update/{id}', 'UserController@update');
    Route::post('setimage/{id}', 'UserController@setimage');
    Route::get('test', 'UserController@testImageDownload');
    Route::post('testpost', 'UserController@testImageUpload');


    //task routes
    Route::get('task', 'TaskController@index');
    Route::get('showtask/{id}', 'TaskController@showtask');
    Route::get('tasks/{id}', 'TaskController@show');
    Route::post('task', 'TaskController@store');
    Route::post('task/{id}', 'TaskController@update');
    Route::delete('task/{id}', 'TaskController@delete');

});
