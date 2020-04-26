<?php
namespace App\Helpers\data_types;

class TDResponse {
	const OK = 1;
	const ERROR = 2;
	const WARNING = 2;

	public static $dictionary = [
		self::OK => 'OK',
		self::ERROR => 'ERROR',
		self::WARNING => 'WARNING'
	];

	public static function getDescriptionStatic($code) {
		return self::$dictionary[intval($code)];
	}

	public static function isOkStatic($code){
		return intval($code) === self::OK;
	}

	public static function isErrorStatic($code){
        return intval($code) === self::ERROR;
    }

    public static function isWarningStatic($code){
        return intval($code) === self::WARNING;
	}
}
