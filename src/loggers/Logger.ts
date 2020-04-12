import { DevUtils, ArrayUtils } from '@jkhong/devutils';
import { CategorySettings } from '../domain/CategorySettings';

export type LogFunction = (args?: any) => void;

export abstract class Logger {
   private categoriesSettings: CategorySettings[] = [];
   private activated: boolean = true;

   activateCategoriesOnly(categories: string[]): void {
      this.categoriesSettings = this.categoriesSettings.map((settings) => {
         settings.dump = false;
         if (categories.includes(settings.categoryName)) {
            settings.dump = true;
         }
         return settings;
      });
   }

   deactivateCategories(categories: string[]): void {
      this.categoriesSettings = this.categoriesSettings.map((settings) => {
         if (categories.includes(settings.categoryName)) {
            settings.dump = false;
         }
         return settings;
      });
   }

   protected _setCategoriesSettings(settings: CategorySettings[]): void {
      this.categoriesSettings = settings
         .filter((c: CategorySettings) => {
            return DevUtils.isSet(c.categoryName);
         })
         .map((c: CategorySettings) => {
            if (DevUtils.isNotSet(c.dump)) {
               c.dump = true;
            }
            return c;
         });
   }
   protected setDefaultStyleValue(settings: CategorySettings, propertyName: string, defaultValue: string): void {
      if (settings.styles[propertyName] === undefined) {
         settings.styles[propertyName] = defaultValue;
      }
   }
   abstract setCategoriesSettings(settings: CategorySettings[]): void;

   activate(): void {
      this.activated = true;
   }
   deactivate(): void {
      this.activated = false;
   }

   // use: logger.getLogger(['login', 'subscribe'])('my log on these categories', obj)
   getLogger(categories: string[]): LogFunction {
      if (!this.activated) {
         return this.getDeactivatedLogger();
      }

      if (ArrayUtils.isEmpty(categories)) {
         return this.getRegularLogger();
      }

      const categoriesSettings = this.categoriesSettings.filter((settings) => {
         return categories.includes(settings.categoryName) && settings.dump;
      });

      if (categoriesSettings.length === 0) {
         return this.getDeactivatedLogger();
      }

      // https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
      // https://github.com/dariuszp/colog
      // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
      // console.log('print');
      // const stack = (new Error()).stack;
      // if (stack) {
      //     const res = stack.split('\n');
      //     const callerFileAndLineStack = res.length >= 3 ? res[2] : "";
      //     const callerFileAndLine = callerFileAndLineStack.split('at ');
      //     console.log('print', callerFileAndLine.length >= 2 ? callerFileAndLine[1] : "unknown");
      // }

      const customisation = this.getLoggerCustomisation(categoriesSettings);

      return this.getCustomisedLogger(customisation);
   }
   protected getDeactivatedLogger(): LogFunction {
      // tslint:disable:no-empty
      return () => {};
   }

   protected abstract getLoggerCustomisation(categoriesSettings: CategorySettings[]): any;
   protected abstract getRegularLogger(): LogFunction;
   protected abstract getCustomisedLogger(customisation: any): LogFunction;
}
