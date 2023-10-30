const express = require("express");

const createServer = (pool, port = 3000) => {
  const app = express();

  app.get("/posts/:id/comments", async (req, res) => {
    const postId = parseInt(req.params.id, 10);

    try {
      // Query to fetch all comments associated with the given post ID.
      const result = await pool.query(`
        WITH RECURSIVE cte AS (
          SELECT id, text, parent_id, post_id
          FROM comments
          WHERE post_id = $1
          UNION ALL
          SELECT c.id, c.text, c.parent_id, c.post_id
          FROM comments c
          JOIN cte ON c.parent_id = cte.id
        )
        SELECT * FROM cte
      `, [postId]);

      if (!result.rowCount) {
        return res.sendStatus(404)
      }

      return res.json({ data: result.rows });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  const server = app.listen(port, () =>
    console.log(`[server] listening on port ${port}`)
  );

  return {
    app,
    close: () => new Promise(resolve => {
      server.close(() => {
        resolve();
        console.log("[server] closed");
      });
    }),
  };
};

module.exports = { createServer };
