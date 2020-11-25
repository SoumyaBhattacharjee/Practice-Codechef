<?php


function take_user_to_codechef_permissions_page($config){

    $params = array('response_type'=>'code', 'client_id'=> $config['client_id'], 'redirect_uri'=> $config['redirect_uri'], 'state'=> 'xyz');
    header('Location: ' . $config['authorization_code_endpoint'] . '?' . http_build_query($params));
    die();
}

function generate_access_token_first_time($config, $oauth_details){

    $oauth_config = array('grant_type' => 'authorization_code', 'code'=> $oauth_details['authorization_code'], 'client_id' => $config['client_id'],
                          'client_secret' => $config['client_secret'], 'redirect_uri'=> $config['redirect_uri']);
    $response = json_decode(make_curl_request($config['access_token_endpoint'], $oauth_config), true);
    $result = $response['result']['data'];

    $oauth_details['access_token'] = $result['access_token'];
    $oauth_details['refresh_token'] = $result['refresh_token'];
    $oauth_details['scope'] = $result['scope'];

    return $oauth_details;
}

function generate_access_token_from_refresh_token($config, $oauth_details){
    $oauth_config = array('grant_type' => 'refresh_token', 'refresh_token'=> $oauth_details['refresh_token'], 'client_id' => $config['client_id'],
        'client_secret' => $config['client_secret']);
    $response = json_decode(make_curl_request($config['access_token_endpoint'], $oauth_config), true);
    $result = $response['result']['data'];

    $oauth_details['access_token'] = $result['access_token'];
    $oauth_details['refresh_token'] = $result['refresh_token'];
    $oauth_details['scope'] = $result['scope'];

    return $oauth_details;

}

function make_api_request($oauth_config, $path){
    $headers[] = 'Authorization: Bearer ' . $oauth_config['access_token'];
    return make_curl_request($path, false, $headers);
}


function make_curl_request($url, $post = FALSE, $headers = array())
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    if ($post) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post));
    }

    $headers[] = 'content-Type: application/json';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);
    return $response;
}


