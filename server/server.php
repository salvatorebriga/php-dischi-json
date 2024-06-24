<?php

header('Content-Type: application/json');

$disc = file_get_contents('./dischi.json');
$dischi = json_decode($disc, true);

include './function.php';


if (isset($_GET['action'])) {
    $action = $_GET['action'];
    if ($action === 'create' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $newDisc = json_decode(file_get_contents('php://input'), true);
        $newDisc['id'] = time();
        $dischi[] = $newDisc;
        saveDischi($dischi);
        echo json_encode($newDisc);
        die();
    }
}

echo json_encode($dischi);
