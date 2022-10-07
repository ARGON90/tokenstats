import { useState } from "react"
import { useSelector } from 'react-redux';

import './CreateTradeModal/CreateTradeModal.css'
import { tokenImages } from "./Tokens";

const SearchBar = ({ setTokenSelect, search, setSearch }) => {


    const tokens = useSelector(state => state?.tokens)
    const [filterTokens, setFilterTokens] = useState([])
    const [showResults, setShowResults] = useState(true)

    const tokenSearch = (keyword) => {
        setShowResults(true)
        const findToken = keyword.target.value
        setSearch(findToken)
        const findTokenName = Object.values(tokens).filter(token => {
            return ((token.name.toLowerCase().includes(findToken.toLowerCase())))
        })
        if (findToken === '') {
            setFilterTokens([])
        }
        else {
            setFilterTokens(findTokenName)
        }
    }

    function selectResult(token) {
        setShowResults(false)
        setTokenSelect(token.id)
        setSearch(token.name)
    }

    function newSearch() {
        setSearch('')
    }

    return (
        <>
                    <label className="create-trade-form-label">Choose a Token</label>
                    <input
                        id='searchInputField'
                        type='text'
                        value={search}
                        onChange={tokenSearch}
                        placeholder='Token Name'
                        onClick={newSearch}
                        className='create-trade-form-input'
                        autoComplete="off"
                    />
                    <div className='tokenResultsDiv'>
                        {showResults && filterTokens && (
                            filterTokens.slice(0, 5).map((token, idx) => (
                                <div className='search-entries-container'
                                    key={idx}
                                    value={token.id}
                                    onClick={() => selectResult(token)}>
                                    <div className="search-entries">
                                        <img className="token-image" src={`${tokenImages[token.name]}`} alt='token image'></img>
                                        <div>{token.name}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>


        </>
    )
}

export default SearchBar
