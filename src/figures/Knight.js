import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import blackLogo from '../assets/bN.png'
import whiteLogo from '../assets/wN.png'

export class Knight extends Figure{
    name=FigureNames.KNIGHT;
    constructor(color, cell){
        super(color,cell)
        this.color=color;
        this.cell=cell;
        this.logo=this.color===Colors.black?blackLogo:whiteLogo
    }
    canMove(target){
        if(!super.canMove(target))return false
const dx=Math.abs(this.cell.x-target.x)
const dy=Math.abs(this.cell.y-target.y)
return (dx===1&&dy===2)||(dx===2&&dy===1)
    }
    canAttack(target){
        if(!super.canAttack(target)){return false}
        const dx=Math.abs(this.cell.x-target.x)
const dy=Math.abs(this.cell.y-target.y)
return (dx===1&&dy===2)||(dx===2&&dy===1)
    }
    moved(target){
        super.moved(target)
        }
}