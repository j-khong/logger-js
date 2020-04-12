import { Logger, LogFunction } from './Logger';
import { CategorySettings } from '../domain/CategorySettings';

export class NoLogger extends Logger {
   getLogger(categories?: string[]): LogFunction {
      return this.getDeactivatedLogger();
   }

   // tslint:disable:no-empty
   setCategoriesSettings(settings: CategorySettings[]): void {}

   protected getRegularLogger(): LogFunction {
      return this.getDeactivatedLogger();
   }
   protected getCustomisedLogger(customisation: any): LogFunction {
      return this.getDeactivatedLogger();
   }
   protected getLoggerCustomisation(categoriesSettings: CategorySettings[]): any {
      return {};
   }
}
