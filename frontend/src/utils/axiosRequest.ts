import axios from 'axios';
import { API } from '../constants';

export const request = axios.create({
  baseURL: API,
  withCredentials: true,
});