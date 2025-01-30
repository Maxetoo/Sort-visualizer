import React from 'react'
import styled from 'styled-components'
import {BubbleSortComponent, HeapSortComponent} from './components'

const App = () => {
  return (
    <Wrapper>
        <h3>Group 1 (Bubble sort & Heap sort Visualizer)</h3>
        <div className="components-p-container">
          <BubbleSortComponent/>
          <HeapSortComponent/>
        </div>
    </Wrapper>
  )
}


const Wrapper = styled.div`
    width: 100%;
    height: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .components-p-container {
      width: 100%;
      margin-top: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
`
export default App