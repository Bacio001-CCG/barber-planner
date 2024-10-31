const dayNames = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za']
const monthNames = [
    'Jan',
    'Feb',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Aug',
    'Sept',
    'Okt',
    'Nov',
    'Dec',
]

function priceFormat(price) {
    // TODO: use local storage or any other way to get currency
    let currencyCode = 'EUR';
    let currency = '€';

    switch(currencyCode) {
        case 'EUR':
            currency = '€';
            break;
        case 'USD':
            currency = '$';
            break;
        case 'GBP':
            currency = '£';
            break;
    }

    return `${currency} ` + price.replace('.', ',');
}

function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

export {
    priceFormat,
    dayNames,
    monthNames,
    getCookie
}