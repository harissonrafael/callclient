import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/'
});

export const CALLERS = '/callers';
export const CALLER_STATISTICS = CALLERS + '/statistics';

export default instance;
