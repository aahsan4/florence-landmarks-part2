export const getLandmarks = async (req, res) => {
  try {
    const { search } = req.query;
    let results;

    if (search) {
      results = await pool.query(
        `SELECT * FROM landmarks
         WHERE name ILIKE $1 OR architect ILIKE $1
         ORDER BY id ASC`,
        [`%${search}%`]
      );
    } else {
      results = await pool.query('SELECT * FROM landmarks ORDER BY id ASC');
    }

    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};