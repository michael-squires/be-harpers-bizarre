const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

const formatTimeStamp = require('../utils/data-manipulation')

exports.seed = function (knex) {
  // add seeding functionality here
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex.insert(topicData).into('topics').returning('*')
    })
    .then(topicRows => {
      console.log(`inserted ${topicRows.length} topics`)
      return knex.insert(userData).into('users').returning('*')
        .then(usersRows => {
          console.log(`inserted ${usersRows.length} users`)
          const formattedArticles = formatTimeStamp(articleData)
        })
    })
}
