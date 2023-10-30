const chai = require("chai");
const chaiHttp = require("chai-http");
const {Pool} = require("pg");
const {createServer} = require("./server");
const {expect} = chai;
chai.use(chaiHttp);
chai.config.truncateThreshold = 0;

describe("server", function () {
  this.timeout(2000);

  const dbUrl = "postgresql://postgres@localhost";
  let pool;
  let server;
  let app;

  beforeEach(async () => {
    pool = new Pool({connectionString: dbUrl});
    const client = await pool.connect();
    await client.query("DROP TABLE IF EXISTS comments");
    await client.query("DROP TABLE IF EXISTS posts");
    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        text VARCHAR NOT NULL
      )
    `);
    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        text VARCHAR NOT NULL,
        parent_id INT,
        post_id INT,
        CONSTRAINT fk_post
          FOREIGN KEY(post_id)
          REFERENCES posts(id)
      )
    `);
    await client.query(`
      INSERT INTO posts (text)
      VALUES ('post 1')
    `);
    await client.query(`
      INSERT INTO posts (text)
      VALUES ('post 2')
    `);
    await client.query(`
      INSERT INTO comments (text, post_id)
      VALUES ('comment 1.1', 1)
    `);
    await client.query(`
      INSERT INTO comments (text, post_id)
      VALUES ('comment 1.2', 1)
    `);
    await client.query(`
      INSERT INTO comments (text, parent_id)
      VALUES ('comment 1.1.1', 1)
    `);
    await client.query(`
      INSERT INTO comments (text, parent_id)
      VALUES ('comment 1.1.2', 1)
    `);
    await client.query(`
      INSERT INTO comments (text, post_id)
      VALUES ('comment 2.1', 2)
    `);
    await client.query(`
      INSERT INTO comments (text, post_id)
      VALUES ('comment 2.2', 2)
    `);
    client.release();
    server = createServer(pool);
    app = server.app;
  });
  afterEach(async () => {
    await server.close();
    await pool.end();
  });

  it("should get comments for post 1", async () => {
    const response = await chai.request(app)
      .get("/posts/1/comments");
    expect(response.status).to.equal(200);
    expect(response).to.be.json;
    expect(response.body).to.be.instanceOf(Object);
    expect(response.body.data).to.be.instanceOf(Object);
    const expected = [
      {id: 1, text: "comment 1.1", parent_id: null, post_id: 1},
      {id: 2, text: "comment 1.2", parent_id: null, post_id: 1},
      {id: 3, text: "comment 1.1.1", parent_id: 1, post_id: null},
      {id: 4, text: "comment 1.1.2", parent_id: 1, post_id: null},
    ];
    expect(response.body.data).to.deep.eq(expected);
  });

  it("should get comments for post 2", async () => {
    const response = await chai.request(app)
      .get("/posts/2/comments");
    expect(response.status).to.equal(200);
    expect(response).to.be.json;
    expect(response.body).to.be.instanceOf(Object);
    expect(response.body.data).to.be.instanceOf(Object);
    const expected = [
      {id: 5, text: "comment 2.1", parent_id: null, post_id: 2},
      {id: 6, text: "comment 2.2", parent_id: null, post_id: 2},
    ];
    expect(response.body.data).to.deep.eq(expected);
  });

  it("should return a 404 for post 3", async () => {
    const response = await chai.request(app)
      .get("/posts/3/comments");
    expect(response.status).to.equal(404);
  });
});
