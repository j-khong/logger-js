import { DefaultTerminalLogger, DefaultBrowserLogger, NoLogger } from '../dist/index';

const logger = buildLogger('dev');
// const logger = new DefaultTerminalLogger();
logger.getLogger()('logger with no category');

// define the logs categories you want to use
logger.setCategoriesSettings([
   {
      categoryName: 'Welcome Page',
   },
   {
      categoryName: 'Profile Page',
   },
]);

logger.getLogger(['Welcome Page'])('logger with one category');
logger.getLogger(['Welcome Page', 'Profile Page'])('logger with two categories');

logger.setCategoriesSettings([
   {
      categoryName: 'Welcome Page',
      styles: { 'background-color': '#AAACCC', 'font-weight': 'normal', margin: '0px 5px' },
   },
   {
      categoryName: 'Profile Page',
   },
]);
logger.getLogger(['Welcome Page'])('logger with one category');
logger.getLogger(['Welcome Page', 'Profile Page'])('logger with two categories');

function buildLogger(currentEnv) {
   switch (currentEnv) {
      case 'prod':
         return new NoLogger();
      case 'dev':
         return new DefaultBrowserLogger();
   }
   throw new Error(`unknown environment [${currentEnv}]`);
}
