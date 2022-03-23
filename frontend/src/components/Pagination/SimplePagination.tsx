import React from "react"
import { withRouter } from "react-router-dom"
import $ from 'jquery'

import { getURLParameter } from '../../utilities/methods'

const SimplePagination = ({ data }) => {
    // static vars for interacting with pagination data
    const totalPages = data && data.info ? data.info.pages : 0

    const page = getURLParameter('page') ? Number.parseInt(getURLParameter('page')) : 1

    // handle whether link buttons are disabled
    let paginateLeftBtn = $('#paginate-left')
    let paginateRightBtn = $('#paginate-right')
    let leftPaginatorDisabled = false, rightPaginatorDisabled = false
    if (page === null || page <= 1) {
        leftPaginatorDisabled = true
        paginateLeftBtn.prop('disabled', true)
    }
    if (page === totalPages) {
        rightPaginatorDisabled = true
        paginateRightBtn.prop('disabled', true)
    }

    let uriEncodedFilters = ''
    if (
        typeof data.filters !== 'undefined' &&
        typeof data.filters === "string" &&
        data.filters.length
    ) uriEncodedFilters += `&${data.filters}`

    const leftPaginateBtnClick = e => {
        if (leftPaginatorDisabled) return
        window.location.href = `${window.location.origin}${window.location.pathname}?page=${page - 1}${uriEncodedFilters}`
    }

    const rightPaginateBtnClick = e => {
        if (rightPaginatorDisabled) return
        window.location.href = `${window.location.origin}${window.location.pathname}?page=${page + 1}${uriEncodedFilters}`
    }

    return <>
            <button
                disabled={leftPaginatorDisabled}
                onClick={leftPaginateBtnClick}
                className="btn btn-default"
                id="paginate-left"
            >
                <i className="far fa-arrow-alt-circle-left"></i>
            </button>
            <div className="float-right">
                <button
                    disabled={rightPaginatorDisabled}
                    onClick={rightPaginateBtnClick}
                    className="btn btn-default"
                    id="paginate-right"
                >
                    <i className="far fa-arrow-alt-circle-right"></i>
                </button>
            </div>
    </>
}

export default withRouter(SimplePagination)
