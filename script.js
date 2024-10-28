document.getElementById('calculateBtn').addEventListener('click', function() {
    const input = document.getElementById('matrixInput').value;
    const matrix = parseInput(input);
    const { L, D, U } = LDUFactorization(matrix);
    displayResult(L, D, U);
});

function parseInput(input) {
    return input.split('\n').map(row => row.split(',').map(Number));
}

function LDUFactorization(matrix) {
    const n = matrix.length;
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    const U = Array.from({ length: n }, () => Array(n).fill(0));
    const D = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        L[i][i] = 1; // Initialize L
        D[i][i] = matrix[i][i]; // Initialize D
    }

    for (let j = 0; j < n; j++) {
        for (let i = j; i < n; i++) {
            U[j][i] = matrix[j][i]; // Fill U
        }

        for (let i = j + 1; i < n; i++) {
            L[i][j] = U[j][j] === 0 ? 0 : U[j][i] / U[j][j]; // Fill L
            for (let k = j; k < n; k++) {
                U[j][k] -= L[i][j] * U[j][k]; // Update U
            }
        }
    }

    return { L, D, U };
}

function displayResult(L, D, U) {
    let resultHtml = '<h2>Results:</h2>';
    resultHtml += '<h3>L:</h3>' + matrixToHTML(L);
    resultHtml += '<h3>D:</h3>' + matrixToHTML(D);
    resultHtml += '<h3>U:</h3>' + matrixToHTML(U);
    document.getElementById('result').innerHTML = resultHtml;
}

function matrixToHTML(matrix) {
    return '<pre>' + matrix.map(row => row.join(' ')).join('\n') + '</pre>';
}
