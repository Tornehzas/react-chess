import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import blackLogo from '../assets/bP.png'
import whiteLogo from '../assets/wP.png'


export class Pawn extends Figure{
isFirstStep=true;
initialY;
transformY;
canEnPassantY;
canBeEnPassantedY;
canBeEnPassantedMoves;
    name=FigureNames.PAWN;
    constructor(color, cell){
        super(color,cell)
        this.color=color;
        this.cell=cell;
        this.logo=this.color===Colors.black?blackLogo:whiteLogo
        this.canEnPassantY=color===Colors.white?3:4;
        this.canBeEnPassantedY=color===Colors.white?4:3;
        this.initialY=cell.y
        this.transformY=color===Colors.white?0:7
    }
    canEnPassant(){
       if(this.cell.y===this.canEnPassantY){return true}
          return true
    }
    canBeEnPassanted(){
      if(this.cell.y===this.canBeEnPassantedY&&
        !this.player.movesNow&&
         this.cell.board.moves===this?.canBeEnPassantedMoves
        ){return true}
        return false
    }
    canMove(target){
        if(!super.canMove(target))return false
        const direction=this.cell.figure?.color===Colors.black?1:-1
        const firstStepDirection=this.cell.figure?.color===Colors.black?2:-2
        if((target.y===this.cell.y+direction
            && target.x===this.cell.x
            && this.cell.board.getCell(target.y, target.x).isEmpty()))
            {return true}
        if (this.isFirstStep
            && target.x===this.cell.x
            &&(target.y===this.cell.y+firstStepDirection)
            &&this.cell.board.getCell(target.y, target.x).isEmpty()
            &&this.cell.board.getCell(target.y-direction, target.x).isEmpty()
            ){return true}

        if (target.y===this.cell.y+direction
            && (target.x===this.cell.x+1||target.x===this.cell.x-1)
            &&this.cell.isEnemy(target))
            {return true}
        if(this.canEnPassant()&&
          (target.x===this.cell.x+1||target.x===this.cell.x-1)&&
           target.y===this.cell.y+direction&&
           this.cell.board.getCell(this.cell.y, target.x)?.figure?.name===FigureNames.PAWN&&
           this.cell.board.getCell(this.cell.y, target.x)?.figure?.canBeEnPassanted()){return true}
       return false
    }
    canAttack(target){
        if(!super.canAttack(target)){return false}
    let direction=this.cell.figure?.color===Colors.black?1:-1
    if (target.y===this.cell.y+direction
        && (target.x===this.cell.x+1||target.x===this.cell.x-1)){
            return true
        }
}
    moved(target) {
        const direction=this.cell.figure?.color===Colors.black?1:-1
        super.moved(target)
        this.isFirstStep=false
        if(Math.abs(this.initialY-this.cell.y)===2){this.canBeEnPassantedMoves=this.cell.board.moves}
        if(this.cell.board.getCell(this.cell.y-direction,this.cell.x)?.figure?.canBeEnPassantedMoves-this.cell.board.moves===-1){
            this.cell.deleteEnPassantedPawn(this.cell.board.getCell(this.cell.y-direction,this.cell.x))
        }
}

}