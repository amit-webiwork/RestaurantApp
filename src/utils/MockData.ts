export const categoryData = [
    {
        "title": "juice",
        "icon": require(`../assets/icons/categories/drink.png`)
    },
    {
        "title": "dessert",
        "icon": require(`../assets/icons/categories/mousse.png`)
    },
    {
        "title": "bubble tea",
        "icon": require(`../assets/icons/categories/bubble-tea.png`)
    },
    {
        "title": "acai",
        "icon": require(`../assets/icons/categories/acai.png`)
    }
]

export const itemData = [
    {
        "title": "Brown Sugar Milk Tea",
        "firstText": "700mL.",
        "secondText": "Dairy-free ice.",
        "price": 150.00,
        "bg": require(`../assets/images/items/1.png`),
        "category": 1,
        "itemId": 1,
        "discountedPrice": 120,
        "discountedPercent": 20
    },
    {
        "title": "Brown Sugar Milk Tea",
        "firstText": "700mL.",
        "secondText": "Dairy-free ice.",
        "price": 15.00,
        "bg": require(`../assets/images/items/2.png`),
        "category": 2,
        "itemId": 2,
        "discountedPrice": 12,
        "discountedPercent": 20
    },
    {
        "title": "Brown Sugar Milk Tea",
        "firstText": "700mL.",
        "secondText": "Dairy-free ice.",
        "price": 15.00,
        "bg": require(`../assets/images/items/3.png`),
        "category": 3,
        "itemId": 3,
        "discountedPrice": 12,
        "discountedPercent": 20
    },
    {
        "title": "Brown Sugar Milk Tea",
        "firstText": "700mL.",
        "secondText": "Dairy-free ice.",
        "price": 15.00,
        "bg": require(`../assets/images/items/1.png`),
        "category": 1,
        "itemId": 4,
        "discountedPrice": 12,
        "discountedPercent": 20
    },
    {
        "title": "nutella waffle",
        "firstText": "700mL.",
        "secondText": "Dairy-free ice.",
        "price": 20.00,
        "bg": require(`../assets/images/items/4.png`),
        "category": 2,
        "itemId": 5,
        "discountedPrice": 12,
        "discountedPercent": 40
    },
    {
        "title": "rainbow bubble tea",
        "firstText": "700mL.",
        "secondText": "Dairy-free ice.",
        "price": 10.00,
        "bg": require(`../assets/images/items/5.png`),
        "category": 3,
        "itemId": 6,
        "discountedPrice": 8,
        "discountedPercent": 20
    }
]

export const categoryTabData = [
    {
        "id": 1,
        "title": "bubble tea",
    },
    {
        "id": 2,
        "title": "fruit tea",
    },
    {
        "id": 3,
        "title": "Acai drink",
    },
    {
        "id": 4,
        "title": "waffle",
    },
    {
        "id": 5,
        "title": "watermelon juice",
    }
]

export const productRatings =
{
    "avgRating": 4.3,
    "totalRating": 150,
    "totalReviews": 50,
    "ratings": [
        {
            "rating": 5,
            "description": `“I tried the mango boba tea, and it was amazing! The fruity flavor was so refreshing, and the tapioca pearls were just the right amount of chewy—definitely one of my new favorites!”`,
            "datetime": "2024-09-12 12:23:23"
        },
        {
            "rating": 5,
            "description": `“I tried the mango boba tea, and it was amazing! The fruity flavor was so refreshing, and the tapioca pearls were just the right amount of chewy—definitely one of my new favorites!”`,
            "datetime": "2024-09-12 12:23:23"
        },
        {
            "rating": 3,
            "description": `“I tried the mango boba tea, and it was amazing! The fruity flavor was so refreshing, and the tapioca pearls were just the right amount of chewy—definitely one of my new favorites!”`,
            "datetime": "2024-09-12 12:23:23"
        },
        {
            "rating": 4,
            "description": `“I tried the mango boba tea, and it was amazing! The fruity flavor was so refreshing, and the tapioca pearls were just the right amount of chewy—definitely one of my new favorites!”`,
            "datetime": "2024-09-12 12:23:23"
        }
    ]
}

export const cartItems =
{
    "items": [
        {
            "itemId": 5,
            "qty": 2,
            "title": "nutella waffle",
            "bg": require(`../assets/images/items/4.png`),
            "price": 20
        },
        {
            "itemId": 6,
            "qty": 2,
            "title": "rainbow bubble tea",
            "bg": require(`../assets/images/items/5.png`),
            "price": 10
        },
    ]
}