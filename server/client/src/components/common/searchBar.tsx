import styled from 'styled-components'

function SearchBar() {

    return (
      <SearchStyled>
        <div className="searchBar">
                    <input type="search" placeholder="Enter keyword" id="search" name="search"/>
        </div>
      </SearchStyled>
    );
  }


const SearchStyled = styled.div
        `
        .songsTab{
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            margin: 2rem 0;
        }

        input {
            padding-left: 10px;
            border: 0;
            width: 20rem;
            height: 48px;
            font-size: 1rem;
            color: #141414;
            background: #FFFFFF;
            border: 1px solid #F6F6F6;
            box-sizing: border-box;
            border-radius: 8px;
        }

        input:focus
        { outline: 0; }

        input:focus {
            width: 20rem;
            -webkit-transition: all 0.075s ease;
            transition: all 0.075s ease;
        }

        input::placeholder{
        font-size: 15px;
        color: #A5ABB6;
        }

        input {
            width: 20rem;
        }
        `

export default SearchBar;
