import React from 'react';
import styled from 'styled-components';
import RoomAllocation from './components/RoomAllocation';

const App = () => {
  function _onChange(result) {
    console.log(result)
  }

  return (
    <Container>
      <RoomAllocation guest={10} room={3} onChange={_onChange} />
    </Container>
  )
}

const Container = styled.div`
  *, *:before, *:after {
    box-sizing: border-box
  }
`

export default App
