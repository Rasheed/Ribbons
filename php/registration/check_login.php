<?php
if($_POST['action'] == "check_login") {
  $username = $_POST['username'];
  $password = $_POST['password'];
  
  echo $password;
}
?>