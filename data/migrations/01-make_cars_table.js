exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable("cars", (table) => {
    table.increments();
    table.text("vin").unique().notNullable();
    table.text("make").notNullable();
    table.text("model").notNullable();
    table.decimal("mileage").notNullable();
    table.text("title");
    table.text("transmission");

  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars");
};
