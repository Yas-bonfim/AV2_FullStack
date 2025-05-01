const protectedAccess = (req, res) => {
    res.status(200).json({ message: 'Acesso autorizado' });
  };
  
  module.exports = {
    protectedAccess
  };
  