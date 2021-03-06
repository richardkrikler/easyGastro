<?php

namespace easyGastro;

class SiteTemplate
{
    private static bool $displayUsernameFooter = true;

    static function disableFooter()
    {
        self::$displayUsernameFooter = false;
    }


    static function render(string $title, string $header, string $content): string
    {
        $usernameFooter = '';
        if (self::$displayUsernameFooter && isset($_SESSION['user'])) {
            $usernameFooter = $_SESSION['user']['name'];
        }

        return <<<TEMPLATE
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$title</title>

    <link rel="icon" type="image/png" href="/resources/EGS_Logo_outlined_black_small_v1.png">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
            crossorigin="anonymous"></script>

    <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet">

    <link rel="stylesheet" href="/style.css">
</head>
<body class="d-flex flex-column vh-100">
$header
<main class="flex-grow-1" style="overflow-x: scroll">
$content
</main>

<!-- Footer -->
<div class="bg-white d-flex justify-content-between w-100">
    <!-- Username Element -->
    <div class="username px-3 py-2">
        <p class="fs-4 mb-0">{$usernameFooter}</p>
    </div>

    <!-- Copyright Notice Element -->
    <div class="copyright-notice px-3 py-2">
        <p class="fs-4 mb-0">© easyGastro</p>
    </div>
</div>

</body>
</html>
TEMPLATE;
    }
}