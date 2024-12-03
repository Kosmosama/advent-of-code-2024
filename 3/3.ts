const resultSpan = document.getElementById('result') as HTMLElement;
const dataInput = document.getElementById('inputData') as HTMLTextAreaElement;

// Puzzle 1 ------------------------------------------------------------------------------
function calculateMultiplications(inputData: string): number {
    function parseInputToList(inputData: string): string[] {
        return inputData.match(/mul\(\d+,\d+\)/g)!;
    }
    
    return parseInputToList(inputData).reduce((total, value) => {
        const [num1, num2] = value.replace("mul(", "").replace(")", "").split(",").map(Number);
        return total + (num1 * num2);
    }, 0);
}
//---------------------------------------------------------------------------------------

// Puzzle 2 ------------------------------------------------------------------------------
function calculateMultiplicationsWithDos(inputData: string): number {
    const instructions = inputData.match(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g) || [];
    let isEnabled = true;

    return instructions.reduce((total, instruction) => {
        if (instruction === 'do()') {
            isEnabled = true;
        } else if (instruction === "don't()") {
            isEnabled = false;
        } else if (instruction.startsWith('mul(') && isEnabled) {
            const [num1, num2] = instruction
                .match(/\d+/g)!
                .map(Number);
            return total + num1 * num2;
        }
        return total;
    }, 0);
}
//---------------------------------------------------------------------------------------

function handleCalculationClick(calculationFunction: (inputData: string) => number) {
    return function(event: Event) {
        const inputData = dataInput.value;

        try {
            if (inputData === "") throw new Error();

            const result = calculationFunction(inputData);
            resultSpan.textContent = `${result}`;
        } catch (error) {
            resultSpan.textContent = 'Invalid input';
        }
    };
}

document.getElementById('multiplicationsButton')!.addEventListener('click', handleCalculationClick(calculateMultiplications));
document.getElementById('calculateSafeDampenerBtn')!.addEventListener('click', handleCalculationClick(calculateMultiplicationsWithDos));
