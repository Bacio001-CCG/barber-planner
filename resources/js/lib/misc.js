import { InertiaReact } from '@/'

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

    const { auth } = InertiaReact.usePage().props;
    let currencyCode = auth.user.company.setting.currency;
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

    return `${currency} ` + price.toString().replace('.', ',');
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