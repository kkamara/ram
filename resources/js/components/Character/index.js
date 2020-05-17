import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

const renderEpisodes = episodes => {
    if (!episodes.length) return 'N/A';

    return episode.map((ep, i) => {
        result = ep.slice(1 + ep.lastIndexOf('/'));
        if (i !== episode.length - 1) result += ', ';

        return result
    });
}

const Character = ({ character, showShortData }) => {
    const {
        id,
        image,
        name,
        origin,
        species,
        gender,
        episode,
     } = character;

    return showShortData ? (
            <Fragment>
                <img className='img-responsive' src={image} alt=""/>
                <p><a className='character-title' href={`/characters/${id}`}>Name: {name}</a></p>
            </Fragment>
        ) : (
            <Fragment>
                <p>Species: {species}</p>
                <p>Origin: { typeof origin === 'object' && origin !== null && origin.Name ? origin.name : 'Unknown' }</p>
                <p>Gender: {gender}</p>
                <p>Episodes: {renderEpisodes(episode)}</p>
            </Fragment>
        );
}

export default withRouter(Character);
