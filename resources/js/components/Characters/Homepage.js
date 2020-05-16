import React, { Component } from "react";
import { connect } from "react-redux";

import { charactersActions } from "../../redux/actions/index";

import Loader from "../Loader";

class Homepage extends Component {
    componentDidMount() {
        this.loadCharacters();
    }

    loadCharacters() {
        this.props.getCharacters();
    }

    render() {
        const { characters } = this.props;
        console.log('characters', characters);

        return <Loader />;
    }
}

const mapStateToProps = state => ({
    characters: state.characters
});
const mapDispatchToProps = dispatch => ({
    getCharacters: () => dispatch(charactersActions.getCharacters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
