const output = document.getElementById("screen")
const clearButton = document.getElementById("clear")
const backButton = document.getElementById("back")
const buttonContainer = document.getElementById("button-container")

const numberRegex = /[0-9]/
const operationRegex = /[+*-/]/

let expression = {
  operand1: "0",
  operation: "",
  operand2: ""
}

function clear(){
  console.log("clear");
  expression.operand1 = "0";
  expression.operand2 = "";
  expression.operation = ""
  updateOutput()
}

function undoInput(){
  if(expression.operand2) expression.operand2 = expression.operand2.slice(0, -1)
  else if(expression.operation) expression.operation = ""
  else if (expression.operand1) expression.operand1 = expression.operand1.slice(0, -1)
  
  if (!expression.operand1) expression.operand1 = "0"
    
  updateOutput()
}

function updateOutput(){
  output.textContent = `${expression.operand1 ?? "0"} ${expression.operation ?? ""} ${expression.operand2 ?? ""}`
}

function addNumber(newNumber){
  if(expression.operation){
    if(newNumber === "." && expression.operand2.includes(".")) return
    expression.operand2 += newNumber
  } else {
    if(newNumber === "." && expression.operand1.includes(".")) return
    if(expression.operand1 === "0") expression.operand1 = newNumber 
    else expression.operand1 += newNumber
  }
  updateOutput()
}

function setOperation(operation){
  if(!+expression.operand1 && operation !== "-") return
  else if(!+expression.operand1 && operation === "-") expression.operand1
  
  expression.operation = operation
  updateOutput()
}

function operate(){
  console.log(expression);
  let product;
  if(!expression.operand2 || !expression.operation) return
  
  
  if(expression.operation === "+"){
    product = +expression.operand1 + +expression.operand2
  } else if(expression.operation === "-"){
    product = +expression.operand1 - +expression.operand2
  } else if(expression.operation === "*"){
    product = +expression.operand1 * +expression.operand2
  } else if(expression.operation === "/"){
    product = +expression.operand1 / +expression.operand2
  }
  expression = {
    operand1: String(product),
    operation: "",
    operand2: ""
  }
  updateOutput()
}

buttonContainer.addEventListener("click", event => {
  userInput(event.target.className)
})

function userInput(instruction) {
  // clear, back, equals, /[0-9]/, operate
  if(instruction === "Escape") return clear()
  else if (instruction === "Backspace") return undoInput()
  else if(instruction === "Enter") return operate()
  else if(Number.isInteger(+instruction) || instruction === "."){
    addNumber(instruction)
  } else if(instruction === "+" || instruction === "-" || instruction === "/" || instruction === "*"){
    setOperation(instruction)
  }
  
}

document.addEventListener("keydown", event => {
  userInput(event.key)
})


updateOutput(expression)