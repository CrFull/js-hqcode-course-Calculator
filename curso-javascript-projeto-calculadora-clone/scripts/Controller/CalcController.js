class CalcController {

    //Parei na aula 13(ontem-17/03)
    constructor(){
        //Underline denota atributo private
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
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

        this.setLastNumberToDisplay();
    }

    addEventListenerAll(element, events, fn){
        /*
         Aqui os eventos são separados e transformados em array, aí é possível adicionar
         eventos múltiplos, sem precisar de repetição. Ai para cada elemento(btn) é
         adicionado o evento da vez(click ou drag) e a função em si passada anteirormente(fn)
        */
        events.split(' ').forEach(event =>{
            element.addEventListener(event,fn,false);
        });
    }

    //Limpa todos os campos
    clearAll(){
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    //Limpa somente o ultimo operador
    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    //Pega o ultimo operador no array
    getLastOperator(){
        return this._operation[this._operation.length -1];
    }
    setLastOperator(value){
        this._operation[this._operation.length -1] = value;

    }
    

    //Define se o ultimo operador é um número ou não
    isOperator(value){
       return ['+','-','*','/', "%"].indexOf(value) > -1;
    }

    pushOperation(value){
        this._operation.push(value);
        //Faz a operação caso haja mais de 3 elementos
        if(this._operation.length > 3){
            this.calc();
        }
    }

    getResult(){
       return  eval(this._operation.join(""));
    }

    calc() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if (this._operation.length > 3) {

            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if (this._operation.length === 3) {

            this._lastNumber = this.getLastItem(false);

        }

        let result = this.getResult();

        if (last === '%') {

            result /= 100;
            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) === isOperator) {
                lastItem = this._operation[i];
                break;
            }

        }

        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }
    setLastNumberToDisplay(){
        let lastNumber = this.getLastItem(false);
        if(!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }
    
    //Adiciona ao array operator com base nas regras de negócio da calculadora
    addOperator(value){

        let lastOperator = this.getLastOperator();
        
        //Se o penúltimo elemento digitado for um sinal(+,-,*,/,%)
        if(isNaN(lastOperator)){
            //Se o elemento digitado é um sinal, é necessário trocar o sinal.
            if(this.isOperator(value)){
                this.setLastOperator(value);
            //Se o elemento digitado não for um número
            }else if(isNaN(value)){
                console.log("Outra coisa");
            }
            //Esse else é só para quando o array operation estiver vazio
            else{
                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }

        }else{
            if(this.isOperator(value)){
                this.pushOperation(value);

            }else{
                //Aqui é necessário concatenar o valor se o ultimo elemento no array for número, e não criar mais uma posição no array.
                let correctOperatorString = lastOperator.toString() + value.toString();
                this.setLastOperator(parseInt(correctOperatorString)); //necessário converter   
                this.setLastNumberToDisplay();
            }
        }
        console.log(this._operation);
    }

    //Mostrar "Error" no display em alguma operação inválida
    setError(){
        this.clearAll();
        this.displayCalc = "Error";
    }

    //Delegando as ações dos botões
    execBtn(textBtn){
        switch(textBtn){
            
            case 'ac':
                this.clearAll();
            break;
            
            case 'ce':
                this.clearEntry();
            break;
            
            case 'soma':
                this.addOperator('+');
            break;
            
            case 'subtracao':
                this.addOperator('-');
            break;
            
            case 'divisao':
                this.addOperator('/');
            break;
            
            case 'multiplicacao':
                this.addOperator('*');
            break;
            
            case 'porcento':
                this.addOperator('%');
            break;
            
            case 'igual':
                this.calc();
            break;

            case 'ponto':
                this.addOperator('.');
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperator(parseInt(textBtn));
            break;

            default:
                this.setError();
            break;

        }
    }

    //Evocando as ações dos botões
    initButtonsEvents(){

        //Pegandos todos os botões adicionando os eventListener
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        /*
          Para cada botão(usando o foreach), você vai chamar o metodo "addEventListenerAll" 
          que passa o btn da vez, os eventos que devem ser executados e o que de fato deve 
          acontecer(event).
        */
        buttons.forEach((btn, index) =>{
            this.addEventListenerAll(btn, "click drag", event =>{
               let textBtn = btn.className.baseVal.replace("btn-","");
               this.execBtn(textBtn);
            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", event =>{
                btn.style.cursor = "pointer";
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