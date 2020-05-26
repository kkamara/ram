@extends('layouts.master')

@section('content')

    <div class="col-md-4 offset-md-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    {{ $title }}
                    <div class="float-right">
                        <a href="{{ route('search') }}" class="btn btn-default btn-sm">Form Search</a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="card-text">
                    @if(false !== $data && count($data['results']))
                        @foreach($data['results'] as $result)
                            <img class='img-responsive' src="{{ $result['image'] }}" alt=""/>
                            <p><a class='character-title' href="{{ route('read', $result['id']) }}">Name: {{ $result['name'] }}</a></p>
                        @endforeach
                    @else
                        <p>No results to display your query.</p>
                    @endif
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-default" id="paginate-left">
                    <i class="far fa-arrow-alt-circle-left"></i>
                </button>
                <div class="float-right">
                    <button class="btn btn-default" id="paginate-right">
                        <i class="far fa-arrow-alt-circle-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

@stop

@section('scripts')
    <x-simple-pagination :data="$data"/>
@stop
