import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { searchCharactersActions } from "../../redux/actions/index";
import SimplePagination from "../Pagination/SimplePagination";
import Character from '../Character/Character';

import { getURLParameter } from '../../utilities/methods';
import Loader from "../Loader";

class SearchCharactersPage extends Component {
	state = {
		"name": "",
		"status": "",
		"species": "",
		"type": "",
		"gender": "",
	};

    componentDidMount() {
		this.handleInitialSearch();
	}

	handleInitialSearch() {
		const params = {
			name: getURLParameter("name"),
			status: getURLParameter("status"),
			species: getURLParameter("species"),
			type: getURLParameter("type"),
			gender: getURLParameter("gender"),
		}
		if (!params.name) delete params.name;
		else this.setNameState(params.name);
		if (!params.status) delete params.status;
		else this.setStatusState(params.status);
		if (!params.species) delete params.species;
		else this.setSpeciesState(params.species);
		if (!params.type) delete params.type;
		else this.setTypeState(params.type);
		if (!params.gender) delete params.gender;
		else this.setGenderState(params.gender);

		const page = this.getPageURI();
        this.searchCharacters(page, params);
	}

	setNameState(name) {
		this.setState({ name });
	}

	setStatusState(status) {
		this.setState({ status });
	}

	setSpeciesState(Species) {
		this.setState({ Species });
	}

	setTypeState(type) {
		this.setState({ type });
	}

	setGenderState(gender) {
		this.setState({ gender });
	}

	getPageURI() {
		let result = 1;
		const pageURIParam = getURLParameter('page');
		if (pageURIParam) {
			try {
				result = Number.parseInt(pageURIParam);
			} catch (e) {}
		}
		return result;
	}

    searchCharacters(page, params={}) {
        this.props.searchCharacters(page, params);
	}

	handleFieldChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	__renderErrors() {
		const { data } = this.props.characters;

		if (!data.errors) return null;

		return (
			<div className="alert alert-danger alert-dismissible fade show" role="alert">
				{errors.map((error, key) => <Fragment key={key}>{ error } <br/></Fragment>)}
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		);
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
		const {
			name,
			status,
			species,
			type,
			gender,
		} = this.state;

		if (fetched && isLoaded) {
        	return (
				<div className="container">
					<div className="col-md-4 offset-md-4">
						{this.__renderErrors()}

						<form
							className="card"
							action=''
							method='GET'
							onSubmit={() => this.searchCharacters(this.getPageURI(), { ...this.state })}
						>
							<div className="card-header">
								<div className="card-title">
									Search | Form
									<div className="float-right">
										<a href="/" className="btn btn-default btn-sm">Home</a>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div className="card-text">
									<div className="form-group">
										<input
											onChange={this.handleFieldChange.bind(this)}
											name='name'
											type="text"
											className="form-control"
											placeholder='Name'
											value={name}
										/>
									</div>
									<div className="form-group">
										<select
											onChange={this.handleFieldChange.bind(this)}
											name="status"
											className="form-control"
											value={status}
										>
											<option value="">Please choose a status</option>
											<option value="alive">Alive</option>
											<option value="dead" >Dead</option>
											<option value="unknown">Unknown</option>
										</select>
									</div>
									<div className="form-group">
										<input
											onChange={this.handleFieldChange.bind(this)}
											name='species'
											type="text"
											className="form-control"
											placeholder='Species'
											value={species}
										/>
									</div>
									<div className="form-group">
										<input
											onChange={this.handleFieldChange.bind(this)}
											name='type'
											type="text"
											className="form-control"
											placeholder='Type'
											value={type}
										/>
									</div>
									<div className="form-group">
										<select
											onChange={this.handleFieldChange.bind(this)}
											name="gender"
											className="form-control"
											value={gender}
										>
											<option value="">Please choose a gender</option>
											<option value="female">Female</option>
											<option value="male">Male</option>
											<option value="genderless">Genderless</option>
											<option value="unknown">Unknown</option>
										</select>
									</div>
								</div>
							</div>
							<div className="card-footer">
								<a href="/" className="btn btn-default">
									<i className="fas fa-backspace"></i>
								</a>
								<div className="float-right">
									<input type='submit' className="btn btn-default" id="search" value='Submit search' />
								</div>
							</div>
						</form>
					</div>

					<br/>

					<div className="col-md-4 offset-md-4">
						<div className="card">
							<div className="card-header">
								<div className="card-title">
									Search Results
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
			);
        } else if (!fetched && isLoaded) {
	        return <div>Unknown error encountered</div>;
    	} else{
    		return <Loader />;
    	}
    }
}

const mapStateToProps = state => ({
    characters: state.searchCharacters
});
const mapDispatchToProps = dispatch => ({
    searchCharacters: (page, params) => dispatch(searchCharactersActions.searchCharacters(page, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCharactersPage);
