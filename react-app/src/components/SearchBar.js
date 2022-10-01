import { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './index.css';

const SearchBar = ({ setTokenSelect, tokenSelect }) => {

    const history = useHistory()
    const tokens = useSelector(state => state?.tokens)
    const [filterTokens, setFilterTokens] = useState([])
    const [search, setSearch] = useState('')
    const [showResults, setShowResults] = useState(true)

    const updateTokenSelect = (e) => setTokenSelect(e.target.value);


    // const updateSearch = (e) => setSearch(e.target.value);

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


    // const handleSubmit = () => {
    //     // history.push(`/books/${searchable}`)
    //     history.push(`/home`)
    //     setFilterTokens([])
    //     // setSearchBar(false)
    // }

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

            <div className='searchBarDiv'>
                {/* {showResultsField && (
                    <div onClick={newSearch}>
                        <input
                            type='text'
                            value={tokenSelect}
                            onChange={tokenSearch}
                            placeholder='Token NameTop'
                        />
                    </div>
                )} */}
                {/* <form className='searchBarInput'
                    onSubmit={handleSubmit}> */}

                        <input
                            id='searchInputField'
                            type='text'
                            value={search}
                            onChange={tokenSearch}
                            placeholder='Token Name'
                            onClick={newSearch}
                        />

                {/* </form> */}
                <div className='tokenResultsDiv'>
                    {showResults && filterTokens && (
                        filterTokens.slice(0, 5).map((token, idx) => (
                            <div className='searchBarResult'
                                key={idx}
                                value={token.id}
                                onClick={() => selectResult(token)}>
                                <div className="searchBarTitle">{token.name}<br></br></div>
                            </div>

                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchBar
