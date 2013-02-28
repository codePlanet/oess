<?php
require_once('connect_to_mysql.php');

$name = $_POST['query'];
$names = array();

try {
	$stmt = $db->query("SELECT name FROM names WHERE name LIKE '%$name%'");
	$stmt->setFetchMode(PDO::FETCH_NUM);
	while($row = $stmt->fetch()) {
		array_push($names, $row[0]);
	}
}
catch (PDOException $e) {
	echo $e->getMessage();
}

echo json_encode($names);