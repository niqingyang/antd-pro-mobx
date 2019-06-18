import {join} from 'path';
import {existsSync, statSync} from 'fs';

function test(path) {
    return existsSync(path) && statSync(path).isDirectory();
}

export default function (opts) {
    const {cwd, config} = opts;
    const outputPath = config.outputPath || './dist';

    let pagesPath = 'pages';
    if (process.env.PAGES_PATH) {
        pagesPath = process.env.PAGES_PATH;
    } else {
        if (test(join(cwd, 'src/page'))) {
            pagesPath = 'src/page';
        }
        if (test(join(cwd, 'src/pages'))) {
            pagesPath = 'src/pages';
        }
        if (test(join(cwd, 'page'))) {
            pagesPath = 'page';
        }
    }

    const absPagesPath = join(cwd, pagesPath);
    const absSrcPath = join(absPagesPath, '../');

    return {
        cwd,
        outputPath,
        absOutputPath: join(cwd, outputPath),
        absNodeModulesPath: join(cwd, 'node_modules'),
        pagesPath,
        absPagesPath,
        absSrcPath,
    };
}
