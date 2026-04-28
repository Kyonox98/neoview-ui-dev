import { html, type CSSResultGroup, type TemplateResult } from 'lit';
import { BaseCard, type BaseCardConfig } from '../base-card';
import { baseCardStyles, entityCardStyles } from '../styles/base-card.styles';

export interface EntityCardConfig extends BaseCardConfig {
    entity: string;
}

export class EntityCard extends BaseCard {
    // showHeader = true (inherited)

    setConfig(config: EntityCardConfig): void {
        if (!config.entity) throw new Error('entity required!');
        super.setConfig(config);
    }

    private get _entityConfig(): EntityCardConfig {
        return this._config as EntityCardConfig;
    }

    protected renderContent(): TemplateResult {
        const state = this.hass?.states[this._entityConfig.entity];
        return html`
            <span class="state">${state?.state ?? 'Indisponible'}</span>
            <span class="unit"
                >${state?.attributes.unit_of_measurement ?? ''}</span
            >
        `;
    }

    static styles: CSSResultGroup = [baseCardStyles, entityCardStyles];
}
