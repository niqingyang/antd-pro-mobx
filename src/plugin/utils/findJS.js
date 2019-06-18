import {join} from 'path';
import {existsSync} from 'fs';

const JS_EXTNAMES = ['.js', '.jsx', '.ts', '.tsx'];

/**
 *
 * @param baseDir 目录
 * @param fileNameWithoutExtname 没有扩展名的文件名
 * @returns {string|null}
 */
export default function (baseDir, fileNameWithoutExtname) {
    for (const extname of JS_EXTNAMES) {
        const fileName = `${fileNameWithoutExtname}${extname}`;
        const absFilePath = join(baseDir, fileName);
        if (existsSync(absFilePath)) {
            return absFilePath;
        }
    }
    return null;
}
