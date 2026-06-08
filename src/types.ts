import type { HomeAssistant } from 'custom-card-helpers';

export interface HasHass {
    hass: HomeAssistant | undefined;
}

export function isHassElement(el: Element): el is Element & HasHass {
    return 'hass' in el;
}
