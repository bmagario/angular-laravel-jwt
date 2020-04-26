<?php

namespace App\Http\Controllers;

use App\Helpers\data_types\TDResponse;
use App\Http\Controllers\Controller;
use App\Http\Models\Users\UserModel;

class HomeController extends Controller{

    public function testAuth(){
        $user = UserModel::getUserById($this->getCurrentUser()->id_user);
        return $this->encodeMessage($user['first_name'], TDResponse::OK);
    }
}
