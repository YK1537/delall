// sound-control.js

let isMuted = localStorage.getItem('isMuted') === 'true';
const keyboardSound = new Audio('assets/sounds/keyboard-sound.mp3');
const trashSound = new Audio('assets/sounds/trash-sound.mp3');
const bubbleSoundSrc = 'assets/sounds/bubble-sound.mp3';
const resetSoundSrc = 'assets/sounds/reset-sound.mp3'; // 新增的音效文件路径

// 更新静音按钮状态
function updateMuteButton() {
    const muteButton = document.getElementById('mute-button');
    if (muteButton) {
        muteButton.querySelector('img').src = isMuted ? 'assets/images/mute-icon.png' : 'assets/images/unmute-icon.png';
    }
}

// 初始化静音状态
function initMuteState() {
    updateMuteButton();
    const muteButton = document.getElementById('mute-button');
    if (muteButton) {
        muteButton.addEventListener('click', () => {
            isMuted = !isMuted;
            localStorage.setItem('isMuted', isMuted);
            updateMuteButton();
        });
    }
}

// 播放音效的通用函数
function playSound(soundSrc, startAt = 0) {
    if (!isMuted) {
        const sound = new Audio(soundSrc);
        sound.currentTime = startAt; // 设置音效开始播放的时间点
        sound.play();
    }
}

// 初始化气泡纸音效
function initBubbleWrapSound() {
    const bubbleWrapElements = document.querySelectorAll('.bubble-wrap');
    bubbleWrapElements.forEach(element => {
        element.addEventListener('click', () => {
            if (!element.classList.contains('popped')) {
                playSound(bubbleSoundSrc, 0.4); // 只播放后0.4秒
                element.classList.add('popped');
            }
        });
    });
}

// 初始化输入框音效
function initInputBoxSound() {
    const inputBox = document.getElementById('input-box');
    if (inputBox) {
        inputBox.addEventListener('input', () => {
            playSound(keyboardSound.src);
        });
    }
}

// 初始化清除按钮音效
function initClearButtonSound() {
    const clearButton = document.getElementById('clear-button');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            playSound(trashSound.src);
        });
    }
}

// 初始化重置按钮
function initResetButton() {
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            const bubbleWrapElements = document.querySelectorAll('.bubble-wrap');
            bubbleWrapElements.forEach(element => {
                element.classList.remove('popped');
            });
            playSound(resetSoundSrc, 0.3); // 播放重置音效
        });
    }
}

// 初始化音效控制
function initSoundControl() {
    initMuteState();
    initBubbleWrapSound();
    initInputBoxSound();
    initClearButtonSound();
    initResetButton();
}

// 在 DOMContentLoaded 事件中初始化音效控制
document.addEventListener('DOMContentLoaded', () => {
    initSoundControl();
});