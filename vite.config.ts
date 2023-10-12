import type {ConfigEnv, UserConfigFn} from 'vite';
import {overrideVaadinConfig} from './vite.generated';
import reactPlugin from '@vitejs/plugin-react';

const customConfig: UserConfigFn = ((_env: ConfigEnv) => ({
  plugins: [
    reactPlugin()
  ]
}));

export default overrideVaadinConfig(customConfig);
