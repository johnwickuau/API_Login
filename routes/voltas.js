const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔧 função pra formatar tempo
function formatarTempo(ms) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const msRest = ms % 1000;

  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${msRest.toString().padStart(3, '0')}`;
}

// ==================== INICIAR VOLTA ====================
router.post('/iniciar', async (req, res) => {
  const { id_corredor } = req.body;

  if (!id_corredor) {
    return res.status(400).json({ erro: 'id_corredor obrigatório' });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO voltas (id_corredor, data_hora_inicio, status)
       VALUES (?, NOW(3), 'em_andamento')`,
      [id_corredor]
    );

    res.json({ sucesso: true, id_volta: result.insertId });
  } catch {
    res.status(500).json({ erro: 'Erro ao iniciar volta' });
  }
});

// ==================== TEMPO ATUAL ====================
router.get('/tempo/:id_corredor', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id_volta,
              TIMESTAMPDIFF(MICROSECOND, data_hora_inicio, NOW(3)) DIV 1000 AS tempo_ms
       FROM voltas
       WHERE id_corredor = ? AND status = 'em_andamento'
       ORDER BY id_volta DESC LIMIT 1`,
      [req.params.id_corredor]
    );

    if (!rows.length) {
      return res.json({ em_andamento: false });
    }

    const tempo = rows[0].tempo_ms;

    res.json({
      em_andamento: true,
      id_volta: rows[0].id_volta,
      tempo_ms: tempo,
      tempo_formatado: formatarTempo(tempo)
    });

  } catch {
    res.status(500).json({ erro: 'Erro ao buscar tempo' });
  }
});

// ==================== FINALIZAR ====================
router.post('/finalizar', async (req, res) => {
  const { id_volta } = req.body;

  if (!id_volta) {
    return res.status(400).json({ erro: 'id_volta obrigatório' });
  }

  try {
    const [result] = await db.execute(
      `UPDATE voltas 
       SET data_hora_fim = NOW(3),
           tempo_volta_ms = TIMESTAMPDIFF(MICROSECOND, data_hora_inicio, NOW(3)) DIV 1000,
           status = 'finalizada'
       WHERE id_volta = ? AND status = 'em_andamento'`,
      [id_volta]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ erro: 'Volta inválida' });
    }

    res.json({ sucesso: true });

  } catch {
    res.status(500).json({ erro: 'Erro ao finalizar volta' });
  }
});

module.exports = router;
