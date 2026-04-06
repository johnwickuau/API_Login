const express = require('express');
const router = express.Router();
const db = require('../db');

// LISTAR TODOS OS CORREDORES
router.get('/', async (req, res) => {
    try {
        const [corredores] = await db.query('SELECT * FROM corredores');
        res.json(corredores);
    } catch (error) {
        console.error('Erro ao buscar corredores: ', error.message);
        res.status(500).json({ erro: error.message });
    }
});

// CRIAR CORREDOR
router.post('/', async (req, res) => {
    const { nome, email, senha, turma } = req.body;
    if (!nome || !email || !senha || !turma) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO corredores (nome, email, senha, turma) VALUES (?, ?, ?, ?)',
            [nome, email, senha, turma]
        );
        res.status(201).json({ id: result.insertId, nome, email, turma });
    } catch (error) {
        console.error('Erro ao criar corredor: ', error.message);
        res.status(500).json({ erro: error.message });
    }
});

// ATUALIZAR CORREDOR
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha, turma } = req.body;
    if (!nome || !email || !senha || !turma) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    try {
        const [result] = await db.query(
            'UPDATE corredores SET nome = ?, email = ?, senha = ?, turma = ? WHERE id = ?',
            [nome, email, senha, turma, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Corredor não encontrado' });
        }
        res.json({ mensagem: 'Corredor atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar corredor: ', error.message);
        res.status(500).json({ erro: error.message });
    }
});

// DELETAR CORREDOR
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM corredores WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Corredor não encontrado' });
        }
        res.json({ mensagem: 'Corredor deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar corredor: ', error.message);
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;