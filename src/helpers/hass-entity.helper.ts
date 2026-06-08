import type { HomeAssistant } from 'custom-card-helpers';
import type { HassEntity } from 'home-assistant-js-websocket';

export interface ResolvedEntity {
    stateObj: HassEntity;
    stateValue: string;
    domain: string;
    displayName: string;
    displayUnit: string;
    isUnavailable: boolean;
}

export function resolveEntity(
    hass: HomeAssistant,
    entityId: string,
    overrides?: { name?: string; unit?: string },
): ResolvedEntity | null {
    const stateObj = hass.states[entityId];
    if (!stateObj) return null;

    const stateValue = stateObj.state;
    const domain = entityId.split('.')[0];

    return {
        stateObj,
        stateValue,
        domain,
        displayName: overrides?.name ?? stateObj.attributes.friendly_name ?? '',
        displayUnit: overrides?.unit ?? stateObj.attributes.unit_of_measurement ?? '',
        isUnavailable: stateValue === 'unavailable' || stateValue === 'unknown',
    };
}
