import { Colors } from "./Colors";

export class Player{
    color;
    movesNow;
    constructor(color){
        this.color=color;
        this.movesNow=this.color===Colors.white?true:false;
    }
    
}