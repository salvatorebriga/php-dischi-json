<?php

$dischi = file_get_contents('./dischi.json');

header('Content-Type: application/json');

echo $dischi;
