/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Arrays", (table) => {
    table.increments("id").primary();
    table.string("order");
    table.string("name").unique();
    table.string("description");
    table.string("dimension");
    table.text("image");
    table.text("image2");
    table.text("image3");
    table.text("image4");
    table.string("type");
    table.string("type2");
    table.string("serial");
    table.string("year");
    table.string("price", 10, 2);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Arrays");
};
