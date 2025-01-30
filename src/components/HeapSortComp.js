import React, {useState} from 'react'
import styled from 'styled-components'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from "recharts";

const HeapSortComp = () => {
    const [array, setArray] = useState([
        { name: "43", value: 43 },
        { name: "10", value: 10 },
        { name: "39", value: 39 },
        { name: "35", value: 35 },
        { name: "23", value: 23 },
        { name: "1", value: 1 },
        { name: "6", value: 6 },
        { name: "56", value: 56 },
        { name: "49", value: 49 },
        { name: "8", value: 8 },
        { name: "16", value: 16 },
        { name: "29", value: 29 },
        { name: "18", value: 18 },
        { name: "9", value: 9 },
        { name: "3", value: 3 },
        { name: "32", value: 32 },
        { name: "41", value: 41 },
        { name: "7", value: 7 },
        { name: "21", value: 21 },
        { name: "39", value: 39 },
      ]);
    const [sorting, setSorting] = useState(false);
    const [sortedIndex, setSortedIndex] = useState(-1);
    const [currentIndex, setCurrentIndex] = useState(1)
    const [logs, setLogs] = useState("")

    const animationDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const heapify = async (arr, n, i) => {
      let largest = i;
      let left = i * 2 + 1;
      let right = i * 2 + 2;
  
      if (left < n && arr[left].value > arr[largest].value) { 
          largest = left;
      }
  
      if (right < n && arr[right].value > arr[largest].value) { 
          largest = right;
      }
      
      setLogs(
        `Non-leaf node: ${arr[i].value}, ` +
        `Left node: ${left < n ? arr[left].value : 'N/A'}, ` +
        `Right node: ${right < n ? arr[right].value : 'N/A'}, ` +
        `After comparing: Largest node (${arr[largest].value})`
      );


      if (largest !== i) {
          setCurrentIndex(i);
          [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
          setArray([...arr]);
          await animationDelay(1000);
          await heapify(arr, n, largest);
      }
  };
  
    const heapSort = async () => {
      setSorting(true);
      let arr = [...array];
      let n = arr.length;
  
      // Build heap (rearrange array)
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
      }
  
      // Extract elements from heap one by one
      for (let i = n - 1; i > 0; i--) {
        setCurrentIndex(0);
        // Swap max element with last
        [arr[0], arr[i]] = [arr[i], arr[0]]; 
        setArray([...arr]);
        await animationDelay(100);
        setSortedIndex(i);
  
        await heapify(arr, i, 0);
      }
  
      setSortedIndex(0);
      setCurrentIndex(null);
      setSorting(false);
    };


    


  return (
    <Wrapper>
      <h3>Heap Sort</h3>
      <div className="graph-p-container">
        <ResponsiveContainer width="100%" className="g-container">
          <BarChart 
            data={array}
            layout="vertical"
          >
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="#000000"
              width={70} 
            />
            <XAxis 
              type="number" 
              stroke="#000000" 
            />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 7, 7, 0]} style={{ transition: 'ease-in-out' }}>
              {array.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    index === currentIndex && sorting 
                      ? "#f97316"  
                      : index === sortedIndex 
                      ? "#22c55e"  
                      : "#3b82f6" 
                  }
                  style={{ transition: 'ease-in-out' }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <p>{logs}</p>
      
      <div className="btn-container">
        <button type='button' onClick={() => !sorting && heapSort()}>
          {sorting ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
  </Wrapper>
  )
}


const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      margin-top: 2rem;
    }

    .graph-p-container {
        width: 80%;
        height: 450px;
        margin-top: 3rem;
    }

    .btn-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .btn-container button {
        margin-top: 2rem;
        height: 50px;
        width: 200px;
        cursor: pointer;
        padding: 1.5rem;
        display: grid;
        place-content: center;
        font-size: 1em;
        border: solid 1px #000000;
        background: #303030;
        color: #fff;
    }

    p {
      margin-top: 2rem;
    }

    @media only screen and (max-width: 600px) {

      h3 {
        margin-top: -2rem;
      }
      padding: 0;

      .graph-p-container {
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 2rem;
      }

      p {
        margin-top: -1rem;
        width: 80%;
        text-align: center;
      }

      .btn-container button {
        margin-top: 2rem;
      }
    }
`
export default HeapSortComp