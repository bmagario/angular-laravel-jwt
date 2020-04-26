<?php

namespace App\Http\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;

class ApiModel extends Model
{
    public function getCurrentUser() {
        return auth()->user();
    }

    public function encodeMessage($data, $status){
        return json_encode(['data' => $data, 'status' => $status]);
    }
}
