const express = require('express');
const router = express.Router();
const db = require('../db');

// CONTAGEM DE VOLTAS POR CORREDOR
router.get('/contagem/:id_corredor', async (req, res) => {
    const { id_corredor } = req.params;
    if (!id_corredor || isNaN(id_corredor)) {
        return res.status(400).json({ erro: 'id_corredor deve ser numérico' });
    }

    try {
        const [rows] = await db.query(
            'SELECT COUNT(*) AS total_voltas FROM voltas WHERE corredores_id = ?',
            [id_corredor]
        );
        res.json({ id_corredor, total_voltas: rows[0].total_voltas });
    } catch (error) {
        console.error('Erro ao contar voltas: ', error.message);
        res.status(500).json({ erro: error.message });
    }
});

// CONTAGEM GERAL DE VOLTAS
router.get('/contagem', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT COUNT(*) AS total_voltas FROM voltas');
        res.json({ total_voltas: rows[0].total_voltas });
    } catch (error) {
        console.error('Erro ao contar voltas: ', error.message);
        res.status(500).json({ erro: error.message });
    }
});

// MELHOR VOLTA GERAL
router.get('/melhor-volta-geral', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT v.tempo, v.data, c.id AS id_corredor, c.nome
            FROM voltas v
            JOIN corredores c ON v.corredores_id = c.id
            ORDER BY v.tempo ASC
            LIMIT 1
        `);
        if (rows.length === 0) {
            return res.status(404).json({ erro: 'Nenhuma volta registrada' });
        }
        res.json({
            melhor_volta: rows[0].tempo,
            data: rows[0].data,
            corredor: { id: rows[0].id_corredor, nome: rows[0].nome }
        });
    } catch (error) {
        console.error('Erro ao buscar melhor volta: ', error.message);
        res.status(500).json({ erro: error.message });
    }
});

// MELHOR VOLTA POR CORREDOR
router.get('  ', async (req, res) => {
    const { id_corredor } = req.params;
    if (!id_corredor || isNaN(id_corredor)) {
        return res.status(400).json({ erro: 'id_corredor deve ser numérico' });
    }

    try {
        const [rows] = await db.query(
            'SELECT tempo, data FROM voltas WHERE corredores_id = ? ORDER BY tempo ASC LIMIT 1',
            [id_corredor]
        );
        if (rows.length === 0) {
            return res.status(404).json({ erro: 'Nenhuma volta encontrada' });
        }
        res.json({ id_corredor, melhor_volta: rows[0].tempo, data: rows[0].data });
    } catch (error) {
        console.error('Erro ao buscar melhor volta: ', error.message);
        res.status(500).json({ erro: error.message });
    }
});

// TOP 5 MELHORES VOLTAS GERAIS
router.get('/top5-melhores-voltas', async (req, res) => {
  try {
      const [rows] = await db.query(`
          SELECT 
              c.id AS id_corredor,
              c.nome,
              v.tempo,
              v.data
          FROM voltas v
          JOIN corredores c ON v.corredores_id = c.id
          ORDER BY v.tempo ASC
          LIMIT 5
      `);

      if (rows.length === 0) {
          return res.status(404).json({ erro: 'Nenhuma volta registrada' });
      }

     
      const ranking = rows.map((row, index) => ({
          rank: index + 1,
          id_corredor: row.id_corredor,
          nome: row.nome,
          tempo: row.tempo,
          data: row.data
      }));

      res.json({ ranking });
  } catch (error) {
      console.error('Erro ao buscar top 5 voltas: ', error.message);
      res.status(500).json({ erro: 'Erro ao buscar top 5 voltas', detalhe: error.message });
  }
});

// RANKING DE TODOS OS CORREDORES PELA MELHOR VOLTA
router.get('/ranking', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        c.id AS id_corredor,
        c.nome,
        v.tempo AS melhor_volta,
        v.data AS data_volta
      FROM corredores c
      JOIN voltas v ON v.id = (
        SELECT id 
        FROM voltas 
        WHERE corredores_id = c.id 
        ORDER BY tempo ASC 
        LIMIT 1
      )
      ORDER BY v.tempo ASC
    `);

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Nenhuma volta registrada' });
    }

    const ranking = rows.map((row, index) => ({
      rank: index + 1,
      id_corredor: row.id_corredor,
      nome: row.nome,
      melhor_volta: row.melhor_volta,
      data_volta: row.data_volta
    }));

    res.json({ ranking });

  } catch (error) {
    console.error('Erro ao gerar ranking: ', error.message);
    res.status(500).json({ erro: 'Erro ao gerar ranking', detalhe: error.message });
  }
});

module.exports = router;  