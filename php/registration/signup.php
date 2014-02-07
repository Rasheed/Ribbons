<?php
include ('/classes/person.php');
$person = new Person();
$person->prefix = "Mr.";
$person->givenName = "John";

echo($person->prefix);
echo($person->givenName);
?>