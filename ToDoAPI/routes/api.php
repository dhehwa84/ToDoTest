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
    Route::post('me', 'AuthController@me');
    Route::post('sendPasswordResetLink', 'ResetPasswordController@sendEmail');

    Route::get('task', 'TaskController@index');
    Route::get('task/{id}', 'TaskController@show');
    Route::post('task', 'TaskController@store');
    Route::put('task/{id}', 'TaskController@update');
    Route::delete('task/{id}', 'TaskController@delete');
});
