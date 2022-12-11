const RequestResponseContext = require("./RequestResponseContext");
const { handleError } = require("./utilities");

function requestResponseWrapper(handler) {
  return async function requestHandler(req, res) {
    const context = new RequestResponseContext(req, res);
    const tick = (new Date()).getTime();
    try {
      const data = await handler(context);
      const response = Object.freeze({
        data,
        status: 1,
        error: null,
        processingTime_ms: (new Date()).getTime() - tick
      });
      return res.status(200).send(response);

    } catch(err) {
      const response = handleError(err);
      response.processingTime_ms = (new Date()).getTime() - tick
      return res.status(err.statusCode || 500).send(response);
    }
  }
}

module.exports = requestResponseWrapper;