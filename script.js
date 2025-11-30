// Trickal Crayon Management System
// Data structure: Board → Buff Type → Characters

const crayonData = {
    board1: {
        name: 'ボード1',
        icon: '📋',
        buffs: {
            '全体HP 3%': ['アリス', 'ガヴィア', 'キュウイ', 'クロエ', 'サリー', 'シーラ', 'シルフィール', 'タイダー', 'ヴィヴィ', 'ビッグウッド', 'ヒルデ', 'フリックル', 'ベニー', 'ベリータ', 'マーゴ', 'マエストロMK2', 'マリー', 'ミンス', 'メロナ', 'モモ', 'ユミミ', 'ルード'],
            '全体防御力 3%': ['アメリア', 'アヤ', 'イフリート', 'エルフィン', 'カンナ', 'ギデオン', 'コミー', 'シェイディ', 'ジェイド', 'シオン・ザ・DB', 'ジュビー', 'スピッキー', 'チョッピー', 'バター', 'パトラ', 'ピコラ', 'フェスタ', 'ヘイリー', 'ベル', 'ポーシャー', 'マヨ', 'ヨミ', 'レイジー'],
            '全体攻撃力 3%': ['アヤ', 'エルフィン', 'ガヴィア', 'キュウイ', 'シーラ', 'シェイディ', 'ジュビー', 'スピッキー', 'タイダー', 'バター', 'パトラ', 'ビッグウッド', 'ヒルデ', 'フェスタ', 'フリックル', 'ベル', 'マーゴ', 'マリー', 'ミンス', 'メロナ', 'モモ', 'ヨミ'],
            '会心・会心ダメージ 3%': ['アリス', 'アレット', 'ウイ', 'エスピー', 'カレン', 'クロエ', 'サリー', 'シスト', 'シルフィール', 'ディアナ', 'ヴィヴィ', 'ベニー', 'ベリータ', 'ベルベット', 'マエストロMK2', 'メゾン', 'ユミミ', 'リム', 'ルード', 'ルポ', 'レヴィ'],
            '全体会心抵抗・会心DMG抵抗 3%': ['アレット', 'アメリア', 'イフリート', 'ウイ', 'エスピー', 'カレン', 'カンナ', 'ギデオン', 'コミー', 'ジェイド', 'シオン・ザ・DB', 'シスト', 'チョッピー', 'ディアナ', 'ヘイリー', 'ベルベット', 'ピコラ', 'ポーシャー', 'マヨ', 'メゾン', 'レイジー', 'レヴィ', 'ルポ', 'リム']
        }
    },
    board2: {
        name: 'ボード2',
        icon: '📄',
        buffs: {
            '全体攻撃力 4%': ['アヤ', 'ギデオン', 'コミー', 'シーラ', 'シオン・ザ・DB', 'ジュビー', 'バター', 'ピコラ', 'ポーシャー', 'モモ', 'ヨミ'],
            '会心・会心ダメージ 4%': ['ウイ', 'ギデオン', 'クロエ', 'コミー', 'シオン・ザ・DB', 'シルフィール', 'ヴィヴィ', 'ピコラ', 'ポーシャー', 'リム', 'カンナ', 'ヘイリー'],
            '全体HP 4%': ['アヤ', 'ウイ', 'ギデオン', 'コミー', 'シオン・ザ・DB', 'ジュビー', 'バター', 'ピコラ', 'ポーシャー', 'ヨミ', 'リム'],
            '全体防御力 4%': ['アヤ', 'クロエ', 'シーラ', 'シルフィール', 'バター', 'ヴィヴィ', 'モモ', 'ヨミ'],
            '全体会心抵抗・会心DMG抵抗 4%': ['ウイ', 'クロエ', 'シーラ', 'ジュビー', 'シルフィール', 'ヴィヴィ', 'モモ', 'リム', 'マーゴ']
        }
    },
    board3: {
        name: 'ボード3',
        icon: '📃',
        buffs: {
            '全体攻撃力 5%': ['ギデオン', 'コミー', 'シオン・ザ・DB', 'ジュビー', 'シルフィール', 'バター', 'ポーシャー', 'ヨミ'],
            '会心・会心ダメージ 5%': ['ジュビー', 'シルフィール', 'バター', 'ヨミ'],
            '全体HP 5%': ['ギデオン', 'コミー', 'シオン・ザ・DB', 'ジュビー', 'シルフィール', 'バター', 'ポーシャー', 'ヨミ'],
            '全体防御力 5%': ['ギデオン', 'コミー', 'シオン・ザ・DB', 'シルフィール', 'ポーシャー'],
            '全体会心抵抗・会心DMG抵抗 5%': ['ギデオン', 'コミー', 'シオン・ザ・DB', 'ジュビー', 'バター', 'ポーシャー', 'ヨミ']
        }
    }
};

// Character image URL mapping
// Use local images to avoid CORS issues
function getCharacterImageUrl(characterName) {
    // Try local image first
    return `public/images/characters/${characterName}.png`;
}

