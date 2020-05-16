<script>
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
    }

    $(function() {
        // static vars for interacting with pagination data
        const totalPages = {{ isset($data) && $data !== false && isset($data['info']) ? $data['info']['pages'] : 0 }};
        const page = getURLParameter('page') ? Number.parseInt(getURLParameter('page')) : 1;
        // handle whether link buttons are disabled
        let paginateLeftBtn = $('#paginate-left');
        let paginateRightBtn = $('#paginate-right');
        let leftPaginatorDisabled = false, rightPaginatorDisabled = false;
        if((page === null || page <= 1) && page === totalPages) {
            leftPaginatorDisabled = true;
            rightPaginatorDisabled = true;
            paginateLeftBtn.prop('disabled', true);
            paginateRightBtn.prop('disabled', true);
        } else if (page === null || page <= 1) {
            leftPaginatorDisabled = true;
            paginateLeftBtn.prop('disabled', true);
        } else if (page === totalPages) {
            rightPaginatorDisabled = true;
            paginateRightBtn.prop('disabled', true);
        }
        let uriEncodedFilters = '&{!! $filters !!}';
        paginateLeftBtn.on('click', e => {
            if (leftPaginatorDisabled) return;
            window.location.href = `${window.location.origin}${window.location.pathname}?page=${page - 1}${uriEncodedFilters}`;
        });
        paginateRightBtn.on('click', e => {
            if (rightPaginatorDisabled) return;
            window.location.href = `${window.location.origin}${window.location.pathname}?page=${page + 1}${uriEncodedFilters}`;
        });
    });
</script>