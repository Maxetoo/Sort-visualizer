import React, {useState} from 'react'
import styled from 'styled-components'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from "recharts";

const BubbleSortComp = () => {
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

    const bubbleSort = async () => {

        setSorting(true);
        let arr = [...array];
        let n = arr.length;
        let swapped;
          do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
              setCurrentIndex(i);
              if (arr[i].value > arr[i + 1].value) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                setLogs(`Compare element ${arr[i].value} with element ${arr[i + 1].value} : ${arr[i].value} < ${arr[i + 1].value}, ${arr[i].value > arr[i + 1] ? 'no-swap' : 'swap'}`)
                swapped = true;
              }
              setArray([...arr]);
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            setSortedIndex(n - 1);
            n--; 
          } while (swapped);
        
          setCurrentIndex(-1);
          setSorting(false);
          setLogs("")
      
       
      };


  return (
    <Wrapper>
        <h3>Bubble sort</h3>
        <div className="graph-p-container">
            <ResponsiveContainer className="g-container">
            <BarChart data={array}>
            <XAxis dataKey="name" stroke="#000000" />
            <YAxis stroke="#000000" />
            <Tooltip />
            <Bar 
            style={{transition: 'ease-in-out'}}
            dataKey="value" fill="#3b82f6" radius={[7, 7, 0, 0]}>
            {array.map((entry, index) => (
              <Cell
                style={{transition: 'ease-in-out'}}
                key={`cell-${index}`}
                fill={index === currentIndex + 1  && sorting ? "#f97316" : index === sortedIndex ? "#22c55e" : "#3b82f6"}
              />
            ))}
            </Bar>
            </BarChart>
        </ResponsiveContainer>
        </div>
        <p>{logs}</p>
        <div className="btn-container">
            <button type='button' onClick={() => 
              !sorting && bubbleSort()}>{sorting ? 'Sorting...' : 'Start Sorting'}</button>
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

    .graph-p-container {
        width: 80%;
        height: 300px;
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
        margin-top: 3rem;
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

`
export default BubbleSortComp