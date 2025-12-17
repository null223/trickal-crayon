const fs = require('fs');
const path = require('path');

const dataDir = './data';

// ボード定義
const boards = {
    board1: { name: 'ボード1', icon: '📋', buffs: {} },
    board2: { name: 'ボード2', icon: '📄', buffs: {} },
    board3: { name: 'ボード3', icon: '📃', buffs: {} }
};

// ボード名からboardKeyへのマッピング
const boardNameToKey = {
    'ボード1': 'board1',
    'ボード2': 'board2',
    'ボード3': 'board3'
};

// /data/*.json を読み込んで crayonData を生成
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const charName = path.basename(file, '.json');
    const filePath = path.join(dataDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // 各ボードのバフを処理
    Object.keys(data).forEach(boardName => {
        const boardKey = boardNameToKey[boardName];
        if (!boardKey) return;

        const buffs = data[boardName];
        buffs.forEach(buffName => {
            if (!boards[boardKey].buffs[buffName]) {
                boards[boardKey].buffs[buffName] = [];
            }
            boards[boardKey].buffs[buffName].push(charName);
        });
    });
});

// 各バフのキャラクターリストをソート
Object.keys(boards).forEach(boardKey => {
    Object.keys(boards[boardKey].buffs).forEach(buffName => {
        boards[boardKey].buffs[buffName].sort();
    });
});

// crayonData.js を出力 (scriptタグで読み込めるようにグローバル変数として定義)
const output = `const crayonData = ${JSON.stringify(boards, null, 2)};`;
fs.writeFileSync('./crayonData.js', output, 'utf8');

console.log('crayonData.js を生成しました');
console.log('キャラクター数:', files.length);
