const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn ,async (req, res) => {
	const links = await pool.query('SELECT * FROM links');
    res.render('index', { links });
});

router.post('/search', isLoggedIn ,async (req, res) => {
	const {select, search} = req.body;
	console.log(select);
	console.log(search);
	const links = await pool.query('SELECT * FROM links WHERE categoria = ? AND marca = ?', [select, search]);
    res.render('index', { links });
});

router.post('/buy', isLoggedIn ,async (req, res) => {
	const {
		title,
		precioNum,
		cantidad,
	} = req.body;

	const total = precioNum * cantidad;
	const messenger = `======= FACTURA DE LA COMPRA =======
====================================
= PRODUCTO ========================
= ${title} (${cantidad}) ==== $${precioNum}.00
======== DELIVERY GRATUITO =========
====================================
= TOTAL A PAGAR = $${total}.00 ===============`
	res.redirect(`https://api.whatsapp.com/send?phone=584243473812&text=${messenger}`);
})

module.exports = router;