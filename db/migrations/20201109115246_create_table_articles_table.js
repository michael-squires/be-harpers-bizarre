exports.up = function (knex) {
  return knex.schema.createTable("articles", (articlesTable) => {
    articlesTable.increments("article_id").primary();
    articlesTable.text("title");
    articlesTable.text("body");
    articlesTable.integer("votes").default(0);
    articlesTable.text("topic").references("topics");
    articlesTable.text("author").references("users.username");
    articlesTable.timestamp("created_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
