import React from "react";




export function CellComponent({cell, selected, click,availableToMove}){
      return (
        <React.Fragment key={cell.id}>
        <div
        className={['cell', cell.color, selected?'selected':'', cell.launchesCHECKEDKing?'checked':''].join(' ')}
        onClick={()=>{click(cell)}}
        > 
        <span className={availableToMove?'available':''}></span>
        {cell.figure?.logo && <img  src={cell.figure.logo} alt=''/>}
        </div>
        </React.Fragment>
      )
}