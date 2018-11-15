const env = process.env;

export const nodeEnv = env.NODE_ENV || 'production';

export const logStars = function(message) {
  console.info('**********');
  console.info(message);
  console.info('**********');
};

export default {
  port: nodeEnv.PORT || 3001,
  host: nodeEnv.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};
