<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use InvalidArgumentException;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function getCurrentUser() {
        return auth()->user();
    }

    public function encodeMessage($data, $status){
        return json_encode(['data' => $data, 'status' => $status]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param array $rules with de rules validates
     * @param @request example: $array = ['first_name' => 'required|string','last_name' => 'required|string','email' => 'required|string|email'];
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function validatorRequest(Request $request, array $rules) {
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            throw new InvalidArgumentException($validator->messages());
        }

        return true;
    }
}
