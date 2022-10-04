import { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';

import './CreateTradeModal/CreateTradeModal.css'


const SearchBar = ({ setTokenSelect, tokenSelect }) => {
    const allTokens = useSelector((state) => (state?.tokens))

    function editorNah() {
        if (tokenSelect && allTokens[tokenSelect]) {
            return allTokens[tokenSelect].name
        }
        return ''
    }

    const tokens = useSelector(state => state?.tokens)
    const [filterTokens, setFilterTokens] = useState([])
    const [showResults, setShowResults] = useState(true)
    const [search, setSearch] = useState(editorNah())

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

    const clearInput = () => {
        setFilterTokens([])
        setSearch('')
    }

    function selectResult(token) {
        setShowResults(false)
        setTokenSelect(token.id)
        setSearch(token.name)
        console.log(tokenSelect)
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
                                    <div className="search-entries">{token.name}<br></br></div>
                                </div>
                            ))
                        )}
                    </div>


        </>
    )
}

export default SearchBar
