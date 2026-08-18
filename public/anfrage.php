<?php
/**
 * Kreativwerk — Projektanfrage per E-Mail (klassisches Hosting, z. B. IONOS).
 * Nimmt das JSON des Anfrage-Formulars entgegen, validiert und sendet es
 * per mail() an EMPFAENGER. Antwortet mit JSON.
 */

const EMPFAENGER = 'info@kw-agentur.de';
// Absender muss zur Domain des Webspace passen, sonst lehnen viele Hoster ab.
const ABSENDER = 'website@kw-agentur.de';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    // Fallback: klassischer Form-Post
    $data = $_POST;
}

$feld = static function (string $key, int $max = 2000) use ($data): string {
    $wert = isset($data[$key]) && is_string($data[$key]) ? trim($data[$key]) : '';
    // Header-Injection verhindern
    $wert = str_replace(["\r", "\n"], ' ', $wert);
    return mb_substr($wert, 0, $max);
};

// Honeypot: echte Nutzer lassen das Feld leer
if ($feld('website') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$projektart   = $feld('project_type', 50);
$beschreibung = isset($data['description']) && is_string($data['description'])
    ? mb_substr(trim($data['description']), 0, 5000)
    : '';
$budget   = $feld('budget', 200);
$zeitraum = $feld('timeline', 200);
$name     = $feld('name', 200);
$firma    = $feld('company', 200);
$email    = $feld('email', 320);
$telefon  = $feld('phone', 50);
$sprache  = $feld('locale', 5) === 'en' ? 'en' : 'de';

if ($projektart === '' || $beschreibung === '' || $name === ''
    || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'missing_fields']);
    exit;
}

$zeilen = [
    'Neue Projektanfrage über kw-agentur.de',
    '',
    'Projektart:   ' . $projektart,
    'Budgetrahmen: ' . ($budget !== '' ? $budget : '—'),
    'Zeitrahmen:   ' . ($zeitraum !== '' ? $zeitraum : '—'),
    '',
    'Beschreibung:',
    $beschreibung,
    '',
    'Name:    ' . $name,
    'Firma:   ' . ($firma !== '' ? $firma : '—'),
    'E-Mail:  ' . $email,
    'Telefon: ' . ($telefon !== '' ? $telefon : '—'),
    'Sprache: ' . $sprache,
    'Datum:   ' . date('d.m.Y H:i'),
];
$text = implode("\n", $zeilen);

$betreff = '=?UTF-8?B?' . base64_encode('Projektanfrage: ' . $projektart . ' — ' . $name) . '?=';
$header = [
    'From: Kreativwerk Website <' . ABSENDER . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$gesendet = mail(EMPFAENGER, $betreff, $text, implode("\r\n", $header));

if (!$gesendet) {
    http_response_code(502);
    echo json_encode(['error' => 'mail_failed']);
    exit;
}

echo json_encode(['ok' => true]);
