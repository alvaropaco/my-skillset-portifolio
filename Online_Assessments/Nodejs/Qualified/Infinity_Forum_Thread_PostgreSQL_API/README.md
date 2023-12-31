# Task

You've probably seen comment chains on a web page before. These chains are used in news sites and blogs as a way to facilitate discussions. Here's an example taken from a Hacker News comment thread:

Screenshot of a Hacker News nested comment chain

In text, this sort of chain could be represented as follows:
![](https://user-images.githubusercontent.com/23554810/43121964-1b9a5e8a-8f3d-11e8-8d2e-bd119a7124f1.png)

# post 1
- comment 1.1
  - comment 1.1.1
  - comment 1.1.2
- comment 1.2

# post 2
- comment 2.1
- comment 2.2

These comments can be nested arbitrarily deep, with many replies to other replies.

For this challenge, we'll omit the author and metadata typically seen in these comments to focus on the text, ids and relationships between them.

In this challenge, your task is to write an Express route GET /posts/42/comments where 42 could be any sequential post identifier. This route should return a JSON structure containing all of the comments associated with a post. The route will obtain the data by making a query to the pre-populated pg pool that connects to a Postgres database.

The relevant table schema you'll be using to guide your queries, along with the data that comprises the tests and expected output are in test/candidate.test.js. Your first task is to read and understand the database schema in this file, then determine the expected response shape by reading the test cases.

On submission, the schemas will remain the same but the data will change to ensure your code is generalized. Your solution should support any data.

> In addition to correctness and ability to generalize, your solution will be evaluated on simplicity and cleanliness.

## Resources
You may consult JS, Node, SQL and pg documentation as you develop your solution.