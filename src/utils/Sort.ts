export const sort = (object: any[], keyToOrded: string | undefined = 'order') => object.slice(0).sort((a, b) => a[keyToOrded] - b[keyToOrded]);
