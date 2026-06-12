import { fireEvent, type HomeAssistant } from 'custom-card-helpers';
import type { ActionConfig } from '../types';

export function executeAction(
    host: HTMLElement,
    hass: HomeAssistant | undefined,
    action: ActionConfig,
    entity?: string,
): void {
    if (!hass || !action || action.action === 'none') return;

    switch (action.action) {
        case 'more-info':
            if (!entity) return;
            fireEvent(host, 'hass-more-info', { entityId: entity });
            break;

        case 'toggle':
            if (!entity) return;
            hass.callService('homeassistant', 'toggle', {
                entity_id: entity,
            });
            break;

        case 'navigate':
            history.pushState(null, '', action.navigation_path);
            fireEvent(host, 'location-changed', { replace: false });
            break;

        case 'url':
            window.open(action.url_path, '_blank', 'noopener');
            break;

        case 'call-service': {
            const [domain, service] = action.service.split('.');
            hass.callService(domain, service, action.service_data ?? {});
            break;
        }
    }
}
