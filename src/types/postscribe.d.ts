declare module 'postscribe' {
    const postscribe: (
        selector: Element | string,
        html: string,
        options?: {
            done?: () => void;
            error?: (e: Error) => void;
        }
    ) => void;

    export default postscribe;
}
