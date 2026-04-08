export function customMap(segment) {
    const dictionary = {
        "末影": "終界",
        "末地": "終界",
        "zh-cn": "zh-tw",
        "zh_cn": "zh_tw",
        "zh_CN": "zh_TW",
        "中国大陆": "台灣",
        "简体": "繁體"
    };

    return dictionary[segment] || segment;
}