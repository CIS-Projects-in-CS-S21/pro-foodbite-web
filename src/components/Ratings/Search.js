import styled from 'styled-components'

const HorizontalDiv = styled.div`
    font-size:20px;
    font-weight:bold;
    display:flex;
    justify-content:center;
`

export const SearchContent = ({findContent}) =>{
    return(
        <HorizontalDiv>
            <input style={{width:"100px" ,border:"none"}} id="searchContent" placeholder="content" type="string"/>
            <button style={{backgroundColor:'transparent', border:"1px solid"}} onClick={findContent}>find</button>
        </HorizontalDiv>
    )
}

export const SearchUser = ({findContent}) =>{
    return(
        <HorizontalDiv>
            <input style={{width:"100px" ,border:"none"}} id="searchUser" placeholder="User Name" type="string"/>
            <button style={{backgroundColor:'transparent', border:"1px solid"}} onClick={findContent}>find</button>
        </HorizontalDiv>
    )
}
