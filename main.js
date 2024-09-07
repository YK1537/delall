document.addEventListener('DOMContentLoaded', () => {
    const muteButton = document.getElementById('mute-button');
    const languageSelect = document.getElementById('language-select');
    const collapseButton = document.getElementById('collapse-button');
    const inputBox = document.getElementById('input-box');
    const clearButton = document.getElementById('clear-button');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const backToTop = document.getElementById('back-to-top');
    const homeButton = document.getElementById('home-button');

    // 初始化静音状态，默认不静音
    let isMuted = localStorage.getItem('isMuted') === 'true';
    // 初始化语言设置
    let currentLanguage = localStorage.getItem('currentLanguage') || 'zh';
    // 初始化字体大小
    let currentFontSize = localStorage.getItem('currentFontSize') || 'medium';
    // 初始化删除模式
    let currentDeleteMode = localStorage.getItem('currentDeleteMode') || 'clear';

    const keyboardSound = new Audio('assets/sounds/keyboard-sound.mp3');
    const trashSound = new Audio('assets/sounds/trash-sound.mp3');
    const bubbleSound = new Audio('assets/sounds/bubble-sound.mp3');

    // 定义 translations 变量
    const translations = {
        zh: {
            siteTitle: '坏心情回收站',
            mute: '关闭音效',
            unmute: '开启音效',
            collapse: '折叠按钮',
            backToTop: '回到顶部',
            websiteInfo: '网站说明',
            bubbleWrap: '气泡纸',
            feedback: '建议和赞赏',
            settings: '设置',
            slogan: '删除你的坏心情吧~',
            inputPlaceholder: '请输入内容',
            clear: '清空',
            copyright: 'Copyright © 2024 yk1537',
            友情链接: '友情链接: ',
            websiteInfoContent: '在输入框里输入烦心事，然后销毁它吧！<br>网站不会记录任何信息。',
            feedbackContent: '联系邮箱：Nevercheck@126.com<br>支持我们：',
            settingsContent: '音效：<input type="checkbox" id="sound-toggle"> 开启/关闭<br>语言：<select id="language-setting"> <option value="zh">中文</option> <option value="en">English</option> <option value="ja">日本語</option> <option value="ko">한국어</option> </select>',
            clearAlert: '坏心情已清除~'
        },
        en: {
            siteTitle: 'Bad Mood Recycle Bin',
            mute: 'Mute',
            unmute: 'Unmute',
            collapse: 'Collapse',
            backToTop: 'Back to Top',
            websiteInfo: 'Website Info',
            bubbleWrap: 'Bubble Wrap',
            feedback: 'Feedback',
            settings: 'Settings',
            slogan: 'Delete your bad mood~',
            inputPlaceholder: 'Please enter content',
            clear: 'Clear',
            copyright: 'Copyright © 2024 yk1537',
            友情链接: '友情链接: ',
            websiteInfoContent: 'Enter your troubles in the input box, then destroy them!<br>The website does not record any information.',
            feedbackContent: 'Contact Email: Nevercheck@126.com<br>Support us:',
            settingsContent: 'Sound: <input type="checkbox" id="sound-toggle"> On/Off<br>Language: <select id="language-setting"> <option value="zh">中文</option> <option value="en">English</option> <option value="ja">日本語</option> <option value="ko">한국어</option> </select>',
            clearAlert: 'Bad mood has been cleared~'
        },
        ja: {
            siteTitle: '悪い気分リサイクルビン',
            mute: 'ミュート',
            unmute: 'ミュート解除',
            collapse: '折りたたむ',
            backToTop: 'トップに戻る',
            websiteInfo: 'ウェブサイト情報',
            bubbleWrap: 'プチプチ',
            feedback: 'フィードバック',
            settings: '設定',
            slogan: '悪い気分を削除しましょう~',
            inputPlaceholder: '内容を入力してください',
            clear: 'クリア',
            copyright: 'Copyright © 2024 yk1537',
            友情链接: '友情链接: ',
            websiteInfoContent: '入力ボックスにあなたの悩みを入力し、それを破壊しましょう！<br>ウェブサイトはいかなる情報も記録しません。',
            feedbackContent: '連絡メール: Nevercheck@126.com<br>サポート:',
            settingsContent: 'サウンド: <input type="checkbox" id="sound-toggle"> オン/オフ<br>言語: <select id="language-setting"> <option value="zh">中文</option> <option value="en">English</option> <option value="ja">日本語</option> <option value="ko">한국어</option> </select>',
            clearAlert: '悪い気分は削除されました~'
        },
        ko: {
            siteTitle: '나쁜 기분 재활용통',
            mute: '음소거',
            unmute: '음소거 해제',
            collapse: '접기',
            backToTop: '맨 위로',
            websiteInfo: '웹사이트 정보',
            bubbleWrap: '뽁뽁이',
            feedback: '피드백',
            settings: '설정',
            slogan: '나쁜 기분을 삭제하세요~',
            inputPlaceholder: '내용을 입력하세요',
            clear: '지우기',
            copyright: 'Copyright © 2024 yk1537',
            友情链接: '友情链接: ',
            websiteInfoContent: '입력 상자에 당신의 걱정을 입력하고, 그것을 파괴하세요!<br>웹사이트는 어떠한 정보도 기록하지 않습니다.',
            feedbackContent: '연락 이메일: Nevercheck@126.com<br>지원:',
            settingsContent: '사운드: <input type="checkbox" id="sound-toggle"> 켜기/끄기<br>언어: <select id="language-setting"> <option value="zh">中文</option> <option value="en">English</option> <option value="ja">日本語</option> <option value="ko">한국어</option> </select>',
            clearAlert: '나쁜 기분이 삭제되었습니다~'
        }
    };

    // 初始化语言设置
    languageSelect.value = currentLanguage;
    updateLanguage(currentLanguage);

    // 初始化字体大小和删除模式
    applyFontSize(currentFontSize);
    applyDeleteMode(currentDeleteMode);

    // 更新静音按钮状态
    muteButton.querySelector('img').src = isMuted ? 'assets/images/mute-icon.png' : 'assets/images/unmute-icon.png';

    muteButton.addEventListener('click', () => {
        isMuted = !isMuted;
        localStorage.setItem('isMuted', isMuted);
        muteButton.querySelector('img').src = isMuted ? 'assets/images/mute-icon.png' : 'assets/images/unmute-icon.png';
    });

    languageSelect.addEventListener('change', () => {
        currentLanguage = languageSelect.value;
        localStorage.setItem('currentLanguage', currentLanguage);
        updateLanguage(currentLanguage);
        // 触发语言变化事件
        document.dispatchEvent(new Event('languageChange'));
    });

    collapseButton.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    if (inputBox) {
        inputBox.addEventListener('input', () => {
            if (!isMuted) {
                keyboardSound.play();
            }
            adjustInputBoxHeight();
        });

        clearButton.addEventListener('click', () => {
            if (!isMuted) {
                trashSound.play();
            }
            if (currentDeleteMode === 'clear') {
                inputBox.value = '';
                showAlert(translations[currentLanguage].clearAlert);
            } else if (currentDeleteMode === 'char') {
                deleteCharacters(inputBox);
            }
        });

        inputBox.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                inputBox.value += '\n';
                adjustInputBoxHeight();
            }
        });

        inputBox.addEventListener('focus', () => {
            if (inputBox.value === translations[currentLanguage].inputPlaceholder) {
                inputBox.value = '';
            }
        });

        inputBox.addEventListener('blur', () => {
            if (inputBox.value === '') {
                inputBox.value = translations[currentLanguage].inputPlaceholder;
            }
        });

        function adjustInputBoxHeight() {
            inputBox.style.height = 'auto';
            inputBox.style.height = inputBox.scrollHeight + 'px';
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    function updateLanguage(lang) {
        const translation = translations[lang];
        document.title = translation.siteTitle;
        const siteTitleElement = document.querySelector('.site-title span');
        if (siteTitleElement) {
            siteTitleElement.textContent = translation.siteTitle;
        } else {
            console.error('Element .site-title span not found');
        }

        muteButton.querySelector('img').alt = isMuted ? translation.mute : translation.unmute;
        collapseButton.querySelector('img').alt = translation.collapse;
        backToTop.querySelector('img').alt = translation.backToTop;
        const sloganElement = document.querySelector('.slogan');
        if (sloganElement) {
            sloganElement.textContent = translation.slogan;
        } else {
            console.error('Element .slogan not found');
        }
        if (inputBox) {
            document.getElementById('input-box').placeholder = translation.inputPlaceholder;
            document.getElementById('clear-button').querySelector('img').alt = translation.clear;
        }
        document.querySelector('.copyright').textContent = translation.copyright;
        document.querySelector('.友情链接').innerHTML = translation.友情链接 + '<a href="https://www.deepseek.com" target="_blank">deepseek.com</a>';

        const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
        if (sidebarLinks.length >= 4) {
            sidebarLinks[0].textContent = translation.websiteInfo;
            sidebarLinks[1].textContent = translation.bubbleWrap;
            sidebarLinks[2].textContent = translation.feedback;
            sidebarLinks[3].textContent = translation.settings;
        } else {
            console.error('Not enough sidebar links found');
        }

        const pageTitles = document.querySelectorAll('.page-title');
        if (pageTitles.length >= 4) {
            pageTitles[0].textContent = translation.websiteInfo;
            pageTitles[1].textContent = translation.bubbleWrap;
            pageTitles[2].textContent = translation.feedback;
            pageTitles[3].textContent = translation.settings;
        } else {
            console.error('Not enough page titles found');
        }

        const pageContents = document.querySelectorAll('.page-text');
        if (pageContents.length >= 3) {
            pageContents[0].innerHTML = translation.websiteInfoContent;
            pageContents[1].innerHTML = translation.feedbackContent;
            pageContents[2].innerHTML = translation.settingsContent;
        } else {
            console.error('Not enough page contents found');
        }
    }

    // 获取所有字体大小按钮
    const fontSizeButtons = document.querySelectorAll('.font-size-button');
    // 获取所有删除模式按钮
    const deleteModeButtons = document.querySelectorAll('.delete-mode-button');

    // 初始化选中状态
    fontSizeButtons.forEach(button => {
        if (button.getAttribute('data-size') === currentFontSize) {
            button.classList.add('selected');
        }
    });

    deleteModeButtons.forEach(button => {
        if (button.getAttribute('data-mode') === currentDeleteMode) {
            button.classList.add('selected');
        }
    });

    // 为每个字体大小按钮添加点击事件监听器
    fontSizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有字体大小按钮的选中状态
            fontSizeButtons.forEach(btn => btn.classList.remove('selected'));
            // 添加当前按钮的选中状态
            button.classList.add('selected');
            const size = button.getAttribute('data-size');
            applyFontSize(size);
            localStorage.setItem('currentFontSize', size);
        });
    });

    // 为每个删除模式按钮添加点击事件监听器
    deleteModeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有删除模式按钮的选中状态
            deleteModeButtons.forEach(btn => btn.classList.remove('selected'));
            // 添加当前按钮的选中状态
            button.classList.add('selected');
            const mode = button.getAttribute('data-mode');
            applyDeleteMode(mode);
            localStorage.setItem('currentDeleteMode', mode);
        });
    });

    // 应用字体大小
    function applyFontSize(size) {
        const inputBox = document.getElementById('input-box');
        if (inputBox) {
            inputBox.style.fontSize = size === 'small' ? '12px' : size === 'medium' ? '16px' : '20px';
        }
    }

    // 应用删除模式
    function applyDeleteMode(mode) {
        const inputBox = document.getElementById('input-box');
        if (inputBox) {
            if (mode === 'clear') {
                clearButton.addEventListener('click', () => {
                    inputBox.value = '';
                    showAlert(translations[currentLanguage].clearAlert);
                });
            } else if (mode === 'char') {
                clearButton.addEventListener('click', () => {
                    deleteCharacters(inputBox);
                });
            }
        }
    }

    // 逐个删除字符
    function deleteCharacters(inputBox) {
        let interval = setInterval(() => {
            if (inputBox.value.length > 0) {
                // 删除一个字符
                inputBox.value = inputBox.value.slice(0, -1);
            } else {
                clearInterval(interval);
                showAlert(translations[currentLanguage].clearAlert);
            }
        }, 100); // 每0.1秒删除一个字符
    }

    // 显示提示浮窗
    function showAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.className = 'alert-box';
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        alertBox.style.display = 'block';
        setTimeout(() => {
            alertBox.style.display = 'none';
            alertBox.remove();
        }, 2000);
    }

    // 确保音效在连击多个按钮时继续播放而不是中断
    bubbleSound.addEventListener('ended', () => {
        bubbleSound.currentTime = 0.5; // 重置音效时间到0.5秒
    });

    // 气泡纸音效播放逻辑
    const bubbleWrapElements = document.querySelectorAll('.bubble-wrap');
    bubbleWrapElements.forEach(element => {
        element.addEventListener('click', () => {
            if (!element.classList.contains('popped')) {
                if (!isMuted) {
                    bubbleSound.play();
                }
                element.classList.add('popped');
            }
        });
    });
});