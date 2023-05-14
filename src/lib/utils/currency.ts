export const fmtAmount = (item: {
    amount: number,
    currency: 'GBP',
}) => {
    let multplier: number = 100
    let locale: string = 'en-GB';
    let formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: item.currency,
    });
    return formatter.format(item.amount / multplier)
}