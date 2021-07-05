export function getCookieFromBrowser(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    
    if (match) return match[2];
}