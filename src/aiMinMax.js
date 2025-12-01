/**
 * Trova la mossa ottimale per l'IA (giocatore 'O') usando l'algoritmo Minimax.
 * L'IA è il minimizzatore ('O'), l'umano è il massimizzatore ('X').
 * @param {string[]} board - L'array di 9 stringhe che rappresenta il tabellone ('X', 'O', o '').
 * @returns {number} L'indice (0-8) della mossa migliore.
 */
export function findBestMove(board) {
    // L'IA cerca il punteggio più basso (minimizza le possibilità di vittoria dell'umano)
    let bestScore = Infinity;
    let bestMove = -1;
    const AI_PLAYER = 'o';
    const HUMAN_PLAYER = 'x';

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = AI_PLAYER;
            // Chiama minimax, il turno successivo è del massimizzatore (umano)
            let score = minimax(board, 0, true, AI_PLAYER, HUMAN_PLAYER);
            board[i] = '';

            if (score < bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

/**
 * L'algoritmo Minimax ricorsivo.
 */
function minimax(board, depth, isMaximizingPlayer, aiPlayer, humanPlayer) {
    const winner = checkWinner(board);

    if (winner === humanPlayer) {
        // L'umano vince: punteggio positivo alto
        return 10 - depth;
    }
    if (winner === aiPlayer) {
        // L'IA vince: punteggio negativo (basso)
        return depth - 10;
    }
    if (isBoardFull(board)) {
        return 0; // Pareggio
    }

    if (isMaximizingPlayer) {
        // Turno del massimizzatore (Umano 'X'): cerca il punteggio massimo
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = humanPlayer;
                bestScore = Math.max(bestScore, minimax(board, depth + 1, false, aiPlayer, humanPlayer));
                board[i] = '';
            }
        }
        return bestScore;
    } else {
        // Turno del minimizzatore (IA 'O'): cerca il punteggio minimo
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = aiPlayer;
                bestScore = Math.min(bestScore, minimax(board, depth + 1, true, aiPlayer, humanPlayer));
                board[i] = '';
            }
        }
        return bestScore;
    }
}

/**
 * Controlla se c'è un vincitore sul tabellone.
 */
function checkWinner(board) {
    // Lista corretta di tutte le combinazioni vincenti (8 totali)
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Righe
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonne
        [0, 4, 8], [2, 4, 6]              // Diagonali
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }
    return null;
}

/**
 * Controlla se il tabellone è pieno.
 */
function isBoardFull(board) {
    return board.every(cell => cell !== '');
}