import React, { Component } from "react";
import { connect } from "react-redux";

import { charactersActions } from "../../redux/actions/index";
import SimplePagination from "../Pagination/SimplePagination";
import Character from '../Character/Character';

import { getURLParameter } from '../../utilities/methods';
import Loader from "../Loader";

class HomePage extends Component {
    componentDidMount() {
		const page = getURLParameter('page') ? Number.parseInt(getURLParameter('page')) : 1;
        this.loadCharacters(page);
    }

    loadCharacters(page) {
        this.props.getCharacters(page);
	}

	__renderCharacters() {
		const { data } = this.props.characters;

		if (
			!data ||
			!(
				(typeof data === 'object' && data !== null) &&
				data.results !== undefined
			) ||
			!data.results.length
		) {
			return <p>No results to display your query.</p>;
		}

		return data.results.map((character, key) =>
			<Character
				key={key}
				character={character}
				showShortData
			/>
		);
	}

    render() {
		const { data, fetched, isLoaded } = this.props.characters;

        if (fetched && isLoaded) {
        	return <div className="container">
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
        	</div>;
        } else if (!fetched && isLoaded) {
	        return <div>Unknown error encountered</div>;
    	} else{
    		return <Loader />;
    	}
    }
}

const mapStateToProps = state => ({
    characters: state.characters
});
const mapDispatchToProps = dispatch => ({
    getCharacters: page => dispatch(charactersActions.getCharacters(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
