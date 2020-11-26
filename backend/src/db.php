<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
//For development purpose
/*
    $name = $args['name'];
    $server="localhost";
    $user="root";
    $pass="";

    $con=mysqli_connect($server,$user,$pass);*/
require '../vendor/autoload.php';
function apiToken($session_uid)
{
$key=md5($session_uid);
return hash('sha256', $key);
}

$app->get('/api/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
   // $server="localhost";
    //$user="root";
    //$pass="";
    $server="remotemysql.com";
    $user="b0gCO7O3CV";
    $pass="cayeofmrK2";
    $dab="b0gCO7O3CV";
    $con=mysqli_connect($server,$user,$pass,$dab);
    if(!$con)
    {
        die("connection failed due to ".mysqli_connection_error());
    }

    $sql="SELECT * FROM `tagcount`";
    $res=$con->query($sql);

    $ans=array();
   while ($rows = $res->fetch_assoc()) {
       array_push($ans,array("id"=>$rows["id"],"tag"=>$rows["tag"],"type"=>$rows["type"],"count"=>$rows["count"]));

    }

    $response->getBody()->write("HI, $name ");
    $newResponse = $response->withJson($ans, 201);
  
    return $newResponse;
});

$app->get('/api/key/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $server="remotemysql.com";
    $user="b0gCO7O3CV";
    $pass="cayeofmrK2";
    $dab="b0gCO7O3CV";
    $con=mysqli_connect($server,$user,$pass,$dab);
    if(!$con)
    {
        die("connection failed due to ".mysqli_connection_error());
    }
    $sql="SELECT * FROM `tagcount` WHERE type='$name'";
    $res=$con->query($sql);

    $ans=array();
    $c=1;
   while ($rows = $res->fetch_assoc()) {
       array_push($ans,array("id"=>$c,"tag"=>$rows["tag"],"type"=>$rows["type"],"count"=>$rows["count"]));

        $c++;
    }

    $response->getBody()->write("HI, $name ");
    $newResponse = $response->withJson($ans, 201);
  
    return $newResponse;
});
$app->get('/api/problems/{name}', function (Request $request, Response $response, array $args) {
  $name = $args['name'];
  $server="remotemysql.com";
  $user="b0gCO7O3CV";
  $pass="cayeofmrK2";
  $dab="b0gCO7O3CV";
  $con=mysqli_connect($server,$user,$pass,$dab);
  if(!$con)
  {
      die("connection failed due to ".mysqli_connection_error());
  }
  $sql="SELECT * FROM `problems` WHERE tag='$name'";
  $res=$con->query($sql);
  //print_r($res);
  $ans=array();
  $c=1;
 while ($rows = $res->fetch_assoc()) {
     array_push($ans,array("id"=>$c,"tag"=>$name,"code"=>$rows["code"],"attempted"=>$rows["attempted"],"solved"=>$rows["solved"],"partsolved"=>$rows["partsolved"]));
      $c++;
  }
 // $res=array('name' => 'Rob', 'age' => 40,"roll"=>array("No"=>152 ,"Reg"=>6584));
  $response->getBody()->write("HI, $name ");
  $newResponse = $response->withJson($ans, 201);

  return $newResponse;
});
$app->post('/register',function(Request $request, Response $response, array $args)
{
  $data = $request->getParsedBody();
  $ans=array("userData"=>$data);
  $userData=$data;
  $server="remotemysql.com";
  $user="b0gCO7O3CV";
  $pass="cayeofmrK2";
  $dab="b0gCO7O3CV";
  $con=mysqli_connect($server,$user,$pass,$dab);
  $email=$data["email"];
  $password=$data["password"];
  $password=hash('sha256',$password);
  //$con=mysqli_connect($server,$user,$pass);
  if(!$con)
  {
      die("connection failed due to ".mysqli_connection_error());
  }
  $sql="SELECT * FROM `users` WHERE email='$email'";
  $res=$con->query($sql);
  $num_rows = mysqli_num_rows($res);
  if($num_rows) echo "User already Registered";
  else{
  $sql= "INSERT INTO `users` (`email`,`password`) VALUES ('$email','$password');";
  $res=$con->query($sql);
  echo "Successfully Registered";
  }
});
$app->post('/login',function(Request $request, Response $response, array $arg)
{
  $data = $request->getParsedBody();
  $ans=array("userData"=>$data);
  $userData=$data;
  $server="remotemysql.com";
  $user="b0gCO7O3CV";
  $pass="cayeofmrK2";
  $dab="b0gCO7O3CV";
  $con=mysqli_connect($server,$user,$pass,$dab);
  $email=$data["email"];
  $password=$data["password"];
  $password=hash('sha256',$password);
  //$con=mysqli_connect($server,$user,$pass);
  if(!$con)
  {
      die("connection failed due to ".mysqli_connection_error());
  }
  $sql="SELECT * FROM `users` WHERE email='$email' ";
  $res=$con->query($sql);
  $ans=array();
 while ($rows = $res->fetch_assoc()) {
     array_push($ans,array("user_id"=>$rows["id"],"email"=>$rows["email"],"password"=>$rows["password"]));
  }

  if(count($ans))
  {
    $userData=$ans[0];
     $user_id=$userData["user_id"];
     $userData["token"]=apiToken($user_id);
     //$userData->token = apiToken($user_id);
     $userData = json_encode($userData);
     echo '{"userData": ' .$userData . '}';
  }
 else {
   echo '{"error":{"text":"Bad request wrong username and password"}}';
}
  
});
$app->get('/api/tagofproblems/{name}', function (Request $request, Response $response, array $args) {
  $name = $args['name'];
  $server="remotemysql.com";
  $user="b0gCO7O3CV";
  $pass="cayeofmrK2";
  $dab="b0gCO7O3CV";
  $con=mysqli_connect($server,$user,$pass,$dab);
  if(!$con)
  {
      die("connection failed due to ".mysqli_connection_error());
  }
  $sql="SELECT * FROM `problems` WHERE code='$name'";
  $res=$con->query($sql);

  $ans=array();
  $c=1;
 while ($rows = $res->fetch_assoc()) {
     array_push($ans,array("id"=>$c,"tag"=>$rows["tag"]));
      $c++;
  }
  

 
  $newResponse = $response->withJson($ans, 201);

  return $newResponse;
});
$app->post('/api/tagofproblems', function (Request $request, Response $response, array $args) {

  $server="remotemysql.com";
  $user="b0gCO7O3CV";
  $pass="cayeofmrK2";
  $dab="b0gCO7O3CV";
  $con=mysqli_connect($server,$user,$pass,$dab);
  if(!$con)
  {
      die("connection failed due to ".mysqli_connection_error());
  }
  $data = $request->getParsedBody();
  $email=$data["email"];
  $code=$data["code"];
  $tag=$data["tag"];
  $sql="SELECT * FROM `usertags` WHERE email='$email' AND code='$code' AND tag='$tag'";
  $res=$con->query($sql);
  $num_rows = mysqli_num_rows($res);
  if($num_rows)
  echo "Already entered";
  else{
  $sql= "INSERT INTO `usertags` (`email`,`code`,`tag`) VALUES ('$email','$code','$tag');";
  $res=$con->query($sql);
  echo "Successfully Entered";
  }
});
$app->post('/usertags', function (Request $request, Response $response, array $args) {

  $server="remotemysql.com";
  $user="b0gCO7O3CV";
  $pass="cayeofmrK2";
  $dab="b0gCO7O3CV";
  $con=mysqli_connect($server,$user,$pass,$dab);
  if(!$con)
  {
      die("connection failed due to ".mysqli_connection_error());
  }
  $data = $request->getParsedBody();
  $email=$data["email"];
  $code=$data["code"];
  $tag=$data["tag"];
  $sql="SELECT * FROM `usertags` WHERE email='$email' AND code='$code'";
  $res=$con->query($sql);
  $ans=array();
  $c=1;
  while ($rows = $res->fetch_assoc()) {
     array_push($ans,array("id"=>$c,"tag"=>$rows["tag"]));
      $c++;
  }
  $newResponse = $response->withJson($ans, 201);

  return $newResponse;
});
$app->post('/getalltags', function (Request $request, Response $response, array $args) {

  $server="remotemysql.com";
  $user="b0gCO7O3CV";
  $pass="cayeofmrK2";
  $dab="b0gCO7O3CV";
  $con=mysqli_connect($server,$user,$pass,$dab);
  if(!$con)
  {
      die("connection failed due to ".mysqli_connection_error());
  }
  $data = $request->getParsedBody();
  $email=$data["email"];


  $sql="SELECT * FROM `usertags` WHERE email='$email' ";
  $res=$con->query($sql);
  $ans=array();
  $c=1;
  $dict=[];
  while ($rows = $res->fetch_assoc()) {
    $code2=$rows["code"];
    if(array_key_exists($rows["code"],$dict)) continue;
    $dict[$rows["code"]]=1;
    $sql="SELECT * FROM `usertags` WHERE email='$email' AND code='$code2'";
    $res2=$con->query($sql);
    $ans2=array();
    while ($rows2 = $res2->fetch_assoc()) {
      array_push($ans2,$rows2["tag"]);
    }
     array_push($ans,array("id"=>$c,"code"=>$rows["code"],"tag"=>$ans2));
      $c++;
  }
  $newResponse = $response->withJson($ans, 201);

  return $newResponse;
});
$app->post('/userprobs', function (Request $request, Response $response, array $args) {

  $server="remotemysql.com";
  $user="b0gCO7O3CV";
  $pass="cayeofmrK2";
  $dab="b0gCO7O3CV";
  $con=mysqli_connect($server,$user,$pass,$dab);
  if(!$con)
  {
      die("connection failed due to ".mysqli_connection_error());
  }
  $data = $request->getParsedBody();
  $email=$data["email"];
$tag=$data["tag"];

  $sql="SELECT * FROM `usertags` WHERE email='$email' and tag='$tag' ";
  $res=$con->query($sql);
  $ans=array();
  $c=1;
  $dict=[];
  while ($rows = $res->fetch_assoc()) {
     array_push($ans,array("id"=>$c,"code"=>$rows["code"]));
      $c++;
  }
  $newResponse = $response->withJson($ans, 201);

  return $newResponse;
});
