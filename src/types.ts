import type { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';

export const NEOVIEW_BRAND = '__neoview__' as const;

export interface HasHass {
    hass: HomeAssistant | undefined;
}

export function isHassElement(el: Element): el is Element & HasHass {
    return 'hass' in el;
}

export interface NeoviewCard extends HasHass {
    readonly [NEOVIEW_BRAND]: true;
    setConfig(config: LovelaceCardConfig): void;
    getCardSize(): number;
}

export function isNeoviewCard(el: Element): el is Element & NeoviewCard {
    return (
        NEOVIEW_BRAND in el && (el as Record<typeof NEOVIEW_BRAND, unknown>)[NEOVIEW_BRAND] === true
    );
}
