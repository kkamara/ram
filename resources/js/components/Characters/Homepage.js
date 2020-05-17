import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { charactersActions } from "../../redux/actions/index";
import SimplePagination from "../Pagination/SimplePagination";
import Character from '../Character';

import Loader from "../Loader";

class Homepage extends Component {
    componentDidMount() {
        this.loadCharacters();
    }

    loadCharacters() {
        this.props.getCharacters();
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
		console.log('data',data)

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
    getCharacters: () => dispatch(charactersActions.getCharacters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
