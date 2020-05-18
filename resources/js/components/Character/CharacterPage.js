import React, { Component } from "react";
import { connect } from "react-redux";

import { characterActions } from "../../redux/actions/index";
import SimplePagination from "../Pagination/SimplePagination";
import Character from './Character';

import Loader from "../Loader";
import { Redirect } from "react-router-dom";

class CharacterPage extends Component {
    componentDidMount() {
        this.loadCharacter();
    }

    loadCharacter() {
		const { id } = this.props.match.params;
        this.props.getCharacter(id);
	}

	__renderCharacter() {
		const { data } = this.props.character;
		return <Character character={data} />;
	}

    render() {
		const { data, fetched, isLoaded } = this.props.character;

        if (fetched && isLoaded) {
			if (!data) return <Redirect to="/404" />

        	return <div className="container">
	        	<div className="col-md-4 offset-md-4">
		            <div className="card">
		                <div className="card-header">
		                    <div className="card-title">
								{data.name} | Characters
		                        <div className="float-right">
		                            <a href="/search" className="btn btn-default btn-sm">Form Search</a>
		                        </div>
		                    </div>
		                </div>
		                <div className="card-body">
		                    <div className="card-text">
		                        {this.__renderCharacter()}
		                    </div>
		                </div>
		                <div className="card-footer">
							<a href="/" className="btn btn-default">
								<i className="fas fa-backspace"></i>
							</a>
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
    character: state.character
});
const mapDispatchToProps = dispatch => ({
    getCharacter: id => dispatch(characterActions.getCharacter(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterPage);
