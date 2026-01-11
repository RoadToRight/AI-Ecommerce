import React from 'react'
import Sidebar from './Sidebar';
import Content from './content';
import styled from 'styled-components';

const Layout = () => {
    return (
        <LayoutWrapper>
            <Sidebar />
            <Content />
        </LayoutWrapper>
    )
}

export default Layout

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;