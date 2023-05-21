const cutAt = (text : string, cutAt: number) =>{
    if(text.length < cutAt) return text;
    return text.split('', cutAt).concat('...');
}
export default cutAt