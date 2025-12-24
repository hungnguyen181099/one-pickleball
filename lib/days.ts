import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const dayjsExt = dayjs;

dayjs.extend(utc);

export { dayjsExt };
