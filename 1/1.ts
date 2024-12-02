const resultSpan = document.getElementById('result') as HTMLElement;
const dataInput = document.getElementById('inputData') as HTMLTextAreaElement;

function calculateTotalDistance(inputData: string): number {
    if (inputData === "") throw new Error();

    const { list1, list2 } = parseInputToLists(inputData);
    return list1.reduce((total, value, index) => total + Math.abs(value - list2[index]), 0);
}

function calculateSimilarityScore(inputData: string): number {
    if (inputData === "") throw new Error();

    const { list1, list2 } = parseInputToLists(inputData);
    return list1.reduce((total, value) => total + (list2.filter(number => number === value).length * value), 0);
}

function parseInputToLists(inputData: string): { list1: number[]; list2: number[] } {
    const list1: number[] = [];
    const list2: number[] = [];

    inputData.trim().split('\n').forEach(line => {
        const [left, right] = line.trim().split(/\s+/).map(Number);
        list1.push(left);
        list2.push(right);
    });

    list1.sort();
    list2.sort();

    return { list1, list2 };
}

function handleCalculationClick(calculationFunction: (inputData: string) => number) {
    return function(event: Event) {
        const inputData = dataInput.value;

        try {
            const result = calculationFunction(inputData);
            resultSpan.textContent = `${result}`;
        } catch (error) {
            resultSpan.textContent = 'Invalid input';
        }
    };
}

document.getElementById('calculateDistanceBtn')!.addEventListener('click', function(event) {
    const inputData = dataInput.value;

    try {
        const result = calculateTotalDistance(inputData);
        resultSpan.textContent = `${result}`;
    } catch (error) {
        resultSpan.textContent = 'Invalid input';
    }
});

document.getElementById('calculateDistanceBtn')!.addEventListener('click', handleCalculationClick(calculateTotalDistance));
document.getElementById('calculateSimilarityBtn')!.addEventListener('click', handleCalculationClick(calculateSimilarityScore));
