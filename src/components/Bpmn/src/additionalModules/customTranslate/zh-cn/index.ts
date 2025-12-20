import events from './events';
import gateway from './gateway';
import lint from './lint';
import other from './other';
import tasks from './tasks';

export default {
  ...other,
  ...events,
  ...gateway,
  ...lint,
  ...tasks
};
