const asyncWrapper = (func) => {
  //function is taken as argument
  return async (req, res, next) => {
    //returning a function
    try {
      await func(req, res, next); // passing function gets called/executed in try-block
      // important ===>   use await here because it will keep running the program or else app crashes
    } catch (error) {
      next(error); // pass error to expressJS as it have its own in-built error-handler.
    }
  };
};

module.exports = asyncWrapper;