function make_contest_problem_api_request($config,$oauth_details,$tag,$limit,$offset){
    //tags/problems?filter=&fields=&limit=&offset="
    $path= $config['api_endpoint']."tags/problems?"."limit=".$limit."&offset=".$offset;
    $path = $config['api_endpoint']."tags/problems?"."filter=".$tag."&limit=".$limit."&offset=".$offset;
  //  $path = $config['api_endpoint']."/problems/school?"."limit=".$limit."&offset=".$offset;
   echo $path;
    $response = make_api_request($oauth_details, $path);
    return $response;
}
/*
function main(){
    
    $config = array('client_id'=> '8250135d2a0f64c1b8654e46caf75d01',
        'client_secret' => '16c59b4ba13621f4b8c2ac1a0ae6e111',
        'api_endpoint'=> 'https://api.codechef.com/',
        'authorization_code_endpoint'=> 'https://api.codechef.com/oauth/authorize',
        'access_token_endpoint'=> 'https://api.codechef.com/oauth/token',
        'redirect_uri'=> 'http://localhost:8000/',
        'website_base_url' => 'http://localhost:8000/');

    $oauth_details = array('authorization_code' => '',
        'access_token' => '',
        'refresh_token' => '');

    if(isset($_GET['code'])){
        $oauth_details['authorization_code'] = $_GET['code'];
        $oauth_details = generate_access_token_first_time($config, $oauth_details);
       
        for($i=0;$i<0;$i++){
            $server="localhost";
            $user="root";
            $pass="";

            $con=mysqli_connect($server,$user,$pass);
            if(!$con)
            {
                die("connection failed due to ".mysqli_connection_error());
            }
            //$sql="INSERT INTO 'tag_count'.'tagcount' ('tag','type','count') VALUES      "
         
        $response = make_contest_problem_api_request($config, $oauth_details,20,1812+20*$i);
        //$oauth_details = generate_access_token_from_refresh_token($config, $oauth_details);         //use this if you want to generate access_token from refresh_token
        //$jsonString = $response->getBody();
        //echo gettype($response)."<br>";
        $body =  json_decode($response,TRUE);
        
        foreach($body["result"]["data"]["content"] as $a=>$b)
        {
            $tag=$a;
            $count=$b['count'];
            $type=$b['type'];
            $sql= "INSERT INTO `tag_count`.`tagcount` (`tag`,`type`,`count`) VALUES ('$tag','$type','$count');";
          //  $sql="INSERT INTO `tag_count`.`tagcount` (`id`, `tag`, `type`, `count`) VALUES (NULL, 'binary-search', 'author', '142');";
            echo $a."             ".$b["type"]."<br>";
            if($con->query($sql)==true)
            echo "SUCCESS\n";
            else echo "LOL FAILURE $con->error\n";
        }
       echo count($body["result"]["data"]["content"]);}
       $con->close();
    } else{
        take_user_to_codechef_permissions_page($config);
    }
    
}

main();*/
function main(){
    
    $config = array('client_id'=> '8250135d2a0f64c1b8654e46caf75d01',
        'client_secret' => '16c59b4ba13621f4b8c2ac1a0ae6e111',
        'api_endpoint'=> 'https://api.codechef.com/',
        'authorization_code_endpoint'=> 'https://api.codechef.com/oauth/authorize',
        'access_token_endpoint'=> 'https://api.codechef.com/oauth/token',
        'redirect_uri'=> 'http://localhost:8000/',
        'website_base_url' => 'http://localhost:8000/');

    $oauth_details = array('authorization_code' => '',
        'access_token' => '',
        'refresh_token' => '');
    
        $server="localhost";
        $user="root";
        $pass="";
    
        $con=mysqli_connect($server,$user,$pass);
        if(!$con)
        {
            die("connection failed due to ".mysqli_connection_error());
        }
    /*    $sql="SELECT * FROM `tag_count`.`tagcount` WHERE type='actual_tag'";
        $res=$con->query($sql);
       
        $ans=array();
       while ($rows = $res->fetch_assoc()) {
           array_push($ans,array("id"=>$rows["id"],"tag"=>$rows["tag"],"type"=>$rows["type"],"count"=>$rows["count"]));
        }
    print_r(count($ans));    
    */
    for($p=0;$p<1;$p++){
    
    if(isset($_GET['code'])){
        $oauth_details['authorization_code'] = $_GET['code'];
        $oauth_details = generate_access_token_first_time($config, $oauth_details);

        $response = make_contest_problem_api_request($config, $oauth_details,"hard",99,240+100*$p);
        
        $body =  json_decode($response,TRUE);
        print_r($body);
        foreach($body["result"]["data"]["content"] as $a=>$b)
        {
            $code=$a;
            $solved=$b['solved'];
            $attempted=$b['attempted'];
            $partsol=$b['partiallySolved'];
            $sql="SELECT * FROM `problems`.`problems` WHERE code='$a'";
            $res=$con->query($sql);
            //echo $sql;
            $ans=array();
            $c=0;
            while ($rows = $res->fetch_assoc()) {
                $c++;
            }
            if($c) {
                echo "LOL YA"."<br>";
                continue;
            }
            for($j=0;$j<count($b["tags"]);$j++){
                $tag=$b["tags"][$j];
            $sql= "INSERT INTO `problems`.`problems` (`code`,`tag`,`attempted`,`solved`,`partsolved`) VALUES ('$code','$tag','$attempted','$solved','$partsol');";
          //  $sql="INSERT INTO `tag_count`.`tagcount` (`id`, `tag`, `type`, `count`) VALUES (NULL, 'binary-search', 'author', '142');";
            echo $a."             ".$b["tags"][$j]."<br>";
            if($con->query($sql)==true)
            echo "SUCCESS\n";
            else echo "LOL FAILURE $con->error\n";
            }
        }
      // print_r($body);
        
    } else{
        take_user_to_codechef_permissions_page($config);
    }
} 
}

//main();
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'https://codechef-practice.herokuapp.com')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
$app->get('/', function (Request $request, Response $response, array $args) {
    $name = "Soumya";
    $response->getBody()->write("Hello, $name");
    return $response;
});
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("HI, $name ");
    echo "HELLO HI";
    return $response;
});


//require "../src/customer.php";
require "../src/db.php";
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});
$app->run();



























/*use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;
$app->get('/', function (Request $request, Response $response, array $args) {
    $name = "Soumya";
    $response->getBody()->write("Hello, $name");
    return $response;
});
$app->get('/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");

    return $response;
});
require "../src/customer.php";
$app->run();
*/