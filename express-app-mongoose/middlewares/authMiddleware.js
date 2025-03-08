const jwt=require('jsonwebtoken');



const authentication = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Correction ici
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        const token = authHeader.split(' ')[1]; // Récupérer seulement le token
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Vérifier le token

        req.user = decoded; // Ajouter l'utilisateur à `req.user`
        next(); // Passer à la prochaine fonction

    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = authentication;
