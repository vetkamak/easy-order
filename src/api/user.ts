export function fetchUserData() {
    return Promise.resolve({
        json: () => Promise.resolve(userData),
    });
}

const userData = {
    "name": "Алиса",
    "phone": "+7 999 123 45 67",
    "cards": [
        {
            "id": "1",
            "number": "4567567834561234",
            "isSelected": true
        },
        {
            "id": "2",
            "number": "4567567809877654",
            "isSelected": false
        }
    ],
    "addresses": [
        {
            "id": "1",
            "city": "Томск",
            "address": "Пирогова, 1, 911",
            "isSelected": true
        },
        {
            "id": "2",
            "city": "Новосибирск",
            "address": "Большевистская, 37, 307",
            "isSelected": false
        },
        {
            "id": "3",
            "city": "Москва",
            "address": "Первомайская, 117",
            "isSelected": false
        },
        {
            "id": "4",
            "city": "Барнаул",
            "address": "Чкалова, 66",
            "isSelected": false
        },
        {
            "id": "5",
            "city": "Томск",
            "address": "Студенческая, 7, 42",
            "isSelected": false
        }
    ]
};
