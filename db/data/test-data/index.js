const topicData = require("./topics");
const articleData = require("./articles");
const userData = require("./users");
const commentData = require("./comments");

exports.testData = {
  topicData: topicData,
  articleData: articleData,
  userData: userData,
  commentData: commentData,
};

console.log(this.testData);
