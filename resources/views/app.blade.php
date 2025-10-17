<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="Sistema de cowork que permite reservar salas e mesas com planos personalizados">
    <meta name="keywords" content="cowork, reserva, salas, planos, mesas">
    <meta name="author" content="Yasmin Santana">

    <meta property="og:title" content="Cowork">
    <meta property="og:description" content="Reserve salas e mesas com facilidade">
    <meta property="og:image" content="/images/og-image.png">
    <meta property="og:url" content="{{ url()->current() }}">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>


    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" media="(prefers-color-scheme: light)">
    <link rel="icon" href="/favicon_dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
