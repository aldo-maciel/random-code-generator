import app from './app';
import { properties } from './properties';
import logger from './shared/logger.service';

app.listen(properties.server.port, () => {
    logger.info('Express server listening on port ', properties.server.port);
});
