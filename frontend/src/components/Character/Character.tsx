import React, { Fragment } from "react"
import { withRouter } from "react-router-dom"

const renderEpisodes = episodes => {
    if (!episodes.length) return 'N/A'

    return episodes.map((ep, key) => {
        let result = ep.slice(1 + ep.lastIndexOf('/'))
        if (key !== episodes.length - 1) result += ', '

        return <Fragment key={key}>{result}</Fragment>
    })
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
     } = character

    const renderCharacter = () => {
        let result = [
            <>
                <img className='img-responsive' src={image} alt=""/>
                <p>
                    {showShortData ?
                        <a className='character-title' href={`/characters/${id}`}>Name: {name}</a> :
                        `Name: ${name}`}
                </p>
            </>
        ]
        if (!showShortData) {
            result.push(
                <>
                    <p>Species: {species}</p>
                    <p>Origin: { typeof origin === 'object' && origin !== null && origin.Name ? origin.name : 'Unknown' }</p>
                    <p>Gender: {gender}</p>
                    <p>Episodes: {renderEpisodes(episode)}</p>
                </>
            )
        }

        return result.map((data, key) => <Fragment key={key}>{data}</Fragment>)
    }

    return renderCharacter()
}

export default withRouter(Character)
