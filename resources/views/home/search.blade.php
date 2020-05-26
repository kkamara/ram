@extends('layouts.master')

@section('content')

    <div class="col-md-4 offset-md-4">
        @if($errors instanceof Illuminate\Validation\Validator)
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                @foreach($errors->errors()->all() as $error)
                    {{ $error }} <br>
                @endforeach
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        @endif

        <form class="card" action='' method='GET'>
            <div class="card-header">
                <div class="card-title">
                    {{ $title }}
                    <div class="float-right">
                        <a href="{{ route('home') }}" class="btn btn-default btn-sm">Home</a>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="card-text">
                    <div class="form-group">
                        <input name='name' type="text" class="form-control" placeholder='Name' value='{{ isset($input) && isset($input['name']) ? $input['name'] : '' }}'>
                    </div>
                    <div class="form-group">
                        <select name="status" class="form-control">
                            <option value="">Please choose a status</option>
                            <option value="alive" @if(isset($input) && isset($input['status']) && $input['status'] === 'alive') selected @endif }}>Alive</option>
                            <option value="dead" @if(isset($input) && isset($input['status']) && $input['status'] === 'dead') selected @endif }}>Dead</option>
                            <option value="unknown" @if(isset($input) && isset($input['status']) && $input['status'] === 'unknown') selected @endif }}>Unknown</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input name='species' type="text" class="form-control" placeholder='Species' value='{{ isset($input) && isset($input['species']) ? $input['species'] : '' }}'>
                    </div>
                    <div class="form-group">
                        <input name='type' type="text" class="form-control" placeholder='Type' value='{{ isset($input) && isset($input['type']) ? $input['type'] : '' }}'>
                    </div>
                    <div class="form-group">
                        <select name="gender" class="form-control">
                            <option value="">Please choose a gender</option>
                            <option value="female" @if(isset($input) && isset($input['gender']) && $input['gender'] === 'female') selected @endif }}>Female</option>
                            <option value="male" @if(isset($input) && isset($input['gender']) && $input['gender'] === 'male') selected @endif }}>Male</option>
                            <option value="genderless" @if(isset($input) && isset($input['gender']) && $input['gender'] === 'genderless') selected @endif }}>Genderless</option>
                            <option value="unknown" @if(isset($input) && isset($input['gender']) && $input['gender'] === 'unknown') selected @endif }}>Unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <a href="{{ url()->previous() }}" class="btn btn-default">
                    <i class="fas fa-backspace"></i>
                </a>
                <div class="float-right">
                    <input type='submit' class="btn btn-default" id="search" value='Submit search'>
                </div>
            </div>
        </form>
    </div>

    @if(isset($data))
    <br>
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <div class="card-header">
                    <div class="card-title">Search Results</div>
                </div>
                <div class="card-body">
                    <div class="card-text">
                        @if(isset($data) && false !== $data && isset($data['results']) && count($data['results']))
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
    @endif

@stop

@section('scripts')
    <x-simple-pagination :data="$data" :filters="$filters"/>
@stop

