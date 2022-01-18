// STRETCH
exports.seed = function (knex) {
    return knex("cars")
    .truncate()
    .then(function () {
        return knex("cars").insert([
            {
                vin:"4T1BDEJODJUX09353",
                make:"Nissan",
                model:"Altima",
                mileage:70000,
            }
        ])
    })
}