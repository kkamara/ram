@extends('layouts.master')

@section('content')

<div class="col-md-4 offset-md-4">
    <div class="card">
        <div class="card-header">
            <div class="card-title">{{ $title }}</div>
        </div>
        <div class="card-body">
            <div class="card-text">
                <img class='img-responsive' src="{{ $data['image'] }}" alt=""/>
                <p>Name: {{ $data['name'] }}</p>
                <p>Species: {{ $data['species'] }}</p>
                <p>Origin: {{ isset($data['origin']['name']) ? $data['origin']['name'] : 'Unknown' }}</p>
                <p>Gender: {{ $data['gender'] }}</p>
                <p>Episodes:
                    @forelse($data['episode'] as $i => $ep)
                        @if ($i !== count($data['episode']) - 1)
                            {{ substr($ep, 1 + strrpos($ep, '/')) . ',' }}
                        @else
                            {{ substr($ep, 1 + strrpos($ep, '/')) }}
                        @endif
                    @empty
                        N/A
                    @endforelse
                </p>
            </div>
        </div>
        <div class="card-footer">
            <a href="{{ url()->previous() }}" class="btn btn-default">
                <i class="fas fa-backspace"></i>
            </a>
        </div>
    </div>
</div>

@stop


