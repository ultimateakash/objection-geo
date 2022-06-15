const { Model } = require('objection');
const { raw } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static modifiers = { 
        filterDistance(query, latitude, longitude, distance, unit = 'km') {
            const constant = unit == 'km' ? 6371 : 3959;
            const haversine = `(
                ${constant} * acos(
                    cos(radians(${latitude}))
                    * cos(radians(latitude))
                    * cos(radians(longitude) - radians(${longitude}))
                    + sin(radians(${latitude})) * sin(radians(latitude))
                )
            )`;

            query.select(raw(`${haversine} as distance`))
                .having('distance', '<=', distance);
        }
    } 
}

module.exports = User;