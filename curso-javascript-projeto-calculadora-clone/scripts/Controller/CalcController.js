class CalcController {

    constructor(){
        //Underline denota atributo private
        this._currentDate; 
        //Manipulando o DOM usando Document. Recuperando os locais de cada elemente por querySelector
        this._displayCalcEl = document.querySelector("#display");
        this._dateCalcEl = document.getElementById("data"); //Igual
        this._timeCalcEl = document.querySelector("#hora");
        this.initialize();
    }

    initialize(){
       this._displayCalcEl.innerHTML = "4568"
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(valor){
       this._displayCalcEl.innerHTML = valor; 
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(valor){
        this._currentDate = valor; 
    }

}