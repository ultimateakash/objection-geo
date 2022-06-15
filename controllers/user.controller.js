const { raw } = require('objection');
const User = require('../models/user.model');

exports.nearByUsersExample1 = async (req, res) => {
    const latitude = 28.626137;
    const longitude = 79.821602;
    const distance = 1;

    const haversine = `(
        6371 * acos(
            cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude) - radians(${longitude}))
            + sin(radians(${latitude})) * sin(radians(latitude))
        )
    )`;

    const users = await User.query()
        .select(
            'id',
            raw(`${haversine} as distance`)
        )
        .where('status', 1)
        .orderBy('distance', 'ASC')
        .having('distance', '<=', distance)
        .limit(5); 
    return res.json(users)
}

exports.nearByUsersExample2 = async (req, res) => {
    const latitude = 28.626137;
    const longitude = 79.821602;
    const distance = 1; 

    const users = await User.query()
        .modify('filterDistance', latitude, longitude, distance)
        .select('id')
        .where('status', 1)
        .orderBy('distance', 'ASC') 
        .limit(5); 
    return res.json(users)
}