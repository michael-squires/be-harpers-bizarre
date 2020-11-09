const {
  formatTimeStamp,
  createArticleRef,
  formatComments,
} = require("../db/utils/data-manipulation.js");

describe("formatTimeStamp", () => {
  it("returns array of objects when passed array of objects", () => {
    const input = [
      {
        created_at: 1542284514171,
      },
    ];
    expect(Array.isArray(formatTimeStamp(input))).toBe(true);
    expect(typeof formatTimeStamp(input)[0]).toBe("object");
  });
  it("should not mutate objects in array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    formatTimeStamp(input);
    expect(input).toEqual([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ]);
  });
  it("give an object with create_at key with value of unixtimestamp will return object with custom timestamp", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    expect(formatTimeStamp(input)).toEqual([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "11/15/2018 12:21:54 PM",
        votes: 100,
      },
    ]);
  });
});

describe("createArticleRef ", () => {
  test("Returns an object", () => {
    let input = [];
    expect(typeof createArticleRef(input)).toEqual("object");
  });
  test("has a key-value pair for each article in the reference object", () => {
    const inputArr = [
      { article_id: 1, title: "Living in the shadow of a great man" },
      { article_id: 2, title: "Sony Vaio; or, The Laptop" },
    ];
    const expectedOutput = {
      "Living in the shadow of a great man": 1,
      "Sony Vaio; or, The Laptop": 2,
    };
    expect(createArticleRef(inputArr)).toEqual(expectedOutput);
  });
});

describe("formatComments", () => {
  it("return objects have the correct keys, with the appropriate values", () => {
    const articleRef = {
      "They're not exactly dogs, are they?": 9,
      "Living in the shadow of a great man": 1,
    };
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: "11/22/2017 12:36:03 PM",
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: "11/22/2016 12:36:03 PM",
      },
    ];
    const expectedOutput = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        created_at: "11/22/2017 12:36:03 PM",
        article_id: 9,
        author: "butter_bridge",
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        created_at: "11/22/2016 12:36:03 PM",
        article_id: 1,
        author: "butter_bridge",
      },
    ];
    expect(formatComments(input, articleRef)).toEqual(expectedOutput);
  });
});
