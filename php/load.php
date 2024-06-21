#!/usr/bin/php-cgi
<?php
    session_start();
    $_POST = json_decode(file_get_contents('php://input'), true);
    $uuid = $_POST['uuid'];
    $conn = oci_connect('u1990700', 'yubphcui', 'ORCLCDB');
    $query = "SELECT pairs, points, cards FROM memory_save WHERE uuid = :uuid";
    $comanda = oci_parse($conn, $query);
    oci_bind_by_name($comanda, ":uuid", $uuid);
    oci_execute($comanda);

    $row = oci_fetch_assoc($comanda);

    if ($row) {
        $pairs = $row['PAIRS'];
        $points = $row['POINTS'];
        $cards = json_decode($row['CARDS'], true); // Decodificar JSON a array

        $response = array(
            "uuid" => $uuid,
            "pairs" => $pairs,
            "points" => $points,
            "cards" => $cards
        );

        echo json_encode($response);
    } else {
        echo json_encode(false);
    }

    oci_free_statement($comanda);
    oci_close($conn);
?>
