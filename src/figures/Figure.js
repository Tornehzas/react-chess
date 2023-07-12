import { Colors } from "../Colors";
export const FigureNames={
    BISHOP:'BISHOP',
    ROOK:'ROOK',
    PAWN:'PAWN',
    KNIGHT:'KNIGHT',
    QUEEN:'QUEEN',
    KING:'KING'
}

export class Figure {
    color;
    name;
    logo;
    cell;
    player;
    constructor(color, cell){
this.color=color;
this.cell=cell;
this.cell.figure=this
this.player=this.color===Colors.white?this.cell.board.whitePlayer:this.cell.board.blackPlayer;
    }
    canMove(target){
    if(target.y===this.cell.y&&target.x===this.cell.x){return false}
     if(target.board.whiteKingMated||target.board.BlackKingMated){return false}
       if(!this.player.movesNow){return false}
      if(target.figure?.color===this.color){return false}
      if(target.figure?.name===FigureNames.KING){return false}
      return true
    }
    canAttack(target){if(target.x===this.cell.x&&target.y===this.cell.y){return false}
return true}
    moved(target){
    this.cell.board.incMoves()
    }
}