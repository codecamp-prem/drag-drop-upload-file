<?php
   if(isset($_FILES['file'])){
      $errors= array();
      $file_name = $_FILES['file']['name']; //the actual name of the uploaded file.
      $file_size =$_FILES['file']['size']; //the size in bytes of the uploaded file.
      $file_tmp =$_FILES['file']['tmp_name']; //the uploaded file in the temporary directory on the web server.
      $file_type=$_FILES['file']['type']; //the MIME type of the uploaded file
      $file_ext=strtolower(end(explode('.',$_FILES['file']['name'])));

      $expensions= array("jpeg","jpg","png");

      if(in_array($file_ext,$expensions)=== false){
         $errors["msg"]="extension not allowed, please choose a JPEG or PNG file.";
      }

      if($file_size > 2097152){
         $errors["msg"]='File size must be excately 2 MB';
      }

      if(empty($errors)==true){
         move_uploaded_file($file_tmp,"images/".$file_name);
         echo json_encode(array("result"=>"Success"));
      }else{
        $errors["result"]="failed";
        echo json_encode($errors);
      }
   }
?>
