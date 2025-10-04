export function screenshotPath(name: string): string {
    return `./screenshots/${name.replace(/\s+/g, '_')}.png`;
}

export function waitFor(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const waitFor2 = () => waitFor(2000);

export const waitFor5 = () => waitFor(5000);

export const waitFor10 = () => waitFor(10000);