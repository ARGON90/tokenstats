import { useState } from "react"
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './index.css';

const SearchBar = ({ updateTokenSelect, setTokenSelect, tokenSelect }) => {

    const history = useHistory()
    const tokens = useSelector(state => state?.tokens)
    const [filterTokens, setFilterTokens] = useState([])
    const [search, setSearch] = useState('')

    // const updateSearch = (e) => setSearch(e.target.value);

    const tokenSearch = (keyword) => {
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


    const handleSubmit = () => {
        // history.push(`/books/${searchable}`)
        history.push(`/home`)
        setFilterTokens([])
        // setSearchBar(false)
    }

    const clearInput = () => {
        setFilterTokens([])
        setSearch('')
    }

    function testFunction(token) {
        console.log(token.id)
        console.log(token.name)
    }


    return (
        <div className='searchBarDiv'>
            <form className='searchBarInput'
                onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={search}
                    onChange={tokenSearch}
                    placeholder='Token Name'
                />
            </form>
            <div className='tokenResultsDiv'>
                {filterTokens && (
                    filterTokens.slice(0, 5).map((token, idx) => (
                        <div className='searchBarResult'
                            key={idx}
                            value={token.id}
                            onClick={() => testFunction(token)}>
                            <div className="searchBarTitle">{token.name}<br></br></div>
                        </div>

                    ))
                )}
            </div>
        </div>
    )
}

export default SearchBar
