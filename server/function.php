<?php

function saveDischi($dischi)
{
    file_put_contents('./dischi.json', json_encode($dischi));
}
