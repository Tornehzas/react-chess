import {  useState } from "react"
import { CellComponent } from "./CellComponent"
import React from "react"
import { Clock } from "../Clock"



export function BoardComponent({board,setBoard,wClock, setWClock, bClock, setBClock, setModalActive, setModalMessage}){
   const [selectedCell, setSelectedCell]=useState(null)
function click(cell){
        if(selectedCell&&selectedCell!==cell){
            if(selectedCell.figure?.canMove(cell)&&board.precheck(selectedCell, cell)){
             selectedCell.moveFigure(cell)
             if(board.pawnTransformCheck()){
               board.pawnTransform()
             }
         updateBoard()
            }
         setSelectedCell(null)
        }
        else setSelectedCell(cell)
}
const c=setTimeout(()=>{
if(board.moves%2===0){
if(wClock.value===0){
     clearTimeout(c)
     updateBoardByTime()
     
   }
   else{
     let newClock=new Clock(wClock.color, wClock.value-1)
     setWClock(newClock)
     setTimeout(c,1000)
   }
   }
   if(board.moves%2!==0){
      if(bClock.value===0){
           clearTimeout(c)
           updateBoardByTime()
         }
         else{
           let newClock=new Clock(bClock.color, bClock.value-1)
           setBClock(newClock)
           setTimeout(c,1000)
         }
         }
 },1000)
function updateBoardByTime(){
   if(wClock.value===0){
      clearTimeout(c)
      setModalMessage('WHITE DROPPED FLAG')
      setModalActive(true)
   }
   if(bClock.value===0){
      clearTimeout(c)
      setModalMessage('BLACK DROPPED FLAG')
      setModalActive(true)
   }
}
function updateBoard(){
   board.swapPlayers()
   board.clearAttackedCells()
   board.markAttackedCells()
   setBoard(board)
   if((!board.isKingChecked()&&board.whitePlayer.movesNow&&board.availableMovesWhiteWithKing===0)||
      (!board.isKingChecked()&&board.blackPlayer.movesNow&&board.availableMovesBlackWithKing===0)){
         clearTimeout(c)
         setModalMessage('STALEMATE. THAT IS A DRAW')
         setModalActive(true)
      }
   if(board.isCheckmate(board)){
         if(board.blackKingMated){
            clearTimeout(c)
            setModalMessage('WHITE WON')
            setModalActive(true)
            
      }
         if(board.whiteKingMated){
            clearTimeout(c)
            setModalMessage('BLACK WON')
            setModalActive(true)
            
      }
      }
   return board
}

return (
    <div className='board'>
 {board.cells.map((row, index)=>
 <React.Fragment key={index}> 
    {row.map(cell => 
        <CellComponent
        cell={cell}
        key={cell.id}
        selected={cell.y===selectedCell?.y&&cell.x===selectedCell?.x}
        availableToMove={cell.availableToMove?true:false}
        click={click}
        />
        )}
 </React.Fragment>
 )}
    </div>
    )}

