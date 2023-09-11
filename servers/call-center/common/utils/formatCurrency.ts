export const formatAsVietnameseCurrency = (price: number) => {
    const parts = price.toFixed(0).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${integerPart}đ`;
}