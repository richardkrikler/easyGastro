<?php

header('Location: /admin/tablegroups.php');

use easyGastro\DB_User;
use easyGastro\Pages;

require_once 'DB_Admin_TableGroups.php';
require_once __DIR__ . '/../../DB_User.php';
require_once __DIR__ . '/../../Pages.php';


session_start();

$row = DB_User::getDataOfUser();
Pages::checkPage('Admin', $row);

if ((isset($row) && $row['typ'] !== 'Admin') || !isset($_POST['tableGroupId']) || !isset($_POST['name'])) {
    return;
}

DB_Admin_TableGroups::updateTableGroup($_POST['tableGroupId'], $_POST['name']);
