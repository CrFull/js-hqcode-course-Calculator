class CalcController {

    //Parei na aula 13(ontem-17/03)
    constructor(){
        //Underline denota atributo private
        this._currentDate; 
        this._locale = 'pt-BR';
        //Manipulando o DOM usando Document. Recuperando os locais de cada elemente por querySelector
        this._displayCalcEl = document.querySelector("#display");
        this._dateCalcEl = document.getElementById("data"); //Igual ao querySelector
        this._timeCalcEl = document.querySelector("#hora");
        this.initialize();
    }

    initialize(){
        //Para manipular os botões
        this.initButtonsEvents();
        //Para atualizar corretamente a data e hora da calculadora
        this.setDisplayDateTime();
        setInterval(()=>{

            this.setDisplayDateTime();

        }, 1000);
    }

    initButtonsEvents(){

        //Pegandos todos os botões adicionando os eventListener
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach(btn =>{
            addEventListener('click', e=>{
                console.log(e);
            });
        });

    }

    //Definindo a hora do relógio e formantando a data corretamente
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    //Definando os getters e setters para manipulação dos atributos
    get displayTime(){
        return this._timeCalcEl.innerHTML;
    }

    set displayTime(value){
        return this._timeCalcEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateCalcEl.innerHTML;
    }

    set displayDate(value){
        return this._dateCalcEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
       this._displayCalcEl.innerHTML = value; 
    }
    get currentDate(){
        return new Date();
    }
    set currentDate(value){
        this._currentDate = value; 
    }

}