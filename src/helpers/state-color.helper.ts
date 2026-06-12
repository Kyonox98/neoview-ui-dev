export function getEntityStateColor(domain: string, stateValue: string): string {
    return `var(--state-${domain}-${stateValue}-color, var(--primary-text-color))`;
}
