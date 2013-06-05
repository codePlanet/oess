<?php
/***************************************************************************************************
 *  Database Parameters
 *
 * These are parameters for the database connection.
 **************************************************************************************************/
$host   = 'codeplanetapps.com';
$dbname = 'oess';
$user   = 'oess';
$pass   = 'sHWNBKF6Xzmnt7Wm';

try {
	// Connect to the database
	$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
	$db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING );
} catch (PDOException $e) {
	echo $e->getMessage();
}