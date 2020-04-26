<?php

namespace App\Http\Models\Users;

use App\Helpers\data_types\TDResponse;
use App\Http\Models\ApiModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;
use App\Helpers\data_types\TDStatus;
use App\Helpers\TokenHelper;
use App\User;

class UserModel extends ApiModel {

    public static function getUserById($id_user) {
        return User::where('id_user', $id_user)->first();
    }

    public static function getUserByEmail($email) {
        return User::where('email', $email)->first();
    }

    public static function checkPassword($email, $currentPassword) {
        $user = UserModel::getUserByEmail($email);
        return Hash::check($currentPassword, $user->password);
    }
    public static function changePassword($email, $password) {
        $user = UserModel::getUserByEmail($email);
        $user->update(['password' => $password]);
    }

    public static function getChangeUserPasswordReset($email, $resetToken) {
        return DB::table('user_password_reset')->where(['email' => $email,'token' => $resetToken]);
    }

    public static function deleteUserPasswordReset($email, $resetToken) {
        UserModel::getChangeUserPasswordReset($email, $resetToken)->delete();
    }

	/**
	 * Get user from BD
	 *
	 * @return Array
	 */
    public function getUser($id_user) {
        try {
            $query = "
            SELECT
                IFNULL(first_name, '') first_name,
                IFNULL(last_name, '') last_name,
				IFNULL(email, '') email
            FROM
				user u
            WHERE
                u.id_user = :id_user
                AND u.id_status = :status
			;";
			$data = DB::select(
                DB::raw($query),
                array(
					'id_user' => $id_user,
					'status' => TDStatus::ENABLED
                )
            );
            $status = TDResponse::OK;
            return $this->encodeMessage($data, $status);
        } catch(QueryException $ex) {
            $status = TDResponse::ERROR;
            return $this->encodeMessage(null, $status);
        }
	}

    public function registerUser($first_name, $last_name, $email) {
        try {
            if(!$this->_userExists($email)) {
                $query = "
                INSERT INTO user
                    (first_name, last_name, email, password)
                VALUES
                    (:first_name, :last_name, :email, :password)
                ;";
                $data = DB::select(
                    DB::raw($query),
                    array(
                        'email' => $email,
                        'first_name' => $first_name,
                        'last_name' => $last_name,
                        'password' => bcrypt(TokenHelper::generate()),
                    )
                );
                $status = TDResponse::OK;
                return $this->encodeMessage($data, $status);
            } else {
                $status = TDResponse::ERROR;
                return $this->encodeMessage(null, $status);
            }
        } catch(QueryException $ex) {
            $status = TDResponse::ERROR;
            return $this->encodeMessage(null, $status);
        }
    }

    /*
    * @param email to check.
    * @return Boolean Check the existence of a user giving an email.
    */
    private function _userExists($email) {
        $query = "
        SELECT
            1
        FROM
            user
        WHERE
			email = :email
        ;";

		$data = DB::select(
            DB::raw($query),
            array(
			   'email' => $email,
            )
        );

        return !empty($data);
    }
}
