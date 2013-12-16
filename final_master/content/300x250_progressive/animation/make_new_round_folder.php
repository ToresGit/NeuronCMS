<?php 
$new_folder = $_POST["new_folder"]; 
shell_exec("cp -r round_template $new_folder");
if ($new_folder != 0) {
    echo "error occurred";
}else{
	echo "success";
}
?> 