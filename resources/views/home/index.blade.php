@extends('layouts.master')

@section('content')

    <div class="col-md-4 offset-md-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title">{{ $title }}</div>
            </div>
            <div class="card-body">
                <div class="card-text">
                    @if(false !== $data && count($data['results']))
                        @foreach($data['results'] as $result)
                            <img class='img-responsive' src="{{ $result['image'] }}" alt=""/>
                            <p>Name: {{ $result['name'] }}</p>
                            <p>Species: {{ $result['species'] }}</p>
                            <p>Origin: {{ isset($result['origin']['name']) ? $result['origin']['name'] : 'Unknown' }}</p>
                            <p>Gender: {{ $result['gender'] }}</p>
                            <p>Episodes:
                                @forelse($result['episode'] as $i => $ep)
                                    @if ($i !== count($result['episode']) - 1)
                                        {{ substr($ep, 1 + strrpos($ep, '/')) . ',' }}
                                    @else
                                        {{ substr($ep, 1 + strrpos($ep, '/')) }}
                                    @endif
                                @empty
                                    N/A
                                @endforelse
                            </p>
                            <hr>
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
    <script>
        function getURLParameter(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        }

        $(function() {
            // static vars for interacting with pagination data
            const totalPages = {{ $data !== false && isset($data['info']) ? $data['info']['pages'] : 0 }};
            const page = getURLParameter('page') ? Number.parseInt(getURLParameter('page')) : null;
            // handle whether link buttons are disabled
            let paginateLeftBtn = $('#paginate-left');
            let paginateRightBtn = $('#paginate-right');
            let leftPaginatorDisabled = false, rightPaginatorDisabled = false;
            if (page === null || page <= 1) {
                leftPaginatorDisabled = true;
                paginateLeftBtn.prop('disabled', true);
            } else if (page === totalPages) {
                rightPaginatorDisabled = true;
                paginateRightBtn.prop('disabled', true);
            }
            console.log('page',typeof page);
            console.log('totalPages',typeof totalPages);
            console.log('leftPaginatorDisabled',leftPaginatorDisabled);
            console.log('rightPaginatorDisabled',rightPaginatorDisabled);
            paginateLeftBtn.on('click', e => {
                if (leftPaginatorDisabled) return;
                window.location.href = `${window.location.origin}/?page=${page - 1}`;
            });
            paginateRightBtn.on('click', e => {
                if (rightPaginatorDisabled) return;
                window.location.href = `${window.location.origin}/?page=${page + 1}`;
            });
        });
    </script>
@stop
