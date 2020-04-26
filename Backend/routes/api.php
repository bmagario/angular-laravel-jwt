<?php
use Illuminate\Support\Facades\Route;

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

// Routes that not need a user authenticated.
// Checks the numbers of attempts (max 5, wait 1 minute).
Route::group(['middleware' => ['throttle:5,1']], function () {
    Route::post('login', 'AuthController@login');
    Route::post('reset-link', 'ResetPasswordController@sendEmail');
    Route::post('reset-password', 'ChangePasswordController@reset');
});

// Routes that will only need a user to be authenticated and jwt token sent.
Route::group(['middleware' => ['api', 'jwt.validate']], function () {
    Route::post('logout', 'AuthController@logout');
    Route::get('test-auth', 'HomeController@testAuth');
});
