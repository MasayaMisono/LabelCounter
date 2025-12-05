/**
 * シール総数と綴り枚数から、帯分数形式の必要台紙枚数を計算し文字列で返す関数
 * @param {number} totalStickers - 必要なシール総数
 * @param {number} sheetSize - 台紙の綴り枚数
 * @returns {string} 帯分数形式の文字列 (例: "8 4/12")
 */
function calculateSheet(totalStickers, sheetSize) {
    // 入力が無効な場合やゼロの場合のチェック
    if (sheetSize <= 0) return "綴り枚数エラー";
    if (totalStickers < 0) return "シール枚数エラー";
    if (totalStickers === 0) return "0";

    // 整数部（必要な台紙の完全な枚数）
    const integerPart = Math.floor(totalStickers / sheetSize);

    // 端数（余りのシール枚数）
    const remainder = totalStickers % sheetSize;

    if (remainder === 0) {
        // 端数がない場合
        return integerPart.toString();
    } else {
        // 帯分数として表示
        // 例: 8と4/12 の場合 -> "8 4/12"
        if (integerPart === 0) {
            // 例: 10/12 の場合 -> "10/12"
            return `${remainder}/${sheetSize}`;
        }
        return `${integerPart} ${remainder}/${sheetSize}`;
    }
}

/**
 * フォームの入力値を取得し、計算を実行して結果を表示するメイン関数
 */
function runCalculation() {
    // 1. 全ての入力値を取得（数値として）
    const N = parseInt(document.getElementById('input-N').value, 10);
    const COut = parseInt(document.getElementById('input-COut').value, 10);
    const SOut = parseInt(document.getElementById('input-SOut').value, 10);
    const CIn = parseInt(document.getElementById('input-CIn').value, 10);
    const SIn = parseInt(document.getElementById('input-SIn').value, 10);

    // 2. データ検証（最低限のチェック）
    if (isNaN(N) || isNaN(COut) || isNaN(SOut) || isNaN(CIn) || isNaN(SIn) || N <= 0) {
        alert("全ての項目に有効な（1以上の）数値を入力してください。");
        return;
    }

    // --- 外箱用計算 ---
    const totalOuterStickers = N * COut;
    const resultOuter = calculateSheet(totalOuterStickers, SOut);
    document.getElementById('result-TOut').innerText = resultOuter + " 枚";

    // --- 中箱用計算 ---
    const totalInnerStickers = N * CIn;
    const resultInner = calculateSheet(totalInnerStickers, SIn);
    document.getElementById('result-TIn').innerText = resultInner + " 枚";
}

// ページロード時にも初期値を元に計算を実行（オプション）
window.onload = runCalculation;