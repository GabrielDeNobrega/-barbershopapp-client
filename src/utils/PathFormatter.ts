import { capitalize } from "./Capitalizer"

export const getFormattedPathName = (fullPath: string) => {
    const paths = fullPath.split('/')
    return capitalize(paths[paths.length - 1]);
}