export const getItemPriceComponents = (item: ItemDetails) => {
    const itemData = { ...item }
    const { discount_price, price } = itemData;

    const discountPrice = +discount_price || 0;
    const itemPrice = +price || 0;
    const discountPercent = ((itemPrice > 0 && discountPrice > 0) ? (((itemPrice - discountPrice) / itemPrice) * 100) : 0).toFixed(2);

    itemData['finalPrice'] = discountPrice > 0 ? discountPrice : itemPrice;
    itemData['discountPrice'] = discountPrice;
    itemData['itemPrice'] = itemPrice;
    itemData['discountPercent'] = +discountPercent || 0;
    itemData['totalDiscounted'] = itemPrice - discountPrice;

    return itemData;
}

export const filterDeletedAttributes = (data: any[]) => {
    return data.map(option => {
        return {
            ...option,
            variantAttributes: option.variantAttributes.filter(
                (attribute: { customizeAttribute: { isDeleted: boolean; }; }) => !attribute.customizeAttribute.isDeleted
            )
        };
    });
}

export const filterDeletedAndInactiveSizes = (data: any[]) => {
    const filteredData = data.filter(item => item.size.isDeleted === false && item.size.isActive === true)
        .map(item => ({
            ...getItemPriceComponents(item)
        }));

    return filteredData;
}