// @desc    GET list of films
// @route   GET /admin
// @access  private

const getAdminFilms = (req, res) => {
  res.status(200).json({ name: "Toy Story" });
};

// @desc    DELETE film :id
// @route   DELETE /admin/:id
// @access  private

const deleteAdminFilms = (req, res) => {
  res.status(200).json({ message: `Deleted film ${req.params.id}` });
};

// @desc    PUT update film of :id
// @route   PUT /admin/:id
// @access  private

const putAdminFilms = (req, res) => {
  res.status(200).json({ message: `Updated film ${req.params.id}` });
};

// @desc    POST add new film :id
// @route   POST /admin/:id
// @access  private

const postAdminFilms = (req, res) => {
    
  res.status(200).json({ message: `Added film ${req.params.id}` });
};

module.exports = {
  getAdminFilms,
  deleteAdminFilms,
  putAdminFilms,
  postAdminFilms,
};
