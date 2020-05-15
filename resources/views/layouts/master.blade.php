<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $title ?? '' }} | {{ config('app.name') }}</title>
    @include('layouts.styles')
</head>
<body>

    <div class="container" id='app'>
        @section('content')

        @show
    </div>

    @include('layouts.scripts')
</body>
</html>