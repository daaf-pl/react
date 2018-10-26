export function findRouteName(url) {
    
    const routes = {
        '/': 'Home',
        '/artykul': 'Artykuł',
        '/blog': 'Blog',
        '/o-nas': 'O nas',
        '/change-state': 'Zmiana stanu',
        '/kalendarz': 'Kalendarz',
        '/kod': 'Kody',
        '/kod/': 'Kod',
        '/sms': 'Smsy',
        '/sms/': 'Sms',
        '/chronione': 'Materiał Chroniony',
        '/standard-login': 'Logowanie',
        '/zarejestruj-sie': 'Rejestracja',
        '/artykul/dziesiaty-news': 'Dziesiąty News',
        '/settings/a/b': 'B',
    };
    for(let prop in routes) {
        // console.log(prop,routes[prop]);
        if(prop===url) return routes[prop];
      }
    // console.log(_.find(routes, { return !o.active; });
    // console.log(_.dropWhile(routes, function(o) { return !o.active; }););
    //   return 'Blog';
    // return routes.filter((obj) => Object.keys(obj).some(key => obj[key].includes(url)));

}