import { html, type CSSResultGroup, type TemplateResult } from 'lit';
import { ActionConfig, BaseCard, type BaseCardConfig } from './base-card';
import { baseCardStyles } from '../styles/base-card.styles';
import { entityCardStyles } from '../styles/entity-card.styles';

export interface EntityCardConfig extends BaseCardConfig {
    entity: string;
    name?: string;
    unit?: string;
    icon?: string;
    state_color?: boolean;
    font_size?: string;
    font_weight?: 'normal' | 'bold' | 'bolder' | 'lighter';
    font_style?: 'normal' | 'italic';
    align?: 'left' | 'center' | 'right';
    color?: string;
}

const ALIGN_MAP: Record<string, string> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
};

export class EntityCard extends BaseCard {
    protected override tapAction: ActionConfig = { action: 'more-info' };

    override setConfig(config: EntityCardConfig): void {
        super.setConfig(config);
    }

    private get entityConfig(): EntityCardConfig {
        return this.config as EntityCardConfig;
    }

    static getConfigElement(): HTMLElement {
        return document.createElement('neoview-entity-card-editor');
    }

    static getStubConfig(): EntityCardConfig {
        return {
            type: 'custom:neoview-entity-card',
            title: '',
            show_title: false,
            entity: '',
            name: '',
            unit: '',
            icon: '',
            color: '',
            state_color: false,
            font_size: '1rem',
            font_weight: 'normal',
            font_style: 'normal',
            align: 'center',
        };
    }

    override getCardSize(): number {
        return 2;
    }

    private getStateColor(domain: string, stateValue: string): string {
        return `var(--state-${domain}-${stateValue}-color, var(--primary-text-color))`;
    }

    protected override renderContent(): TemplateResult {
        const cfg = this.entityConfig;
        const stateObj = this.hass?.states[cfg.entity];

        if (!stateObj) {
            return this.renderEmptyState(
                `Entité introuvable : ${cfg.entity}`,
                'error',
            );
        }

        const stateValue = stateObj?.state ?? 'Indisponible';
        const domain = cfg.entity.split('.')[0];

        const displayName =
            cfg.name ?? stateObj?.attributes.friendly_name ?? '';
        const displayUnit =
            cfg.unit ?? stateObj?.attributes.unit_of_measurement ?? '';

        const stateColor = cfg.state_color
            ? this.getStateColor(domain, stateValue)
            : (cfg.color ?? undefined);

        const stateStyle = [
            cfg.font_size ? `--entity-font-size: ${cfg.font_size}` : '',
            cfg.font_weight ? `--entity-font-weight: ${cfg.font_weight}` : '',
            cfg.font_style ? `--entity-font-style: ${cfg.font_style}` : '',
            cfg.align
                ? `--entity-justify: ${ALIGN_MAP[cfg.align] ?? 'flex-start'}`
                : '',
            stateColor ? `--entity-color: ${stateColor}` : '',
        ]
            .filter(Boolean)
            .join('; ');

        return html`
            <div class="entity-wrapper" style=${stateStyle}>
                ${cfg.icon ? html`<ha-icon icon=${cfg.icon}></ha-icon>` : ''}
                ${displayName
                    ? html`<span class="name">${displayName}</span>`
                    : ''}
                <span class="state">${stateValue}</span>
                ${displayUnit
                    ? html`<span class="unit">${displayUnit}</span>`
                    : ''}
            </div>
        `;
    }

    static override styles: CSSResultGroup = [baseCardStyles, entityCardStyles];
}
