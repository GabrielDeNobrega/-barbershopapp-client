import { Buffer } from 'buffer';

export const encodeBase64 = (data:any) =>{
    return Buffer.from(data).toString('base64')
}

export const decodeBase64 = (data:any) =>{
    return Buffer.from(data,'base64').toString('utf-8')
}

export default{
    encodeBase64,
    decodeBase64
}