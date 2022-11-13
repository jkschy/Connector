const isWindows = () => {
    return process.platform.indexOf("win32") > -1;
}

export {isWindows}