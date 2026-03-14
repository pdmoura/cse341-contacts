const express = require('express');
const router = express.Router();
const swagger = require("./swagger");

router.get('/', (req, res) => {
	res.send(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Contacts API</title>
			<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
		</head>
		<body style="margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#0f172a; font-family:'Inter',sans-serif; color:#e2e8f0;">
			<div style="text-align:center; padding:3rem 2rem; max-width:520px;">
				<div style="margin-bottom:1rem;">
					<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<defs><linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#818cf8"/></linearGradient></defs>
						<path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/>
						<path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
						<path d="M15 16H9a1 1 0 0 1-1-1 3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1Z"/>
						<line x1="3" y1="6" x2="6" y2="6"/><line x1="3" y1="10" x2="6" y2="10"/><line x1="3" y1="14" x2="6" y2="14"/><line x1="3" y1="18" x2="6" y2="18"/>
					</svg>
				</div>
				<h1 style="margin:0 0 0.5rem; font-size:2rem; font-weight:700; background:linear-gradient(135deg,#38bdf8,#818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
					Contacts API
				</h1>
				<p style="margin:0 0 2rem; color:#94a3b8; font-size:1.05rem; line-height:1.6;">
					A RESTful API for managing contacts with full CRUD operations, powered by MongoDB.
				</p>
				<div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
					<a href="/contacts" style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.7rem 1.5rem; background:#1e293b; color:#38bdf8; border:1px solid #334155; border-radius:0.5rem; text-decoration:none; font-weight:600; transition:all 0.2s;"
						onmouseover="this.style.background='#334155'" onmouseout="this.style.background='#1e293b'">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
						View Contacts
					</a>
					<a href="/api-docs" style="display:inline-flex; align-items:center; gap:0.5rem; padding:0.7rem 1.5rem; background:linear-gradient(135deg,#38bdf8,#818cf8); color:#0f172a; border:none; border-radius:0.5rem; text-decoration:none; font-weight:600; transition:all 0.2s;"
						onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
						API Documentation
					</a>
				</div>
			</div>
		</body>
		</html>
	`);
});

router.use('/contacts', require('./contacts'));

router.use('/', swagger);

module.exports = router;