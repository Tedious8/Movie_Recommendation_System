export function handleStringFormat(str: string, isJSON: boolean) {
    type temp = {name: string};
    return isJSON ? JSON.parse(str).map((item: temp) => item.name).join(', ') 
    : str.replace(/[[\]]/g, '').replace(/'/g, '').trim();
}