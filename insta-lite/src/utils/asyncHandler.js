const asyncHandler = (fn) => {
  return async (req, res, next) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
};

module.exports = asyncHandler;
