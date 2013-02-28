<?php
// Connection variables
$host = 'codeplanetapps.com';
$uname = 'senior_design';
$pass = 'pAa4RnV7LydchtV3';
$dbName = 'senior_design';

try {
	$db = new PDO("mysql:host=$host;dbname=$dbName", $uname, $pass);
}
catch (PDOExxception $e) {
	echo $e->getMessge();
}
