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
    const langBtns = document.querySelector('.lang');

    if (localStorage.getItem('lang')) {
        switchingLanguage(localStorage.getItem('lang'))
    }

    langBtns.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.lang__item')) return;
        localStorage.setItem('lang', target.innerHTML.toLowerCase());
        switchingLanguage(target.innerHTML.toLowerCase())
    });
    function switchingLanguage(lang) {
        const texts = document.querySelectorAll('[data-i18]'),
            forms = document.querySelectorAll("[data-i19]");
        texts.forEach(item => item.textContent = i18Obj[lang][item.dataset.i18]);
        forms.forEach(item => item.setAttribute('placeholder',i18Obj[lang][item.dataset.i19]))
    }
}
changeLanguage();
function showBurgerMenu() {
    const hamburger = document.querySelector('.hamburger'),
        lang = document.querySelector('.lang'),
        hamburgerNav = document.querySelector('.hamburger-nav'),
        hamburgerList = document.querySelector('.hamburger-nav__list');

    const toogleMenu = () => {
        hamburgerNav.classList.toggle('active');
        hamburger.classList.toggle('active');
        lang.classList.toggle('hide');
    }

    hamburger.addEventListener('click', toogleMenu);
    hamburgerList.addEventListener('click', (e) => {

        if (e.target && e.target.closest('.hamburger-nav__link a')) {
            hamburgerNav.classList.remove('active');
            hamburger.classList.remove('active');
            lang.classList.remove('hide');
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

