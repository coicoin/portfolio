import ru from './ru.json' with { type: 'json' };
import en from './en.json' with { type: 'json' };

const DETAILS_SUMMARY_OPEN = "footer__details__summary_open";
const DETAILS_SUMMARY_CLOSE = "footer__details__summary_close";
const allLangs = ["ru", "en"];
let currentLang = localStorage.getItem("language") || checkBrowserLang() || "ru";

const changeLangBtn = document.getElementById("change-lang");
changeLangBtn.value = currentLang;
changeLangBtn.addEventListener("change", defLanguageAndTranslate);

const detailsSummary = document.getElementById('footer__details__summary');
detailsSummary.addEventListener("click", changeDetailsSummaryDataLang);

changeLanguage();

function defLanguageAndTranslate() {
  currentLang = changeLangBtn.value;
  localStorage.setItem("language", currentLang);
  changeLanguage();
}

function changeLanguage() {
  const langPackage = currentLang === "en" ? en : ru;
  for (const key in langPackage) {
    const elems = document.querySelectorAll(`[data-lang=${key}]`);
    elems.forEach((elem, index) => {
      const value = langPackage[key];
      if (Array.isArray(value)) {
        elem.innerHTML = value[index];
      } else {
        elem.textContent = value;
      }
    });
  }
}

function checkBrowserLang() {
  const navLang = navigator.language.slice(0, 2).toLowerCase();
  if (allLangs.includes(navLang)) {
    return navLang;
  }
}

function changeUrlLanguage() {
  let lang = changeLangBtn.value;
  const currentPathName = window.location.pathname;
  location.href = currentPathName + "#" + lang;
  location.reload();
}

function changeDetailsSummaryDataLang() {
  let dataLang = detailsSummary.getAttribute("data-lang");
  const langPackage = currentLang === "en" ? en : ru;
  if (dataLang === DETAILS_SUMMARY_OPEN) {
    detailsSummary.setAttribute("data-lang", DETAILS_SUMMARY_CLOSE);
    detailsSummary.textContent = langPackage.footer__details__summary_close;
  } else {
    detailsSummary.setAttribute("data-lang", DETAILS_SUMMARY_OPEN);
    detailsSummary.textContent = langPackage.footer__details__summary_open;

  }
}