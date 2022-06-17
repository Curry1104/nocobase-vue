import { InstallOptions, Plugin } from '@nocobase/server';

export class PluginTestPlugin extends Plugin {
  getName(): string {
    return this.getPackageName(__dirname);
  }

  beforeLoad() {
    // TODO
  }

  async load() {
    // TODO
    // Visit: http://localhost:13000/api/testPluginTest:getInfo
    this.app.resource({
      name: 'testPluginTest',
      actions: {
        async getInfo(ctx, next) {
          ctx.body = `Hello plugin-test!`;
          next();
        },
      },
    });
    this.app.acl.allow('testPluginTest', 'getInfo');
  }

  async install(options: InstallOptions) {
    // TODO
  }
}

export default PluginTestPlugin;
