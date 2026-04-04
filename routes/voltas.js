const express = require('express');
const router = express.Router(); 
const db = require('../db');


// ROTA PARA CONTAR VOLTAS POR CORREDOR
router.get('/contagem/:id_corredor', (req, res) => {
  const { id_corredor } = req.params;

  if (!id_corredor) return res.status(400).json({ erro: 'id_corredor é obrigatório' });

  const sql = `
    SELECT 
      COUNT(*) AS total_voltas,
      SUM(CASE WHEN status = 'finalizada' THEN 1 ELSE 0 END) AS finalizadas,
      SUM(CASE WHEN status = 'em_andamento' THEN 1 ELSE 0 END) AS em_andamento,
      SUM(CASE WHEN status = 'cancelada' THEN 1 ELSE 0 END) AS canceladas
    FROM voltas
    WHERE id_corredor = ?
  `;

  db.query(sql, [id_corredor], (err, rows) => {
    if (err) {
      console.error('ERRO AO CONTAR VOLTAS:', err);
      return res.status(500).json({ erro: 'Erro ao contar voltas', detalhe: err });
    }

    res.json({ sucesso: true, id_corredor, ...rows[0] });
  });
});

// ROTA PARA CONTAR VOLTAS GERAIS
router.get('/contagem', (req, res) => {
  db.query(`
    SELECT 
      COUNT(*) AS total_voltas,
      SUM(CASE WHEN status = 'finalizada' THEN 1 ELSE 0 END) AS finalizadas,
      SUM(CASE WHEN status = 'em_andamento' THEN 1 ELSE 0 END) AS em_andamento,
      SUM(CASE WHEN status = 'cancelada' THEN 1 ELSE 0 END) AS canceladas
    FROM voltas
  `, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao contar voltas' });
    }

    res.json(results[0]);
  });
});

module.exports = router;