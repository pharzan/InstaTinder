<?php

require 'assets/lib/instagram/insta.php';
use MetzWeb\Instagram\Instagram;

$QR = 'No query';
$result = array();
$image = array();
$NumberOfInstaPosts = 19;
$instagram = new Instagram(array(
        'apiKey' => 'API KEY',
        'apiSecret' => 'API SECRET',
        'apiCallback' => 'http://www.pharzan.com/insta_success_callback.php' // must point to success.php
));
if (isset($_GET['type'])) {
    if ($_GET['type'] == 'selfie') {


        $result[0] = $instagram->getTagMedia('selfie');

        for ($i = 0; $i <= $NumberOfInstaPosts - 1; $i++) {
            $image['links'][$i] = $result[0]->data[$i]->images->standard_resolution->url;
            $image['userinfo'][$i] = $result[0]->data[$i]->caption;
        }

        //print_r($image);
        $QR = $image;
    }

}

echo json_encode($QR);