// Generate placeholder image as data URL if image doesn't exist
function generatePlaceholderImage(characterName) {
    const canvas = document.createElement('canvas');
    canvas.width = 60;
    canvas.height = 60;
    const ctx = canvas.getContext('2d');

    // Generate a color based on character name
    const hash = characterName.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const hue = Math.abs(hash) % 360;

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, 60, 60);
    gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
    gradient.addColorStop(1, `hsl(${hue + 30}, 70%, 50%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 60, 60);

    // Draw full character name with dynamic font size
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Calculate appropriate font size based on name length
    let fontSize = 16;
    if (characterName.length > 8) {
        fontSize = 10;
    } else if (characterName.length > 6) {
        fontSize = 12;
    } else if (characterName.length > 4) {
        fontSize = 14;
    }

    ctx.font = `bold ${fontSize}px "Noto Sans JP", sans-serif`;

    // Draw text with word wrap if needed
    const maxWidth = 55;
    const words = characterName.split('');
    let line = '';
    let y = 30;

    // For short names, just draw in one line
    if (characterName.length <= 6) {
        ctx.fillText(characterName, 30, 30);
    } else {
        // For longer names, try to fit in available space
        ctx.fillText(characterName, 30, 30);
    }

    return canvas.toDataURL('image/png');
}

// State management
let checkedState = {};
let currentFilter = 'all';
let currentSearch = '';

// Initialize the application
function init() {
    loadState();
    renderContent();
    updateStats();
    setupEventListeners();
}

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('trickalCrayonState');
    if (saved) {
        try {
            checkedState = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load state:', e);
            checkedState = {};
        }
    }
}

// Save state to localStorage
function saveState() {
    try {
        localStorage.setItem('trickalCrayonState', JSON.stringify(checkedState));
    } catch (e) {
        console.error('Failed to save state:', e);
    }
}

// Generate unique ID for each character-buff combination
function getCharacterId(board, buff, character) {
    return `${board}-${buff}-${character}`;
}

// Check if a character is checked
function isChecked(board, buff, character) {
    const id = getCharacterId(board, buff, character);
    return checkedState[id] || false;
}

// Toggle character checked state
function toggleCharacter(board, buff, character) {
    const id = getCharacterId(board, buff, character);
    checkedState[id] = !checkedState[id];
    saveState();
    updateStats();
    renderContent(); // Re-render to update buff counts
}

// Render the main content
function renderContent() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    Object.keys(crayonData).forEach(boardKey => {
        if (currentFilter !== 'all' && currentFilter !== boardKey) {
            return;
        }

        const board = crayonData[boardKey];
        const boardSection = document.createElement('div');
        boardSection.className = 'board-section';
        boardSection.setAttribute('data-board', boardKey);

        const boardTitle = document.createElement('h2');
        boardTitle.className = 'board-title';
        boardTitle.innerHTML = `${board.name}`;
        boardSection.appendChild(boardTitle);

        Object.keys(board.buffs).forEach(buffType => {
            const characters = board.buffs[buffType];
            const filteredCharacters = characters.filter(char =>
                char.toLowerCase().includes(currentSearch.toLowerCase())
            );

            if (filteredCharacters.length === 0) {
                return;
            }

            const buffGroup = document.createElement('div');
            buffGroup.className = 'buff-group';

            // Calculate checked count for this buff type
            const checkedCount = characters.filter(char =>
                isChecked(boardKey, buffType, char)
            ).length;

            const buffTitle = document.createElement('h3');
            buffTitle.className = 'buff-title';

            // Create title text span
            const titleText = document.createElement('span');
            titleText.textContent = buffType;

            // Create count span
            const countSpan = document.createElement('span');
            countSpan.className = 'buff-count';
            countSpan.textContent = `x ${checkedCount}`;

            if (checkedCount === characters.length && characters.length > 0) {
                countSpan.classList.add('all-completed');
            }

            buffTitle.appendChild(titleText);
            buffTitle.appendChild(countSpan);
            buffGroup.appendChild(buffTitle);

            const characterList = document.createElement('div');
            characterList.className = 'character-list';

            filteredCharacters.forEach((character, index) => {
                const characterSpan = document.createElement('span');
                characterSpan.className = 'character-span';
                characterSpan.textContent = character;

                const checked = isChecked(boardKey, buffType, character);
                if (checked) {
                    characterSpan.classList.add('completed');
                }

                characterSpan.addEventListener('click', () => {
                    toggleCharacter(boardKey, buffType, character);
                });

                characterList.appendChild(characterSpan);

                // Add comma if not the last item
                if (index < filteredCharacters.length - 1) {
                    const separator = document.createElement('span');
                    separator.className = 'separator';
                    separator.textContent = ', ';
                    characterList.appendChild(separator);
                }
            });

            buffGroup.appendChild(characterList);
            boardSection.appendChild(buffGroup);
        });

        mainContent.appendChild(boardSection);
    });
}

// Update statistics
function updateStats() {
    let total = 0;
    let completed = 0;

    Object.keys(crayonData).forEach(boardKey => {
        const board = crayonData[boardKey];
        Object.keys(board.buffs).forEach(buffType => {
            board.buffs[buffType].forEach(character => {
                total++;
                if (isChecked(boardKey, buffType, character)) {
                    completed++;
                }
            });
        });
    });

    document.getElementById('completedCount').textContent = completed;
    document.getElementById('totalCount').textContent = total;

    const percentage = total > 0 ? (completed / total) * 100 : 0;
    document.getElementById('progressFill').style.width = `${percentage}%`;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderContent();
    });

    // Filter functionality
    const boardFilter = document.getElementById('boardFilter');
    boardFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        renderContent();
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
