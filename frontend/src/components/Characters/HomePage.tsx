import React, { Component } from "react"
import { RouteComponentProps } from "react-router"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"

import { charactersActions } from "../../redux/actions/index"
import SimplePagination from "../Pagination/SimplePagination"
import Character from '../Character/Character'

import { getURLParameter } from '../../utilities/methods'
import Loader from "../Loader"
import { APP_NAME } from "../../constants"

type Props = RouteComponentProps & {
	getCharacters: (id: string) => { [key: string]: any },
	characters: { [key: string]: any },
}

class HomePage extends Component<Props, {}> {
	pageTitle = `Home | ${APP_NAME}`

    componentDidMount() {
		const page = getURLParameter('page') ? Number.parseInt(getURLParameter('page')) : 1
        this.loadCharacters(page)
    }

    loadCharacters(page) {
        this.props.getCharacters(page)
	}

	__renderHeaderTags() {
		return <Helmet>
			<title>{this.pageTitle}</title>
		</Helmet>
	}

	__renderCharacters() {
		const { data } = this.props.characters

		if (
			!data ||
			!(
				(typeof data === 'object' && data !== null) &&
				data.results !== undefined
			) ||
			!data.results.length
		) {
			return <p>No results to display your query.</p>
		}

		return data.results.map((character, key) =>
			<Character
				key={key}
				character={character}
				showShortData
			/>
		)
	}

    render() {
		const { data, fetched, isLoaded } = this.props.characters
		let content = null

        if (fetched && isLoaded) {
        	content = (
				<div className="container">
					<div className="col-md-4 offset-md-4">
						<div className="card">
							<div className="card-header">
								<div className="card-title">
									Home
									<div className="float-right">
										<a href="/search" className="btn btn-default btn-sm">Form Search</a>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div className="card-text">
									{this.__renderCharacters()}
								</div>
							</div>
							<div className="card-footer">
								<SimplePagination data={data} />
							</div>
						</div>
					</div>
				</div>
			)
        } else if (!fetched && isLoaded) {
	        content = <div>Unknown error encountered</div>
    	} else {
    		content = <Loader />
		}

		return <>
			{this.__renderHeaderTags()}
			{content}
		</>
    }
}

const mapStateToProps = state => ({
    characters: state.characters
})
const mapDispatchToProps = dispatch => ({
    getCharacters: page => dispatch(charactersActions.getCharacters(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
