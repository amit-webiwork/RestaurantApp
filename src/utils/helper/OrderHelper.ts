import { getItemList } from "../ApiCall";
import { getItemPriceComponents } from "./ItemHelper";

interface OrderItem {
    itemId: number;
    qty: number;
}

interface OrderData {
    orderItems: OrderItem[];
}

export const getOrderStatus = (orderStatus: string) => {
    let status;

    switch (orderStatus) {
        case "Pending":
            status = "order received";
            break;
        case "Preparing":
            status = "preparing your order";
            break;
        case "OrderReady":
            status = "ready for pickup";
            break;
        case "OrderPicked":
            status = "Order picked up";
            break;
        case "Rejected":
            status = "Order has been rejected";
            break;
        default:
            status = orderStatus
    }
    return status;
}

export const getOrderTrackSteps = () => {
    const steps = [
        { key: "Pending", status: 'order received', icon: require(`../../assets/icons/order-placed.png`), time: "", subText: "we have received your order" },
        { key: "Preparing", status: 'preparing your order', icon: require(`../../assets/icons/order-process.png`), time: "", subText: "awaiting confirmation..." },
        { key: "OrderReady", status: 'ready for pickup', icon: require(`../../assets/icons/order-shipped.png`), time: "", subText: "" },
        { key: "OrderPicked", status: 'Order picked up', icon: require(`../../assets/icons/order-delivered.png`), time: "", subText: "" }
    ];

    return steps;
}

export const getOrderComponents = (data: any) => {
    const orderData = { ...data };

    const totalQty = orderData?.orderItems?.reduce((acc: number, d: { qty: number; }) => acc + (+d?.qty || 0), 0);

    const orderStatus = getOrderStatus(orderData?.orderStatus)

    orderData['totalQty'] = totalQty;
    orderData['orderStatus'] = orderStatus;
    orderData['estimatedTimeCustom'] = formatEstimatedTime(orderData?.estimatedTime);

    return orderData;
}

export const getReorderItems = async (orderData: OrderData): Promise<any[]> => {

    try {
        const itemIds = (orderData?.orderItems || []).map((d: { itemId: number; }) => d.itemId);

        const params = { itemIds };

        const limit = itemIds.length;
        const offset = 0;

        const response = await getItemList(params, limit, offset);

        const cartItems = (response?.data || []).map((d: ItemDetails) => {
            const { name, imgUrl, price, finalPrice, discountPrice, itemPrice, discountPercent } = getItemPriceComponents(d);

            return {
                name,
                imgUrl,
                price,
                finalPrice,
                discountPrice,
                itemPrice,
                discountPercent,
                itemId: d.id,
                qty: (orderData?.orderItems?.find((item: { itemId: number; }) => item.itemId === d.id)?.qty) || 1
            };
        })

        return cartItems;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const formatEstimatedTime = (estimatedTime: string): string => {
    const [hours, minutes] = estimatedTime ? estimatedTime.split(":").map(Number) : [0, 0];

    if (hours && minutes) {
        return `Est. time ${hours} hr${hours > 1 ? 's' : ''} and ${minutes} min${minutes > 1 ? 's' : ''}`;
    } else if (hours) {
        return `Est. time ${hours} hr${hours > 1 ? 's' : ''}`;
    } else if (minutes) {
        return `Est. time ${minutes} min${minutes > 1 ? 's' : ''}`;
    } else {
        return "";
    }
};