import { useEffect, useState } from 'react';
import './App.css';
import { Board } from './Board';
import { BoardComponent } from './components/BoardComponent';
import React from 'react';
import { Colors } from './Colors';
import { Clock } from './Clock';
import { ClockComponent } from './components/ClockComponent';
import { Modal } from './components/ModalComponent';

function App() {
  //board
  const [board, setBoard]=useState(new Board())   
  const [wClock,setWClock]=useState(new Clock(Colors.white,300))
  const [bClock,setBClock]=useState(new Clock(Colors.black,300))
  const [modalActive, setModalActive]=useState(false)
  const [modalMessage, setModalMessage]=useState('if you see this, something happened wrong')
  
  useEffect(()=>{restart()},[])
  function restart(){
   const newBoard=new Board()
    newBoard.initPlayers()
    newBoard.initCells()
    newBoard.addFigures()
    newBoard.markAttackedCells()
    setBoard(newBoard)
    console.log(board)
  }

  //return
    return (
      <React.Fragment>
      <div className='app'>
    <ClockComponent
  color={bClock.color}
  value={bClock.value}
    />
     <BoardComponent 
     board={board}
     setBoard={setBoard}
     wClock={wClock}
     setWClock={setWClock}
     bClock={bClock}
     setBClock={setBClock}
     setModalActive={setModalActive}
     setModalMessage={setModalMessage}
     />
  <ClockComponent
  color={wClock.color}
  value={wClock.value}
    /> 
    <Modal
    active={modalActive}
    setActive={setModalActive}
    message={modalMessage}
    />
      </div>
      </React.Fragment>
    )
    }

export default App;
