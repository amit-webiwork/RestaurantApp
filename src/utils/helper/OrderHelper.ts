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

export const getOrderComponents = (data: any) => {
    const orderData = { ...data };

    const totalQty = orderData?.orderItems?.reduce((acc: number, d: { qty: number; }) => acc + (+d?.qty || 0), 0);

    const orderStatus = getOrderStatus(orderData?.orderStatus)

    orderData['totalQty'] = totalQty;
    orderData['orderStatus'] = orderStatus;

    return orderData;
}