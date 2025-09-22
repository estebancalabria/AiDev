"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [memory, setMemory] = useState(0)
  const [isRadians, setIsRadians] = useState(true)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return secondValue !== 0 ? firstValue / secondValue : 0
      case "^":
        return Math.pow(firstValue, secondValue)
      case "mod":
        return firstValue % secondValue
      default:
        return secondValue
    }
  }

  const performScientificOperation = (func: string) => {
    const inputValue = Number.parseFloat(display)
    let result: number

    switch (func) {
      case "sin":
        result = Math.sin(isRadians ? inputValue : (inputValue * Math.PI) / 180)
        break
      case "cos":
        result = Math.cos(isRadians ? inputValue : (inputValue * Math.PI) / 180)
        break
      case "tan":
        result = Math.tan(isRadians ? inputValue : (inputValue * Math.PI) / 180)
        break
      case "asin":
        result = Math.asin(inputValue)
        if (!isRadians) result = (result * 180) / Math.PI
        break
      case "acos":
        result = Math.acos(inputValue)
        if (!isRadians) result = (result * 180) / Math.PI
        break
      case "atan":
        result = Math.atan(inputValue)
        if (!isRadians) result = (result * 180) / Math.PI
        break
      case "log":
        result = Math.log10(inputValue)
        break
      case "ln":
        result = Math.log(inputValue)
        break
      case "sqrt":
        result = Math.sqrt(inputValue)
        break
      case "x²":
        result = inputValue * inputValue
        break
      case "x³":
        result = inputValue * inputValue * inputValue
        break
      case "1/x":
        result = inputValue !== 0 ? 1 / inputValue : 0
        break
      case "e^x":
        result = Math.exp(inputValue)
        break
      case "10^x":
        result = Math.pow(10, inputValue)
        break
      case "x!":
        result = factorial(inputValue)
        break
      case "±":
        result = -inputValue
        break
      case "π":
        result = Math.PI
        break
      case "e":
        result = Math.E
        break
      default:
        result = inputValue
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const factorial = (n: number): number => {
    if (n < 0 || n !== Math.floor(n)) return Number.NaN
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const memoryOperation = (op: string) => {
    const inputValue = Number.parseFloat(display)

    switch (op) {
      case "MC":
        setMemory(0)
        break
      case "MR":
        setDisplay(String(memory))
        setWaitingForOperand(true)
        break
      case "M+":
        setMemory(memory + inputValue)
        break
      case "M-":
        setMemory(memory - inputValue)
        break
      case "MS":
        setMemory(inputValue)
        break
    }
  }

  const equals = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Calculadora Científica</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Display */}
        <div className="bg-muted p-4 rounded-lg">
          <div className="text-right text-2xl font-mono font-bold text-foreground min-h-8 overflow-hidden">
            {display}
          </div>
          <div className="text-right text-sm text-muted-foreground mt-1">
            {memory !== 0 && "M"} {isRadians ? "RAD" : "DEG"}
          </div>
        </div>

        {/* Memory and Mode Controls */}
        <div className="grid grid-cols-6 gap-2">
          <Button variant="destructive" size="sm" onClick={() => memoryOperation("MC")}>
            MC
          </Button>
          <Button variant="outline" size="sm" onClick={() => memoryOperation("MR")}>
            MR
          </Button>
          <Button variant="outline" size="sm" onClick={() => memoryOperation("M+")}>
            M+
          </Button>
          <Button variant="outline" size="sm" onClick={() => memoryOperation("M-")}>
            M-
          </Button>
          <Button variant="outline" size="sm" onClick={() => memoryOperation("MS")}>
            MS
          </Button>
          <Button variant={isRadians ? "default" : "outline"} size="sm" onClick={() => setIsRadians(!isRadians)}>
            {isRadians ? "RAD" : "DEG"}
          </Button>
        </div>

        {/* Scientific Functions Row 1 */}
        <div className="grid grid-cols-6 gap-2">
          <Button variant="secondary" onClick={() => performScientificOperation("sin")}>
            sin
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("cos")}>
            cos
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("tan")}>
            tan
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("log")}>
            log
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("ln")}>
            ln
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("sqrt")}>
            √
          </Button>
        </div>

        {/* Scientific Functions Row 2 */}
        <div className="grid grid-cols-6 gap-2">
          <Button variant="secondary" onClick={() => performScientificOperation("asin")}>
            sin⁻¹
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("acos")}>
            cos⁻¹
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("atan")}>
            tan⁻¹
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("x²")}>
            x²
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("x³")}>
            x³
          </Button>
          <Button variant="secondary" onClick={() => performOperation("^")}>
            xʸ
          </Button>
        </div>

        {/* Scientific Functions Row 3 */}
        <div className="grid grid-cols-6 gap-2">
          <Button variant="secondary" onClick={() => performScientificOperation("π")}>
            π
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("e")}>
            e
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("e^x")}>
            eˣ
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("10^x")}>
            10ˣ
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("1/x")}>
            1/x
          </Button>
          <Button variant="secondary" onClick={() => performScientificOperation("x!")}>
            x!
          </Button>
        </div>

        {/* Main Calculator Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <Button variant="destructive" onClick={clear}>
            C
          </Button>
          <Button variant="outline" onClick={clearEntry}>
            CE
          </Button>
          <Button variant="outline" onClick={() => performScientificOperation("±")}>
            ±
          </Button>
          <Button variant="outline" onClick={() => performOperation("÷")}>
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => inputNumber("7")}>7</Button>
          <Button onClick={() => inputNumber("8")}>8</Button>
          <Button onClick={() => inputNumber("9")}>9</Button>
          <Button variant="outline" onClick={() => performOperation("×")}>
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => inputNumber("4")}>4</Button>
          <Button onClick={() => inputNumber("5")}>5</Button>
          <Button onClick={() => inputNumber("6")}>6</Button>
          <Button variant="outline" onClick={() => performOperation("-")}>
            -
          </Button>

          {/* Row 4 */}
          <Button onClick={() => inputNumber("1")}>1</Button>
          <Button onClick={() => inputNumber("2")}>2</Button>
          <Button onClick={() => inputNumber("3")}>3</Button>
          <Button variant="outline" onClick={() => performOperation("+")}>
            +
          </Button>

          {/* Row 5 */}
          <Button onClick={() => inputNumber("0")} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button variant="default" onClick={equals} className="bg-primary">
            =
          </Button>
        </div>

        {/* Additional Operations */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => performOperation("mod")}>
            mod
          </Button>
          <Button variant="outline" onClick={() => performOperation("^")}>
            x^y
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
