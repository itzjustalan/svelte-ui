import { browser, dev } from "$app/environment";

const LOG_EMO = !true;
const LOG_TIM = true;
const LOG_REQ = true;
const LOG_LVL = 'all';

enum LogLevel {
    info = 'info',
    warn = 'warn',
    error = 'error',
}

enum Colors {
    Reset = "\x1b[0m",
    Bright = "\x1b[1m",
    Dim = "\x1b[2m",
    Underscore = "\x1b[4m",
    Blink = "\x1b[5m",
    Reverse = "\x1b[7m",
    Hidden = "\x1b[8m",
    FgBlack = "\x1b[30m",
    FgRed = "\x1b[31m",
    FgGreen = "\x1b[32m",
    FgYellow = "\x1b[33m",
    FgBlue = "\x1b[34m",
    FgMagenta = "\x1b[35m",
    FgCyan = "\x1b[36m",
    FgWhite = "\x1b[37m",
    FgGray = "\x1b[90m",
    BgBlack = "\x1b[40m",
    BgRed = "\x1b[41m",
    BgGreen = "\x1b[42m",
    BgYellow = "\x1b[43m",
    BgBlue = "\x1b[44m",
    BgMagenta = "\x1b[45m",
    BgCyan = "\x1b[46m",
    BgWhite = "\x1b[47m",
    BgGray = "\x1b[100m",
}

// const INFO_LABEL = '[' + Colors.FgBlue + 'INF' + Colors.Reset + ']';
// const WARN_LABEL = '[' + Colors.FgYellow + 'WRN' + Colors.Reset + ']';
// const ERROR_LABEL = '[' + Colors.FgRed + 'ERR' + Colors.Reset + ']';
const INFO_LABEL = '[' + Colors.FgBlue + 'INFO' + Colors.Reset + ']';
const WARN_LABEL = '[' + Colors.FgYellow + 'WARN' + Colors.Reset + ']';
const ERROR_LABEL = '[' + Colors.FgRed + 'EROR' + Colors.Reset + ']';

export const log = {
    info: (...d: any[]) => handleLog(LogLevel.info, ...d),
    warn: (...d: any[]) => handleLog(LogLevel.warn, ...d),
    error: (...d: any[]) => handleLog(LogLevel.error, ...d),
    request: (status: number, method: string, path: string, ms: number, ...d: any[]) => {
        if (!LOG_REQ) return;
        ms = Math.trunc(ms);
        let str = ts() + '[:';
        if (status < 300) str += Colors.FgGreen;
        else if (status < 400) str += Colors.FgYellow;
        else if (status < 500) str += Colors.FgRed;
        else str += Colors.BgYellow;
        str += status + Colors.Reset + '] ';
        str += Colors.FgYellow + method;
        str += Colors.Reset + ' ' + Colors.FgGreen + path;
        // if (ms > 500) str += Colors.FgYellow + (LOG_EMO ? ' ⏳' : '');
        // else if (ms > 1000) str += Colors.FgRed + (LOG_EMO ? ' 🐌' : '');
        // else str += Colors.FgGreen + (LOG_EMO ? ' 🚀' : '');
        // if (ms > 500) str += Colors.FgYellow + ' ⏳';
        if (ms > 500) str += Colors.FgYellow + ' 🦥';
        else if (ms > 1000) str += Colors.FgRed + ' 🐌';
        else str += Colors.FgGreen + ' 🚀';
        str += ` ${ms} ms` + Colors.Reset;
        console.log(str);
    }
}

const handleLog = (level: LogLevel, ...d: any): void => {
    if (skiplog(level)) return;
    if (browser) return console[level](...d);
    let prefix = ts();
    switch (level) {
        case LogLevel.warn:
            prefix += LOG_EMO ? `${Colors.FgYellow}⚠ ` : WARN_LABEL;
            prefix += Colors.FgYellow;
            break;
        case LogLevel.error:
            prefix += LOG_EMO ? '🚨' : ERROR_LABEL;
            prefix += Colors.FgRed;
            break;
        default:
            prefix += LOG_EMO ? '🔵' : INFO_LABEL;
            prefix += Colors.FgGreen;
            break;
    }
    // prefix = ts() + prefix + Colors.FgGreen;
    console.log(prefix, ...d, Colors.Reset);
}

const ts = () => {
    if (!LOG_TIM) return '';
    return new Date().toLocaleTimeString() + ' ';
}

const skiplog = (level: LogLevel): boolean => {
    if (!dev) return true;
    type LogLimit = 'info' | 'warn' | 'error' | 'imp' | 'all' | 'none';
    const limit: LogLimit = LOG_LVL.toLowerCase() as LogLimit;
    if (limit === 'none') return true;
    else if (limit === 'all') return false;
    else if (limit === 'info' && level === 'info') return false;
    else if (limit === 'warn' && level === 'warn') return false;
    else if (limit === 'error' && level === 'error') return false;
    else if ((limit === 'imp' && level === 'warn') || (limit === 'imp' && level === 'error')) return false;
    else return true;
}