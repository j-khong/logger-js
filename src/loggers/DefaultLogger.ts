import { Logger, LogFunction } from './Logger';

export abstract class DefaultLogger extends Logger {
   protected getDeactivatedLogger(): LogFunction {
      // tslint:disable:no-empty
      return () => {};
   }
   protected getRegularLogger(): LogFunction {
      // tslint:disable:no-console
      return console.log;
   }
   protected getCustomisedLogger(customisation: any): LogFunction {
      return console.log.bind(console, customisation.categories, ...customisation.styles); // tslint:disable:no-console
   }
}
