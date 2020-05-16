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

Route::prefix('v1')->group(function () {

    Route::get('/characters', 'CharacterController@index')->name('getCharacters');
    Route::get('/characters/search', 'CharacterController@search')->name('searchCharacters');
    Route::get('/characters/{id}', 'CharacterController@read')->name('readCharacter');

});



