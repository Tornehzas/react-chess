import { Figure, FigureNames } from "./Figure";
import blackLogo from '../assets/bB.png'
import whiteLogo from '../assets/wB.png'
import { Colors } from "../Colors";

export class Bishop extends Figure{
    name=FigureNames.BISHOP;
    constructor(color, cell){
        super(color,cell)
        this.color=color;
        this.cell=cell;
        this.logo=this.color===Colors.black?blackLogo:whiteLogo
    }
    canMove(target){
        if(!super.canMove(target)){return false}
        if(this.cell.isEmptyDiagonal(target)){return true}
         return false;
    }
    canAttack(target){
        if(!super.canAttack(target)){return false}
        if(this.cell.isEmptyDiagonalForAttack(target)){return true}
         return false;
    }
    moved(target){
        super.moved(target)
        }
}