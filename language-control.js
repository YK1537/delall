// language-control.js

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

let currentLanguage = localStorage.getItem('currentLanguage') || 'zh';

// 更新语言设置
function updateLanguage(lang) {
    const translation = translations[lang];
    document.title = translation.siteTitle;
    const siteTitleElement = document.querySelector('.site-title span');
    if (siteTitleElement) {
        siteTitleElement.textContent = translation.siteTitle;
    }

    const muteButton = document.getElementById('mute-button');
    if (muteButton) {
        muteButton.querySelector('img').alt = isMuted ? translation.mute : translation.unmute;
    }

    const collapseButton = document.getElementById('collapse-button');
    if (collapseButton) {
        collapseButton.querySelector('img').alt = translation.collapse;
    }

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.querySelector('img').alt = translation.backToTop;
    }

    const sloganElement = document.querySelector('.slogan');
    if (sloganElement) {
        sloganElement.textContent = translation.slogan;
    }

    const inputBox = document.getElementById('input-box');
    if (inputBox) {
        inputBox.placeholder = translation.inputPlaceholder;
    }

    const clearButton = document.getElementById('clear-button');
    if (clearButton) {
        clearButton.querySelector('img').alt = translation.clear;
    }

    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        copyrightElement.textContent = translation.copyright;
    }

    const 友情链接Element = document.querySelector('.友情链接');
    if (友情链接Element) {
        友情链接Element.innerHTML = translation.友情链接 + '<a href="https://www.deepseek.com" target="_blank">deepseek.com</a>';
    }

    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    if (sidebarLinks.length >= 4) {
        sidebarLinks[0].textContent = translation.websiteInfo;
        sidebarLinks[1].textContent = translation.bubbleWrap;
        sidebarLinks[2].textContent = translation.feedback;
        sidebarLinks[3].textContent = translation.settings;
    }

    const pageTitles = document.querySelectorAll('.page-title');
    if (pageTitles.length >= 4) {
        pageTitles[0].textContent = translation.websiteInfo;
        pageTitles[1].textContent = translation.bubbleWrap;
        pageTitles[2].textContent = translation.feedback;
        pageTitles[3].textContent = translation.settings;
    }

    const pageContents = document.querySelectorAll('.page-text');
    if (pageContents.length >= 3) {
        pageContents[0].innerHTML = translation.websiteInfoContent;
        pageContents[1].innerHTML = translation.feedbackContent;
        pageContents[2].innerHTML = translation.settingsContent;
    }

    // 更新气泡纸标题
    const bubbleWrapTitle = document.querySelector('.page-title');
    if (bubbleWrapTitle) {
        bubbleWrapTitle.textContent = translation.bubbleWrap;
    }
}

// 初始化语言设置
function initLanguage() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        updateLanguage(currentLanguage);

        languageSelect.addEventListener('change', () => {
            currentLanguage = languageSelect.value;
            localStorage.setItem('currentLanguage', currentLanguage);
            updateLanguage(currentLanguage);
            document.dispatchEvent(new Event('languageChange'));
        });
    }
}

// 在 DOMContentLoaded 事件中初始化语言设置
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
});