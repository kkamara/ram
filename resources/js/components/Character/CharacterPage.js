import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { characterActions } from "../../redux/actions/index";
import Character from './Character';

import Loader from "../Loader";
import { Redirect } from "react-router-dom";
import { APP_NAME } from "../../constants";

class CharacterPage extends Component {
	state = {
		pageTitle: `Characters | ${APP_NAME}`,
	}

    componentDidMount() {
        this.loadCharacter();
	}

	componentDidUpdate() {
		const { data, fetched, isLoaded } = this.props.character;
		const { pageTitle } = this.state;

		if (
			!fetched ||
			!isLoaded ||
			pageTitle.match(data.name)
		) return;

		this.setPageTitleState(`${data.name} | ${pageTitle}`);
	}

	setPageTitleState = pageTitle => this.setState({ pageTitle });

	__renderHeaderTags() {
		const { pageTitle } = this.state;
		return <Helmet>
			<title>{pageTitle}</title>
		</Helmet>
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
		let content = null;

        if (fetched && isLoaded) {
			if (!data) return <Redirect to="/404" />

        	content = <div className="container">
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
	        content = <div>Unknown error encountered</div>;
    	} else{
    		content = <Loader />;
		}

		return <>
			{this.__renderHeaderTags()}
			{content}
		</>;
    }
}

const mapStateToProps = state => ({
    character: state.character
});
const mapDispatchToProps = dispatch => ({
    getCharacter: id => dispatch(characterActions.getCharacter(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CharacterPage);
