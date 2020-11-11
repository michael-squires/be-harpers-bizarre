exports.up = function (knex) {
  console.log("Tables have been created...");
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id").onDelete('SET NULL');
    commentsTable.integer("votes").default(0);
    commentsTable.timestamp("created_at");
    commentsTable.text("body");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
