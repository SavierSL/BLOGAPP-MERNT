const timeStamp = (): string => {
  return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.log(`[${timeStamp()}] [INFO] [${namespace}] ${message}`, object);
  } else {
    console.log(`[${timeStamp()}] [INFO] [${namespace}] ${message}`);
  }
};
const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(`[${timeStamp()}] [WARN] [${namespace}] ${message}`, object);
  } else {
    console.warn(`[${timeStamp()}] [WARN] [${namespace}] ${message}`);
  }
};
const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(`[${timeStamp()}] [ERROR] [${namespace}] ${message}`, object);
  } else {
    console.error(`[${timeStamp()}] [ERROR] [${namespace}] ${message}`);
  }
};
const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(`[${timeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
  } else {
    console.debug(`[${timeStamp()}] [DEBUG] [${namespace}] ${message}`);
  }
};

export default {
  info,
  warn,
  error,
  debug,
};
