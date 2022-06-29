import { luvio } from 'orion/adapters';
import { loginAdapterFactory } from '../../../generated/adapters/login';

const login = loginAdapterFactory(luvio);

export { login };
