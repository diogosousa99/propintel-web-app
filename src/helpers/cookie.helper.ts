export class Cookie {
    public static getByName(name: string): string | undefined {
        const regex = new RegExp(`${name}=(.)`, 'i');
        const valueMatch = document.cookie.match(regex);
        return valueMatch?.[1];
    }
}
