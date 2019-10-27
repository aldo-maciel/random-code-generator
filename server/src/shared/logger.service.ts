import { configure, getLogger } from 'log4js';
import { properties } from '../properties';

const { log: props } = properties;

configure({
    appenders: {
        errorLevel: {
            type: 'dateFile',
            daysToKeep: props.daysToKeep,
            keepFileExt: true,
            filename: props.path + 'error.log',
            alwaysIncludePattern: true
        },
        allLevel: {
            type: 'dateFile',
            daysToKeep: props.daysToKeep,
            keepFileExt: true,
            filename: props.path + 'log.log',
            alwaysIncludePattern: true,
            level: props.level
        },
        stderr: {
            type: 'logLevelFilter',
            appender: 'errorLevel',
            level: 'error'
        },
        stdout: {
            type: 'stdout',
            layout: {
                type: 'colored'
            },
            level: props.level
        }
    },
    categories: {
        default: {
            appenders: ['stdout', 'stderr', 'allLevel'],
            level: props.level
        }
    }
});
export default getLogger('DynamicServer');
