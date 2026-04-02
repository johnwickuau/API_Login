const express = require('express');
const userRoutes = express.Router();
const db = require('../db');
const { use } = require('./user');

userRoutes.get('/', (req, res) => {
    db.query('SELECT * FROM corredores', (err, results) => {
        if (err) {
            console.error('Erro ao buscar corredores: ', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    })});

    userRoutes.post('/', (req, res) => {
        const { nome, email, senha, turma } = req.body;
    
        db.query(
            'INSERT INTO corredores (nome, email, senha, turma) VALUES (?, ?, ?, ?)',
            [nome, email, senha, turma],
            (err, results) => {
                if (err) {
                    console.error('Erro ao criar corredor: ', err);
                    return res.status(500).json({ error: err.message });
                }
    
                res.status(201).json({
                    id: results.insertId,
                    nome,
                    email,
                    turma
                });
            }
        );
    });

    userRoutes.put('/:id', (req, res) => {
        const { id } = req.params;
        const { nome, email, senha, turma } = req.body;
    
        db.query(
            'UPDATE corredores SET nome = ?, email = ?, senha = ?, turma = ? WHERE id = ?',
            [nome, email, senha, turma, id],
            (err, results) => {
                if (err) {
                    console.error('Erro ao atualizar corredor: ', err);
                    return res.status(500).json({ error: err.message });
                }
    
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'Corredor não encontrado' });
                }
    
                res.json({ message: 'Corredor atualizado com sucesso' });
            }
        );
    });
    

    userRoutes.delete('/:id', (req, res) => {
        const { id } = req.params;
    
        db.query(
            'DELETE FROM corredores WHERE id = ?',
            [id],
            (err, results) => {
                if (err) {
                    console.error('Erro ao deletar corredor: ', err);
                    return res.status(500).json({ error: err.message });
                }
    
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'Corredor não encontrado' });
                }
    
                res.json({ message: 'Corredor deletado com sucesso' });
            }
        );
    });


module.exports = userRoutes;