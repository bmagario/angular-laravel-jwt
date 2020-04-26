<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\data_types\TDResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Models\Users\UserModel;

class ChangePasswordController extends Controller
{
    public function reset(Request $request) {
        $array = [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ];
        try {
            Controller::validatorRequest($request, $array);
            $existeToken = UserModel::getChangeUserPasswordReset($request->email, $request->resetToken)->count() > 0;
            if($existeToken){
                UserModel::changePassword($request->email, $request->password);
                UserModel::deleteUserPasswordReset($request->email, $request->resetToken);
                $status = TDResponse::OK;
                return $this->encodeMessage(null, $status);
            } else {
                $status = TDResponse::ERROR;
                return $this->encodeMessage(null, $status);
            }
        } catch (\Exception $ex) {
            $status = TDResponse::ERROR;
            return $this->encodeMessage(null, $status);
        }
    }

    public function change(Request $request) {
        $array = [
            'email' => 'required|string|email',
            'currentPassword' => 'required|string',
            'password' => 'required|string'
        ];
        try {
            $email = Controller::getCurrentUser()->email;
            $request->request->add(['email' => $email]);
            Controller::validatorRequest($request, $array);
            if (UserModel::checkPassword($request->email, $request->currentPassword)) {
                UserModel::changePassword($request->email, $request->password);
                $status = TDResponse::OK;
                return $this->encodeMessage(null, $status);
            } else {
                $status = TDResponse::ERROR;
                return $this->encodeMessage(null, $status);
            }
        } catch (\Exception $ex) {
            $status = TDResponse::ERROR;
            return $this->encodeMessage(null, $status);
        }
    }
}
