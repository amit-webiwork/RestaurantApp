export const getItemPriceComponents = (item: ItemDetails) => {
    const itemData = { ...item }
    const { discount_price, price } = itemData;

    const discountPrice = +discount_price || 0;
    const itemPrice = +price || 0;
    const discountPercent = (itemPrice > 0 && discountPrice > 0) ? (((itemPrice - discountPrice) / itemPrice) * 100) : 0;

    itemData['finalPrice'] = discountPrice > 0 ? discountPrice : itemPrice;
    itemData['discountPrice'] = discountPrice;
    itemData['itemPrice'] = itemPrice;
    itemData['discountPercent'] = discountPercent;
    itemData['totalDiscounted'] = itemPrice - discountPrice;

    return itemData;
}