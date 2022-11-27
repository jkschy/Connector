const isWindows = () => {
    return process.platform.indexOf("win32") > -1;
}

export interface DefaultProps {
    id?: string,
    width?: number,
    height?: number,
}

export {isWindows}