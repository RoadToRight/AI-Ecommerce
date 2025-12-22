import React from 'react'
import styled from 'styled-components'
import Users from '../pages/Users'

const Content = () => {
    return (
        <ContentDiv>
            <Users />

        </ContentDiv>
    )
}

export default Content

const ContentDiv = styled.div`
    max-height: 100vh;
    overflow-y: auto;
    width: 100%;
`