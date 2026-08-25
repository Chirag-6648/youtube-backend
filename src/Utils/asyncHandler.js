// asyncHandler is a higher-order function.
// It receives our actual request handler/controller as an argument.
const asyncHandler = (requestHandler) => {
  // Return a new middleware function to Express.
  // Express will provide req, res, and next when a request comes in.
  return (req, res, next) => {
    // Execute our original request handler.
    const result = requestHandler(req, res, next);

    // Make sure the result is treated as a Promise.
    // If the request handler succeeds, nothing happens here.
    // If it fails, the Promise becomes rejected.
    Promise.resolve(result)

      // If an error occurs, send that error to
      // Express's error-handling middleware.
      .catch((error) => {
        next(error);
      });
  };
};

export { asyncHandler };
