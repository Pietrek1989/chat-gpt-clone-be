/* global process */

import Express from "express";
import cors from "cors";
import createHttpError from "http-errors";

const server = Express();
const port = process.env.PORT || 3420;
const whitelist = [process.env.FE_URL, process.env.FE_PROD_URL];

server.use(
  cors({
    origin: (currentOrigin, corsNext) => {
      if (!currentOrigin || whitelist.indexOf(currentOrigin) !== -1) {
        corsNext(null, true);
      } else {
        corsNext(
          createHttpError(400, `Origin ${currentOrigin} is not whitelisted.`)
        );
      }
    },
  })
);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
