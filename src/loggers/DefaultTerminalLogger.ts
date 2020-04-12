import { DevUtils } from '@jkhong/devutils';
import { DefaultLogger } from './DefaultLogger';
import { CategorySettings } from '../domain/CategorySettings';
import { TerminalColors } from '../domain/TerminalColors';

export class DefaultTerminalLogger extends DefaultLogger {
   protected getLoggerCustomisation(categoriesSettings: CategorySettings[]): any {
      const args: string[] = [];
      const categoriesToJoin = [];
      for (const settings of categoriesSettings) {
         categoriesToJoin.push(
            settings.styles['margin-left'] +
               `%s${settings.styles['padding-left']}${settings.categoryName.toUpperCase()}${
                  settings.styles['padding-right']
               }%s` +
               settings.styles['margin-right'],
         );

         // style to apply
         args.push(
            this.getBackgroundColor(settings.styles['bg-color']) + this.getFontColor(settings.styles['font-color']),
         );
         // reset the style for text after
         args.push('\x1b[0m');
      }

      return {
         categories: categoriesToJoin.join(' '),
         styles: args,
      };
   }
   private getBackgroundColor(color: string): string {
      return `\x1b[4${color}m`;
   }
   private getFontColor(color: string): string {
      return `\x1b[3${color}m`;
   }
   setCategoriesSettings(settings: CategorySettings[]): void {
      const toSet = settings.map((s: CategorySettings) => {
         if (DevUtils.isNotSet(s.styles)) {
            s.styles = {};
         }
         this.setDefaultStyleValue(s, 'bg-color', TerminalColors.Green);
         this.setDefaultStyleValue(s, 'font-color', TerminalColors.Black);
         this.setDefaultStyleValue(s, 'padding-left', '');
         this.setDefaultStyleValue(s, 'padding-right', '');
         this.setDefaultStyleValue(s, 'margin-left', '');
         this.setDefaultStyleValue(s, 'margin-right', '');
         return s;
      });
      this._setCategoriesSettings(toSet);
   }
}
