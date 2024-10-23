import moment from 'moment';

import { Icons } from '../../components/Icons';
import { COLORS } from '../Constants';

// Get today's and yesterday's date
const today = moment().format('YYYY-MM-DD');
const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');

moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : '1 seconds',
        ss : '%d seconds',
        m:  "1 minute",
        mm: "%d minutes",
        h:  "1 hour",
        hh: "%d hours",
        d:  "1 day",
        dd: "%d days",
        w:  "1 week",
        ww: "%d weeks",
        M:  "1 month",
        MM: "%d months",
        y:  "1 year",
        yy: "%d years"
    }
});

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
        const itemDate = moment(item?.dateTime).format('YYYY-MM-DD');

        if (!acc[itemDate]) {
            acc[itemDate] = [];
        }

        // Add the timeAgo key
        let timeAgo = moment(item?.dateTime).fromNow(true);
        timeAgo = timeAgo.split(' ')[0] + timeAgo.split(' ')[1].slice(0, 1);
        const updatedItem = { ...item, timeAgo };

        acc[itemDate].push(updatedItem);

        return acc;
    }, {});

    const groupedArray = Object.entries(groupedData);

    // Sort the array by date in descending order
    groupedArray.sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());

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