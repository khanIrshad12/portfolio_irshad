/** Runs before paint to avoid light/dark flash. Defaults to light. */
export const themeInitScript = `(function(){try{var k='portfolio-color-mode';var s=localStorage.getItem(k);var m=(s==='light'||s==='dark')?s:'light';var r=document.documentElement;r.classList.toggle('dark',m==='dark');r.dataset.theme=m;r.style.colorScheme=m;}catch(e){}})();`;
