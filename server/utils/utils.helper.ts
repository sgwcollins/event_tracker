interface AnyObject {
    [key: string]: any;
}

export const flattenObj = (obj: AnyObject): AnyObject => {
    return Object.keys(obj).reduce((acc: AnyObject, cur: string) => {
        return typeof obj[cur] === 'object' && obj[cur] !== null 
            ? { ...acc, ...flattenObj(obj[cur]) }
            : { ...acc, [cur]: obj[cur] };
    }, {});
}