import { Cell } from "./Cell"
import { Colors } from "./Colors"
import { Player } from "./Player"
import { Bishop } from "./figures/Bishop"
import { FigureNames } from "./figures/Figure"
import { King } from "./figures/King"
import { Knight } from "./figures/Knight"
import { Pawn } from "./figures/Pawn"
import { Queen } from "./figures/Queen"
import { Rook } from "./figures/Rook"


export class Board {
    cells = []
    pawnTransformCell;
    blackPlayer;
    whitePlayer;
    moves = 0;
    whiteKingChecked;
    blackKingChecked;
    whiteKingMated;
    blackKingMated;
    attackingCell;
    attackedCell;
    availableMovesWhite=0
    availableMovesWhiteWithKing=0
    availableMovesBlack=0
    availableMovesBlackWithKing=0
    incMoves() { this.moves++ }

    pawnTransformCheck(){
        for(let i=0; i<8; i++){
           if(this.cells[0][i].figure?.name===FigureNames.PAWN&&
               this.cells[0][i].figure?.color===Colors.white){
                this.pawnTransformCell=this.cells[0][i]
                return true
               }
            if(this.cells[7][i].figure?.name===FigureNames.PAWN&&
                this.cells[7][i].figure?.color===Colors.black){
                this.pawnTransformCell=this.cells[7][i]
                return true
                }
        }
    }
    pawnTransform(){
        this.getCell(this.pawnTransformCell.y, this.pawnTransformCell.x).figure=new Queen(this.pawnTransformCell.figure.color,this.getCell(this.pawnTransformCell.y, this.pawnTransformCell.x))
    }
    precheck(cell, target){
    let cellfc=cell.figure?.color
    let targetf=target.figure
    let iboard=cell.board.getCopyBoard()
    iboard.getCell(cell.y, cell.x).moveFigure(iboard.getCell(target.y, target.x))
    iboard.clearAttackedCells()
    iboard.markAttackedCells()
    if(cellfc===Colors.white){
      if(iboard.whitePlayer.movesNow===true&&iboard.whiteKingChecked===true){
        iboard.getCell(target.y, target.x).moveFigure(iboard.getCell(cell.y, cell.x))
      if(targetf)  {iboard.getCell(target.y, target.x).setFigure(targetf)}
      iboard.clearAttackedCells()
      iboard.markAttackedCells()
        return false}  
      return true
    }
    if(cellfc===Colors.black){
        if(iboard.blackPlayer.movesNow===true&&iboard.blackKingChecked===true){
        iboard.getCell(target.y, target.x).moveFigure(iboard.getCell(cell.y, cell.x))
        if(targetf){iboard.getCell(target.y, target.x).setFigure(targetf)}
        iboard.clearAttackedCells()
        iboard.markAttackedCells()
            return false}  
        return true
      }
    }
    swapPlayers() {
        this.blackPlayer.movesNow === true ? this.blackPlayer.movesNow = false : this.blackPlayer.movesNow = true;
        this.whitePlayer.movesNow === true ? this.whitePlayer.movesNow = false : this.whitePlayer.movesNow = true;
    }
    initPlayers() {
        this.whitePlayer = new Player(Colors.white)
        this.blackPlayer = new Player(Colors.black)
    }
    isKingChecked() {
        if (this.whiteKingChecked || this.blackKingChecked) { return true }
    }
    isCheckmate(newBoard) {
        if (this.blackKingChecked) {
            if (this.getCell(this.attackedCell.y, this.attackedCell.x).attackedByWhiteTimes > 1) {
                if (this.getCell(this.attackedCell.y, this.attackedCell.x).figure.checkedKingCannotMove(newBoard)) {
                    this.blackKingMated = true;
                    return true
                }
            }
            if (this.getCell(this.attackedCell.y, this.attackedCell.x).attackedByWhiteTimes===1) {
                if (
                    this.getCell(this.attackedCell.y, this.attackedCell.x).figure.checkedKingCannotMove(newBoard)&&
                    this.getCell(this.attackedCell.y, this.attackedCell.x).figure.checkedKingCannotShield(newBoard)
                ) {
                    this.blackKingMated = true
                    return true
                }

            }
        } return false
        
    }
    markAttackedCells() {
        for (let row = 0; row < this.cells.length; row++) {
            for (let column = 0; column < this.cells[row].length; column++) {
                let target = this.cells[row][column];
                if (target.figure) {
                    for (let i = 0; i < this.cells.length; i++) {
                        for (let j = 0; j < this.cells[i].length; j++) {
                            if (target.figure.color === Colors.black) {
                                if(this.blackPlayer.movesNow){
                                if(target.figure.canMove(this.cells[i][j])){
                                    this.availableMovesBlackWithKing++
                                    if(target.figure.name!==FigureNames.KING){
                                    this.cells[i][j].availableToMoveBlack=true
                                    this.availableMovesBlack++  
                                    }
                                    }}
                                if (target.figure.canAttack(this.cells[i][j])) {
                                    this.cells[i][j].attackedByBlack = true
                                    this.cells[i][j].attackedByBlackTimes++
                                    if (this.cells[i][j].figure?.name === FigureNames.KING &&
                                        this.cells[i][j].figure?.color === Colors.white) {
                                        
                                        this.cells[i][j].launchesCHECKEDKing = true
                                        this.whiteKingChecked = true;
                                        this.attackedCell = this.getCell(i, j)
                                        this.attackingCell = this.getCell(row, column)
                                    }
                                }

                            }
                            if (target.figure.color === Colors.white) {
                                if(this.whitePlayer.movesNow){
                                if(target.figure.canMove(this.cells[i][j])){
                                    this.availableMovesWhiteWithKing++
                                    if(target.figure.name!==FigureNames.KING){
                                    this.cells[i][j].availableToMoveWhite=true
                                    this.availableMovesWhite++  
                                    }
                                    }}
                                if (target.figure.canAttack(this.cells[i][j])) {
                                    this.cells[i][j].attackedByWhite = true
                                    this.cells[i][j].attackedByWhiteTimes++
                                    if (this.cells[i][j].figure?.name === FigureNames.KING &&
                                        this.cells[i][j].figure?.color === Colors.black) {
                            
                                        this.cells[i][j].launchesCHECKEDKing = true
                                        this.blackKingChecked = true
                                        this.attackedCell = this.getCell(i, j)
                                        this.attackingCell = this.getCell(row, column)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    clearAttackedCells() {
        for (let row = 0; row < this.cells.length; row++) {
            for (let column = 0; column < this.cells[row].length; column++) {
                this.cells[row][column].attackedByBlack = false;
                this.cells[row][column].attackedByWhite = false;
                this.cells[row][column].launchesCHECKEDKing = false
                this.cells[row][column].attackedByBlackTimes = 0;
                this.cells[row][column].attackedByWhiteTimes = 0;
                this.cells[row][column].availableToMoveWhite = false;
                this.cells[row][column].availableToMoveBlack = false;
                this.availableMovesWhite=0;
                this.availableMovesBlack=0;
                this.availableMovesBlackWithKing=0;
                this.availableMovesWhiteWithKing=0;
                this.blackKingChecked = false;
                this.blackKingMated = false;
                this.whiteKingChecked = false;
                this.whiteKingMated = false;
                this.attackingCell = null;
                this.attackedCell = null
            }
        }
    }
    getCopyBoard() {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.whitePlayer = this.whitePlayer;
        newBoard.blackPlayer = this.blackPlayer;
        newBoard.blackKingChecked = this.blackKingChecked;
        newBoard.blackKingMated = this.blackKingMated;
        newBoard.whiteKingChecked = this.whiteKingChecked;
        newBoard.whiteKingMated = this.whiteKingMated;
        newBoard.attackedCell = this.attackedCell
        newBoard.attackingCell = this.attackingCell
        newBoard.availableMovesWhite=this.availableMovesWhite
        newBoard.availableMovesBlack=this.availableMovesBlack
        newBoard.moves = this.moves
        return newBoard;
    }
    getCell(y, x) {
        return this.cells[y][x];
    }
    initCells() {
        for (let i = 0; i < 8; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(Colors.black, i, j, this))
                } else {
                    row.push(new Cell(Colors.white, i, j, this))
                }
            }
            this.cells.push(row)
        }
    }
    addFigures() {
        this.addPawns()
        this.addKings()
        this.addQueens()
        this.addBishops()
        this.addKnights()
        this.addRooks()
    }
    addKings() {
        new King(Colors.black, this.cells[0][4])
        new King(Colors.white, this.cells[7][4])
    }
    addQueens() {
        new Queen(Colors.black, this.cells[0][3])
        new Queen(Colors.white, this.cells[7][3])
    }
    addBishops() {
        new Bishop(Colors.black, this.cells[0][2])
        new Bishop(Colors.white, this.cells[7][2])
        new Bishop(Colors.black, this.cells[0][5])
        new Bishop(Colors.white, this.cells[7][5])
    }
    addKnights() {
        new Knight(Colors.black, this.cells[0][6])
        new Knight(Colors.white, this.cells[7][6])
        new Knight(Colors.black, this.cells[0][1])
        new Knight(Colors.white, this.cells[7][1])
    }
    addRooks() {
        new Rook(Colors.black, this.cells[0][0])
        new Rook(Colors.white, this.cells[7][0])
        new Rook(Colors.black, this.cells[0][7])
        new Rook(Colors.white, this.cells[7][7])
    }
    addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.black, this.cells[1][i])
            new Pawn(Colors.white, this.cells[6][i])
        }
    }
}