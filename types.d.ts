interface CartItemDetails {
    imgUrl: string;
    name: string;
    itemId: number;
    price: string;
    qty: number;
    finalPrice: number;
}

interface ItemDetails {
    imgUrl: string;
    name: string;
    id: number;
    price: string;
    discount_price: string;
    finalPrice: number;
    discountPrice: number;
    itemPrice: number;
    discountPercent: number;
}