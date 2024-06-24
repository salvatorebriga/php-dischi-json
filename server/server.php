<?php

header('Content-Type: application/json');

$disc = file_get_contents('./dischi.json');

$dischi = json_decode($disc, true);

echo json_encode($dischi);
