import moment from 'moment';

import Icon, { Icons } from '../../components/Icons';
import { COLORS } from '../Constants';

// Get today's and yesterday's date
const today = moment().format('YYYY-MM-DD');
const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');

const iconArr: any = {
    "discount": { iconType: Icons.MaterialCommunityIcons, icon: "sale", color: COLORS.HOME_ICONS },
    "order_success": { iconType: Icons.FontAwesome5, icon: "check-circle", color: COLORS.SUCCESS },
    "order_failed": { iconType: Icons.FontAwesome5, icon: "times-circle", color: COLORS.FAILED },
    "message": { iconType: Icons.Feather, icon: "mail", color: "#101010" },
    "account": { iconType: Icons.FontAwesome5, icon: "user", color: "#101010" },
    "payment": { iconType: Icons.FontAwesome5, icon: "credit-card", color: "#FE8C00" }
}

// Function to group data
export const groupNotificationData = (data: any[]) => {
    const groupedData = data.reduce((acc, item) => {
        const itemDate = moment(item.date).format('YYYY-MM-DD');

        let groupKey;
        // if (itemDate === today) {
        //     groupKey = 'Today';
        // } else if (itemDate === yesterday) {
        //     groupKey = 'Yesterday';
        // } else {
        //     groupKey = `${moment(itemDate).format('DD MMM YYYY')}`; // Use the specific date
        // }

        // groupKey = `${moment(itemDate).format('DD MMM YYYY')}`; // Use the specific date

        if (!acc[itemDate]) {
            acc[itemDate] = [];
        }
        acc[itemDate].push(item);

        return acc;
    }, {});

    const groupedArray = Object.entries(groupedData);

    // Sort the array by date in descending order
    groupedArray.sort((a, b) => new Date(b[0]) - new Date(a[0]));

    return groupedArray;
};

export const getNotificationTitle = (date: string) => {
    if (date === today) {
        return 'Today';
    } else if (date === yesterday) {
        return 'Yesterday';
    } else {
        return moment(date).format('DD MMM YYYY');;
    }
}

export const getNotificationIcon = (type: string) => {
    if (iconArr[type]) {
        return iconArr[type]
    } else {
        return iconArr['message']
    }
}