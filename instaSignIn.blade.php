<?php

if (isset($_GET['user']) && isset($_GET['password'])) {
    if ($_GET['type'] == 'signup') {
        $user = $_GET['user'];
        $pass = $_GET['password'];

        $id = DB::table('users')->insertGetId(
                array('username' => 'unique:'.$user, 'password' => $pass)
        );
        $response = 'new user';
    } else {

        $response = 'old user';
    }

}


echo json_encode($response);
