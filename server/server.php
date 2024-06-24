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
    } else if ($action === 'delete' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $idToDelete = $data['id'];
        $dischi = array_filter($dischi, function ($disc) use ($idToDelete) {
            return $disc['id'] != $idToDelete;
        });
        saveDischi($dischi);
        echo json_encode(['message' => 'Song deleted successfully']);
        die();
    }
}

echo json_encode($dischi);
