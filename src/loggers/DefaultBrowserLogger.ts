import { DevUtils } from '@jkhong/devutils';
import { DefaultLogger } from './DefaultLogger';
import { CategorySettings } from '../domain/CategorySettings';

export class DefaultBrowserLogger extends DefaultLogger {
   setCategoriesSettings(settings: CategorySettings[]): void {
      const toSet = settings.map((s: CategorySettings) => {
         if (DevUtils.isNotSet(s.styles)) {
            s.styles = {};
         }
         this.setDefaultStyleValue(s, 'color', '#FFFFFF');
         this.setDefaultStyleValue(s, 'padding', '3px 3px');
         this.setDefaultStyleValue(s, 'margin', '3px 3px');
         this.setDefaultStyleValue(s, 'font-weight', 'bold');
         this.setDefaultStyleValue(s, 'background-color', '#000000');
         return s;
      });
      this._setCategoriesSettings(toSet);
   }
   protected getLoggerCustomisation(categoriesSettings: CategorySettings[]): any {
      const args: string[] = [];
      const categoriesToJoin = [];
      for (const settings of categoriesSettings) {
         let css = '';
         for (const style in settings.styles) {
            if (settings.styles.hasOwnProperty(style)) {
               css += `${style}: ${settings.styles[style]};`;
            }
         }
         categoriesToJoin.push(`%c${settings.categoryName.toUpperCase()}%c`);
         args.push(css); // style to apply
         args.push('color: inherit;'); // reset the style for text after
      }

      return {
         categories: categoriesToJoin.join(''),
         styles: args,
      };
   }
}
