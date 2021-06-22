<template>
  <div class="calculator">
    <div class="display">{{current || '0'}}</div>
    <div @click="clear" class="btn">C</div>
    <div @click="sign" class="btn">+/-</div>
    <div @click="percent" class="btn">%</div>
    <div @click="divide" class="btn operator">÷</div>
    <div @click='append("7")' class="btn" id="btn7">7</div>
    <div @click='append("8")' class="btn" id="btn8">8</div>
    <div @click='append("9")' class="btn" id="btn9">9</div>
    <div @click="times" class="btn operator">x</div>
    <div @click='append("4")' class="btn" id="btn4">4</div>
    <div @click='append("5")' class="btn" id="btn5">5</div>
    <div @click='append("6")' class="btn" id="btn6">6</div>
    <div @click="minus" class="btn operator">-</div>
    <div @click='append("1")' class="btn" id="btn1">1</div>
    <div @click='append("2")' class="btn" id="btn2">2</div>
    <div @click='append("3")' class="btn" id="btn3">3</div>
    <div @click="add" class="btn operator">+</div>
    <div @click='append("0")' class="btn zero">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click='equal' class="btn operator" id='equal'>=</div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      previous: '',
      current: '',
      operator: null,
      operatorClicked: false
    }
  },
  methods: {
    clear() {
      this.current = ''
      this.previous = ''
      this.operator = null
      this.operatorClicked = false
    },
    sign() {
      if (this.current !== ''){
        this.current = this.current.charAt(0) === '-' ? this.current.slice(1) : `-${this.current}`
        this.operatorClicked = false
      }
    },
    percent(){
      if (this.current !== ''){
        this.current = `${parseFloat(this.current) / 100}`
      }
    },
    append(number){
      if (this.operatorClicked){
        this.current = ''
        this.operatorClicked = false
      } 
      this.current = `${this.current}${number}`
    },
    dot(){
      if (this.current !== ''){
        if (!this.current.includes('.')){
          this.append('.')
        }
      }
    },
    operate(){
      if (this.operator !== null){
        this.equal()
      }
    },
    setPrevious(){
      this.previous = this.current
      this.operatorClicked = true
    },
    divide(){
      this.operate()
      this.operator = (a,b) => a / b
      this.setPrevious()
    },
    times(){
      this.operate()
      this.operator = (a,b) => a * b
      this.setPrevious()
    },
    minus(){
      this.operate()
      this.operator = (a,b) => a - b
      this.setPrevious()
    },
    add(){
      this.operate()
      this.operator = (a,b) => a + b
      this.setPrevious()
    },
    equal(){
      if (this.operator !== null){
        this.current = `${this.operator(parseFloat(this.previous), parseFloat(this.current))}`
      }
    }
  }
}
</script>
<style scoped>
  .calculator{
    margin: 0px auto;
    width: 400px;
    font-size: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(50px, auto);
  }
  .display{
    grid-column: 1 / 5;
    background-color: #333;
    color: white;
  }
  .zero{
    grid-column: 1/3;
  }
  .btn {
    background-color: #f2f2f2;
    border: 1px solid #999;
    cursor: pointer;
    user-select: none;
  }
  .operator {
    background-color: orange;
    color: white;
  }
</style>
