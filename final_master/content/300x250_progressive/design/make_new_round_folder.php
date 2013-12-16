<?php 
$new_named_folder = $_POST["new_folder"];
exec('xcopy round_template '.$new_named_folder.' /e/i', $a, $a1); 
?> 
