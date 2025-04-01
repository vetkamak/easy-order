function* generateItems(from: number, to: number) {
    for (let i = from; i <= to; i++) {
        yield {
            "id": `${i}`,
            "image": "https://img.freepik.com/premium-vector/set-fresh-healthy-vegetables_24877-66232.jpg",
            "name": `Товар ${i}`,
            "description": `${(i % 5) * 50 + 120} г`,
            "price": (i % 11) * 10 + 49,
            "stock": i % 7 + 1
        };
    }
}

export function fetchProducts({ refresh, from, to }: { refresh?: boolean, from?: number, to?: number }) {
    let items;

    if (refresh && from && to) {
        items = generateItems(from, to);
    }

    return Promise.resolve({
        json: () => Promise.resolve({
            products: refresh
                ? new Array(20).fill(null).map(() => items.next().value)
                : initialProducts,
        }),
    });
}

let initialProducts = [
    {
        "id": "1",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/993/424/168/161/610/100070294766b0.jpeg",
        "name": "Сырники творожные",
        "description": "340 г",
        "price": 229,
        "stock": 10
    },
    {
        "id": "2",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-91/484/382/141/917/48/100032766839b0.jpg",
        "name": "Запеканка творожная",
        "description": "100 г",
        "price": 127,
        "stock": 4
    },
    {
        "id": "3",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-14/632/251/452/311/47/100028813383b0.jpg",
        "name": "Творог Простоквашино 2%",
        "description": "200 г",
        "price": 72,
        "stock": 2
    },
    {
        "id": "4",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-12/314/838/926/281/853/100030010001b0.jpg",
        "name": "Сыр Брест-Литовск российский 50%",
        "description": "200 г",
        "price": 110,
        "stock": 6
    },
    {
        "id": "5",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/213/424/174/523/114/7/100026605704b0.jpg",
        "name": "Молоко Простоквашино 2,5%",
        "description": "930 мл",
        "price": 76,
        "stock": 5
    },
    {
        "id": "6",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/766/402/499/231/146/100047406173b0.jpg",
        "name": "Молоко Простоквашино 3,2%",
        "description": "1,4 л",
        "price": 129,
        "stock": 11
    },
    {
        "id": "7",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/128/253/083/941/917/53/100028188324b0.jpg",
        "name": "Масло сливочное Село Зелёное 82,5%",
        "description": "175 г",
        "price": 170,
        "stock": 5
    },
    {
        "id": "8",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/176/184/933/391/717/49/100029322697b0.jpg",
        "name": "Манго жёлтое",
        "description": "1 шт",
        "price": 200,
        "stock": 6
    },
    {
        "id": "9",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/178/943/579/991/717/49/100029323557b0.jpg",
        "name": "Питахайя, Artfruit Россия",
        "description": "300 г",
        "price": 160,
        "stock": 4
    },
    {
        "id": "10",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/198/027/163/122/920/29/100047497728b0.jpg",
        "name": "Лонган Artfruit",
        "description": "150 г",
        "price": 160,
        "stock": 5
    },
    {
        "id": "11",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/208/802/470/233/018/17/100028195789b0.png",
        "name": "Креветки Agama | королевские, очищенные",
        "description": "300 г",
        "price": 683,
        "stock": 9
    },
    {
        "id": "12",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-14/313/595/604/241/043/100029754714b0.png",
        "name": "Печенье ProteinRex Ягодный мильфей протеино-злаковое",
        "description": "55 г",
        "price": 119,
        "stock": 11
    },
    {
        "id": "13",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-58/152/994/091/214/34/100027306377b0.jpg",
        "name": "Яйцо куриное Село Зеленое Деревенское С1",
        "description": "10 шт",
        "price": 90,
        "stock": 8
    },
    {
        "id": "14",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/281/495/579/419/174/8/100028174446b0.jpg",
        "name": "Яйцо куриное Село Зеленое С0",
        "description": "10 шт",
        "price": 130,
        "stock": 5
    },
    {
        "id": "15",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-17/557/720/854/191/755/100030427714b0.jpg",
        "name": "Яйцо куриное Волжанин С1",
        "description": "20 шт",
        "price": 194,
        "stock": 3
    },
    {
        "id": "16",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-12/945/679/417/291/248/100028990514b0.jpg",
        "name": "Салат Айсберг",
        "description": "1 шт",
        "price": 118,
        "stock": 6
    },
    {
        "id": "17",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/200/316/390/811/271/49/100045557492b0.jpg",
        "name": "Бананы Global Village",
        "description": "500 г",
        "price": 166,
        "stock": 7
    },
    {
        "id": "18",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-83/693/704/282/018/29/100029006121b0.jpg",
        "name": "Голубика, Марокко",
        "description": "125 г",
        "price": 230,
        "stock": 4
    },
    {
        "id": "19",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/179/047/271/891/718/39/100029323691b0.jpg",
        "name": "Авокадо Хаас",
        "description": "700 г",
        "price": 389,
        "stock": 2
    },
    {
        "id": "20",
        "image": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-13/661/873/091/118/191/4/100029549779b0.jpg",
        "name": "Томаты Фламенко сливововидные",
        "description": "450 г",
        "price": 229,
        "stock": 3
    }
];
