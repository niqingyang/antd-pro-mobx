import slash from 'slash2';

// 将Windows反斜杠路径转换为斜杠路径：foo\\bar➔foo/bar
export default function (path) {
    return slash(path);
}
