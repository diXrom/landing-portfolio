console.log(`
Оценка на 85/75.

1.Смена изображений в секции portfolio +25
    - при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
    - кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5

2.Перевод страницы на два языка +25
    - при клике по надписи ru англоязычная страница переводится на русский язык +10
    - при клике по надписи en русскоязычная страница переводится на английский язык +10
    - надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5

3.Переключение светлой и тёмной темы +25
    - тёмная тема приложения сменяется светлой +10
    - светлая тема приложения сменяется тёмной +10
    - после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5

4. Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5
5. Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5
`);
import i18Obj from './translate.js';

function changeLanguage() {
    const langBtn = document.querySelector('.lang'),
        langBtns = document.querySelectorAll('.lang__item');

    if (localStorage.getItem('lang')) {
        switchingLanguage(localStorage.getItem('lang'))
    }

    langBtn.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.lang__item')) return;
        localStorage.setItem('lang', target.innerHTML);
        switchingLanguage(target.innerHTML)
    });
    function switchingLanguage(lang) {
        const texts = document.querySelectorAll('[data-i18]'),
            forms = document.querySelectorAll("[data-i19]");
        langBtns.forEach(item => item.classList.remove('active'))
        document.querySelector(`.lang__${lang}`).classList.add('active');
        texts.forEach(item => item.textContent = i18Obj[lang][item.dataset.i18]);
        forms.forEach(item => item.setAttribute('placeholder', i18Obj[lang][item.dataset.i19]))
    }
}
changeLanguage();
function showBurgerMenu() {
    const hamburger = document.querySelector('.hamburger'),
        lang = document.querySelector('.lang'),
        hamburgerNav = document.querySelector('.hamburger-nav'),
        iconBtn = document.querySelector('.icon-btn'),
        hamburgerList = document.querySelector('.hamburger-nav__list');
    let flag = true;
    const toogleMenu = () => {
        hamburgerNav.classList.toggle('active');
        hamburger.classList.toggle('active');
        lang.classList.toggle('hide');
        iconBtn.classList.toggle('hide');
        if (flag) {
            flag = false;
            document.documentElement.style.overflow = 'hidden';
        }
        else {
            flag = true;
            document.documentElement.style.overflow = '';
        }
    }

    hamburger.addEventListener('click', toogleMenu);
    hamburgerList.addEventListener('click', (e) => {

        if (e.target && e.target.closest('.hamburger-nav__link a')) {
            hamburgerNav.classList.remove('active');
            hamburger.classList.remove('active');
            lang.classList.remove('hide');
            iconBtn.classList.remove('hide');
        }
    });
}
showBurgerMenu();
function toggleTabs() {
    const tabsBtn = document.querySelector('.tabs'),
        btns = document.querySelectorAll('.tabs .btn'),
        tabContents = document.querySelectorAll('.tabs-content img');

    if (localStorage.getItem('season')) {
        showTabsImages('active', localStorage.getItem('season'));
    }

    function showTabsImages(selector, localItem) {
        btns.forEach(item => item.classList.remove(selector));
        document.querySelector(`[data-i18=${localItem}]`).classList.add(selector);
        tabContents.forEach((item, i) => item.src = `./assets/img/${localItem}/${++i}.jpg`)
    }

    tabsBtn.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.btn')) return;
        localStorage.setItem('season', target.dataset.i18);
        showTabsImages('active', localStorage.getItem('season'));
    });
}
toggleTabs();
function changeTheme() {
    const sections = document.querySelectorAll('section'),
        body = document.body,
        icons = document.querySelectorAll('.icon'),
        title = document.querySelectorAll('.title'),
        header = document.querySelector('header'),
        footer = document.querySelector('footer'),
        iconBtn = document.querySelector('.icon-btn'),
        iconSvg = document.querySelector('.icon-link'),
        arrItems = [...sections, ...icons, ...title, header, footer, iconBtn, body];

    iconBtn.addEventListener('click', () => {
        if (iconBtn.classList.contains('light-theme')) {
            toggleTheme('sun');
            localStorage.setItem('theme', 'sun');
            return;
        }
        toggleTheme('moon');
        localStorage.setItem('theme', 'moon');
    });

    function toggleTheme(theme) {
        iconSvg.setAttribute('xlink:href', `assets/svg/sprite.svg#${theme}`);
        arrItems.forEach(item => item.classList.toggle('light-theme'));
    }
    if (localStorage.getItem('theme') == 'moon') {
        toggleTheme(localStorage.getItem('theme'));
    }
}
changeTheme();
function playCustomPlayer() {
    const player = document.querySelector('.video__content'),
        video = document.querySelector('.video__player'),
        bigVideoBtn = player.querySelector('.video__btn'),
        btnVideo = player.querySelector('.icon-play'),
        btnVolume = player.querySelector('.icon-volume'),
        btnFullscreen = player.querySelector('.icon-fullscreen'),
        playIcon = player.querySelector('.icon-play use'),
        volumeIcon = player.querySelector('.icon-volume use'),
        rangeProgress = player.querySelector('.progress'),
        rangeVolume = player.querySelector('.volume'),
        preview = player.querySelector('.video__preview');
    let volume;

    btnFullscreen.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch((err) => console.error(err))
        } else {
            player.requestFullscreen();
        }
    });

    function hidePreview() {
        preview.classList.add('hide');
        setTimeout(() => { preview.style.display = 'none'; }, 500);
        toggleBtn();
    }
    function toggleBtn() {
        
        if (video.paused) {
            video.play();
            changeIcon(playIcon, 'pause')
            bigVideoBtn.classList.add('hide');
        }
        else {
            video.pause();
            changeIcon(playIcon, 'play')
            bigVideoBtn.classList.remove('hide');
        }
    }
    function progressUpdate() {
        const value = (video.currentTime / video.duration) * 100;
        rangeProgress.value = Math.round(value);
        if (video.currentTime >= video.duration) {
            changeIcon(playIcon, 'play')
            bigVideoBtn.classList.toggle('hide');
        }
        updateBackground(rangeProgress, Math.round(value));
    }

    function volumeUpdate(e) {
        if (e.target.closest('.icon-volume')) {
            if (rangeVolume.value == 0) rangeVolume.value = volume;
            else {
                volume = rangeVolume.value;
                rangeVolume.value = 0;
            }
        }
        video.volume = rangeVolume.value / 100 || 0;
        if (video.volume === 0) changeIcon(volumeIcon, 'mute');
        else changeIcon(volumeIcon, 'volume');
        updateBackground(rangeVolume, rangeVolume.value);
    }
    function progressDrag(e) {
        video.currentTime = e.target.value * (video.duration / 100);
        updateBackground(rangeVolume, rangeVolume.value);
        
    }
    const changeIcon = (selec, name) => selec.setAttribute('xlink:href', `assets/svg/sprite.svg#${name}`);
    const updateBackground = (target, value) => target.style = `background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${value}%, rgb(200, 200, 200) ${value}%, rgb(200, 200, 200) 100%) repeat scroll 0% 0%`;

    btnVideo.addEventListener('click', toggleBtn);
    btnVolume.addEventListener('click', volumeUpdate);
    bigVideoBtn.addEventListener('click', hidePreview);
    video.addEventListener('click', toggleBtn);
    preview.addEventListener('click', hidePreview);
    rangeVolume.addEventListener('input', volumeUpdate);
    rangeProgress.addEventListener('input', progressDrag);
    video.addEventListener('timeupdate', progressUpdate);
}
playCustomPlayer();

