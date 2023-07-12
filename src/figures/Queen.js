import { Figure, FigureNames } from "./Figure"
import { Colors } from "../Colors";
import blackLogo from '../assets/bQ.png'
import whiteLogo from '../assets/wQ.png'

export class Queen extends Figure{
    name=FigureNames.QUEEN;
    constructor(color, cell){
        super(color,cell)
        this.color=color;
        this.cell=cell;
        this.logo=this.color===Colors.black?blackLogo:whiteLogo
    }
    canMove(target){
        if(!super.canMove(target)){return false}
        if(this.cell.isEmptyVertical(target)) {return true};
        if(this.cell.isEmptyHorizontal(target)) {return true};
        if(this.cell.isEmptyDiagonal(target)){return true}
    return false;
    }
    canAttack(target){
        if(!super.canAttack(target)){return false}
        if(this.cell.isEmptyVerticalForAttack(target)) {return true};
        if(this.cell.isEmptyHorizontalForAttack(target)) {return true};
        if(this.cell.isEmptyDiagonalForAttack(target)){return true}
    return false;
    }
    moved(target){
        super.moved(target)
        }
}