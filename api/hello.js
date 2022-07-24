const hello = (_request, response) => {
  response.status(200).send("Hello! I am a serverless function.");
};

export default hello;
