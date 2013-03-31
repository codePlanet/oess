<?php
/***************************************************************************************************
 *  POST Variables
 *
 * These are variables that come from the frontend.
 **************************************************************************************************/
$mode   = htmlentities($_GET['mode']);
$table  = htmlentities($_GET['table']);
$fields = implode(',', $_GET['fields']);
$values = $_GET['values'];

/***************************************************************************************************
 *  Database Parameters
 *
 * These are parameters for the database connection.
 **************************************************************************************************/
$host = 'codeplanetapps.com';
$dbname = 'senior_design';
$user = 'senior_design';
$pass = '77dj7HC2LcBDjCPV';

// Exception handling
try {
	// Connect to the database
	$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
	
	// If Select is chosen
	if(strtolower($mode) == 'select') {
		// Query string
		$query = "SELECT " . $fields . " from " . $table;
		// Create query statement to run
		$stmt = $db->query($query);
		// Fetch method
		$stmt->setFetchMode(PDO::FETCH_ASSOC);
		
		// Grab each row
		$result = array();
		while($row = $stmt->fetch()) {
			$name  = $row['name'];
			$dob   = $row['dob'];
			$phone = $row['phone'];
			$email = $row['email'];
			
			array_push($result, array('name' => $name, 'dob' => $dob, 'phone' => $phone, 'email' => $email));
		}
		
		// Echo json to the page. 
		echo json_encode($result);
	}
	// If Insert is chosen
	else if($mode == 'insert') {
		// Parse values because we need to get them in the format: 'var1','var2','var3',...
		$temp = $values;
		$values = '';
		foreach ($temp as $value) {
			$values .= "'$value',";
		}
		
		// Remove last comma
		$pos = strrpos($values, ',');
		$values = substr_replace($values, '', $pos, strlen($values));
		
		// Run Query
		$query = "INSERT INTO $table ($fields) values ($values)";
		$stmt = $db->prepare($query);
		$stmt->execute();
	}
	// If delete is Chosen
	else if($mode == 'delete') {
		// Parse fields and values because they need to be in the format: field1='var1' AND field2='var2'...
		$fields = explode(',', $fields);
		$wheres = '';
		for($i = 0; $i < count($values); $i++) {
			$wheres .= "{$fields[$i]}='{$values[$i]}' AND ";
		}
		
		// Remove last AND
		$pos = strrpos($wheres, ' AND ');
		$wheres = substr_replace($wheres, '', $pos, strlen($wheres));
		
		// Run QUery
		$query = "DELETE FROM $table WHERE $wheres";
		echo $query;
		$db->exec($query);
	}
	// If Update is chosen
	else if($mode == 'update') {
		// TODO
	}
}
catch (PDOException $e) {
	echo $e->getMessage();
}