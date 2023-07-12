import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../assets/bK.png'
import whiteLogo from '../assets/wK.png'


export class King extends Figure{
    isFirstStep=true;
    moves;
    initialX;
    afterFirstMoveX;
    name=FigureNames.KING;
    CHECKED;
    MATED;
    constructor(color, cell){
        super(color,cell)
        this.color=color;
        this.cell=cell;
        this.logo=this.color===Colors.black?blackLogo:whiteLogo;
        this.initialX=cell.x
        this.CHECKED=false;
        this.MATED=false;
        this.moves=0;
    }
    checkedKingCannotShield(newBoard){
      let avShields=0
      let dx=Math.abs(newBoard.attackedCell.x-newBoard.attackingCell.x)
      let dy=Math.abs(newBoard.attackedCell.y-newBoard.attackingCell.y)
      let minY=Math.min(newBoard.attackedCell.y, newBoard.attackingCell.y)
      let minX=Math.min(newBoard.attackedCell.x, newBoard.attackingCell.x)
      if(dx<=1&&dy<=1){return true}
      if((dx===1&&dy===2)||(dx===2&&dy===1)){return true}
      if(dx===0&&dy>1){
          //vertical
          if(this.color===Colors.black){
            for(let i=1; i<dy;i++){
          if(newBoard.cells[minY+i][this.cell.x].availableToMoveBlack){avShields++}
        }
          }
          if(this.color===Colors.white){
            for(let i=1; i<dy;i++){
              if(newBoard.cells[minY+i][this.cell.x].availableToMoveWhite){avShields++}
            }
          }
      }
      if(dy===0&&dx>1){
         //horizontal
         if(this.color===Colors.black){
          for(let i=1; i<dx;i++){
        if(newBoard.cells[this.cell.y][minX+i].availableToMoveBlack){avShields++}
      }
        }
        if(this.color===Colors.white){
          for(let i=1; i<dx;i++){
            if(newBoard.cells[this.cell.y][minX+i].availableToMoveWhite){avShields++}
          }
        }
      }
      if(dy>1&&dx>1){
        //diagonal
        if(this.color===Colors.black){
          for(let i=1; i<dy;i++){
            let row=minY+i
            let column=minX+i
        if(newBoard.cells[row][column].availableToMoveBlack){
          avShields++}
      }
        }
        if(this.color===Colors.white){
          for(let i=1; i<dy;i++){
            let row=minY+i
            let column=minX+i
            if(newBoard.cells[row][column].availableToMoveWhite){avShields++}
          }
        }
      
      }
      return avShields===0
    }
    checkedKingCannotMove(newBoard){
      let avMoves=0
           for(let i=0;i<newBoard.cells.length;i++){
              for(let j=0;j<newBoard.cells[i].length;j++){
                if(this.canMove(newBoard.getCell(i,j))){avMoves++}
              }
           }   
      return avMoves===0
    }
    canShortCastle(target){
        if(!target.board.isKingChecked()&&
           this.isFirstStep&&
           target.y===this.cell.y&&
           target.x===this.cell.x+2&&
           this.cell.board.getCell(this.cell.y,target.x+1).figure?.name===FigureNames.ROOK&&
           this.cell.board.getCell(this.cell.y,target.x+1).figure.isFirstStep){return true}
           return false
    }
    canLongCastle(target){
        if(!target.board.isKingChecked()&&
           this.isFirstStep&&
           target.y===this.cell.y&&
           target.x===this.cell.x-2&&
           this.cell.board.getCell(this.cell.y,target.x-2).figure?.name===FigureNames.ROOK&&
           this.cell.board.getCell(this.cell.y,target.x-2).figure.isFirstStep){return true}
           return false
    }
    canMove(target){
        if(!super.canMove(target)){return false}
        let dy=Math.abs(target.y-this.cell.y)
        let dx=Math.abs(target.x-this.cell.x)
        if(this.color===Colors.black){if(target.attackedByWhite){return false}}
        if(this.color===Colors.white){if(target.attackedByBlack){return false}}
        if(this.canShortCastle(target)){return true}
        if(this.canLongCastle(target)){return true}
        if(dx>1||dy>1){return false}
        return true
    }
    canAttack(target){
        if(!super.canAttack(target)){return false}
        let dy=Math.abs(target.y-this.cell.y)
        let dx=Math.abs(target.x-this.cell.x)
        if(dx>1||dy>1){return false}
        return true
    }
    moved(target){
        super.moved(target)
        this.isFirstStep=false
        this.moves++;
        this.afterFirstMoveX=this.cell.x
         if(this.color===Colors.white){
        if(this.afterFirstMoveX-this.initialX===2&&this.moves===1){
           this.cell.board.cells[7][7].moveRookWhenCastle(this.cell.board.cells[7][5])}
        if(this.afterFirstMoveX-this.initialX===-2&&this.moves===1){
           this.cell.board.cells[7][0].moveRookWhenCastle(this.cell.board.cells[7][3])}
        }
        if(this.color===Colors.black){
            if(this.afterFirstMoveX-this.initialX===2&&this.moves===1){
               this.cell.board.cells[0][7].moveRookWhenCastle(this.cell.board.cells[0][5])}
            if(this.afterFirstMoveX-this.initialX===-2&&this.moves===1){
               this.cell.board.cells[0][0].moveRookWhenCastle(this.cell.board.cells[0][3])}
            }
    
}}