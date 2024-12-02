const resultSpan = document.getElementById('result') as HTMLElement;
const dataInput = document.getElementById('inputData') as HTMLTextAreaElement;

function calculateTotalSafe(inputData: number[][]): number {
    function isSafe(list: number[]): boolean {
        if (list.length < 2) return false;
        
        const direction = list[1] - list[0];
        if (Math.abs(direction) < 1 || Math.abs(direction) > 3) return false;
    
        return list.slice(1).every((value, index) => {
            const diff = value - list[index];
            return (
                Math.abs(diff) >= 1 &&
                Math.abs(diff) <= 3 &&
                (direction > 0 ? diff > 0 : diff < 0)
            );
        });
    }

    return inputData.reduce((total, value) => total + (isSafe(value) ? 1 : 0), 0);
}

function calculateTotalSafeWithDampener(inputData: number[][]): number {
    // const { list1, list2 } = parseInputToLists(inputData);
    // return list1.reduce((total, value) => total + (list2.filter(number => number === value).length * value), 0);
    return 1;
}

function parseInputToLists(inputData: string): number[][] {
    return inputData
        .trim()
        .split('\n')
        .map(line => line.trim().split(/\s+/).map(Number));
}

function handleCalculationClick(calculationFunction: (inputData: number[][]) => number) {
    return function(event: Event) {
        const inputData = dataInput.value;

        try {
            if (inputData === "") throw new Error();

            const result = calculationFunction(parseInputToLists(inputData));
            resultSpan.textContent = `${result}`;
        } catch (error) {
            resultSpan.textContent = 'Invalid input';
        }
    };
}

document.getElementById('calculateSafeBtn')!.addEventListener('click', handleCalculationClick(calculateTotalSafe));
document.getElementById('calculateSafeDampenerBtn')!.addEventListener('click', handleCalculationClick(calculateTotalSafeWithDampener));
