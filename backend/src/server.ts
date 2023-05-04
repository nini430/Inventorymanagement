import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import config from 'config';

const port = config.get('port');

import app from './app';

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
