
const inMilliseconds = async (time:number) => {
    await new Promise(resolve => setTimeout(resolve, time));
}
export default inMilliseconds