import { FigureNames } from "./figures/Figure";


export class Cell{
     color;
     y;
     x;
     figure;
     board;
     attackedByBlack;
     attackedByWhite;
     attackedByBlackTimes;
     attackedByWhiteTimes;
     launchesCHECKEDKing;
     availabledToMoveWhite;
     availabledToMoveBlack;
     constructor(color, y, x, board){
this.color=color;
this.y=y
this.x=x
this.board=board;
this.figure=null;
this.attackedByBlack=false;
this.attackedByWhite=false;
this.launchesCHECKEDKing=false
this.attackedByBlackTimes=0;
this.attackedByWhiteTimes=0;
     }
setFigure(figure){
     this.figure=figure
     this.figure.cell=this
}
moveRookWhenCastle(target){
     target.setFigure(this.figure)
     this.figure=null
}
deleteEnPassantedPawn(target){
     target.figure=null
}
moveFigure(target){
     if(this.figure&&this.figure?.canMove(target)){
          target.setFigure(this.figure)
          this.figure.moved()
          this.figure=null
     }
}
isEmpty(){
     return this.figure===null
}
isEmptyForAttack(target){
    if(target.figure===null){return true}
    if(target.figure.name===FigureNames.KING&&target.figure.color!==this.figure.color){return true}
    return false
}
isEnemy(target){
     if(target.figure){
          return this.figure?.color!==target.figure.color
      }
      return false
}
isEmptyVertical(target){
     if(this.x!==target.x){
        return false 
     }
      const min=Math.min(this.y, target.y)   
      const max=Math.max(this.y, target.y)  
      for(let y=min+1; y<max;y++) {
         if(!this.board.getCell(y, this.x).isEmpty()){
             return false
         }
      }
     
      return true
}
isEmptyVerticalForAttack(target){
     if(this.x!==target.x){
          return false 
       }
        const min=Math.min(this.y, target.y)   
        const max=Math.max(this.y, target.y)  
        for(let y=min+1; y<max;y++) {
           if(!this.isEmptyForAttack(this.board.getCell(y, this.x))){
               return false
           }
        }
       
        return true
}
isEmptyHorizontal(target){
         if(this.y!==target.y){
             return false 
          }
           const min=Math.min(this.x, target.x)   
           const max=Math.max(this.x, target.x)  
           for(let x=min+1; x<max;x++) {
              if(!this.board.getCell(this.y,x).isEmpty()){
                  return false
              }
           }
         
           return true
}
isEmptyHorizontalForAttack(target){
     if(this.y!==target.y){
          return false 
       }
        const min=Math.min(this.x, target.x)   
        const max=Math.max(this.x, target.x)  
        for(let x=min+1; x<max;x++) {
           if(!this.isEmptyForAttack(this.board.getCell(this.y,x))){
               return false
           }
        }
      
        return true
}
isEmptyDiagonal(target){
         const absX=Math.abs(target.x-this.x);
         const absY=Math.abs(target.y-this.y);
         if(absY!==absX){return false}
     
         const dy=this.y<target.y?1:-1
         const dx=this.x<target.x?1:-1
     
         for(let i=1; i<absY; i++){
             if(!this.board.getCell( this.y+dy*i,this.x+dx*i).isEmpty())
             return false;
     }
     return true
}
isEmptyDiagonalForAttack(target){
     const absX=Math.abs(target.x-this.x);
     const absY=Math.abs(target.y-this.y);
     if(absY!==absX){return false}
 
     const dy=this.y<target.y?1:-1
     const dx=this.x<target.x?1:-1
 
     for(let i=1; i<absY; i++){
         if(!this.isEmptyForAttack(this.board.getCell(this.y+dy*i,this.x+dx*i)))
         return false;
 }
 return true
}
}