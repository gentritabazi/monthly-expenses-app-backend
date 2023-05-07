export default abstract class ControllerBase {
  // https://gist.github.com/jeffochoa/a162fc4381d69a2d862dafa61cda0798
  public statusCodeHttpUnauthorized = 401;
  public statusCodeUnprocessableEntity = 422;

  public jsonOk() {
    return {
      message: 'The process was successfully completed.',
    };
  }
}
