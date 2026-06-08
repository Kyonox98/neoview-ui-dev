import {
    LitElement,
    html,
    type TemplateResult,
    type PropertyValues,
    type CSSResultGroup,
} from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HomeAssistant, LovelaceCardConfig } from 'custom-card-helpers';
import { isNeoviewCard, NEOVIEW_BRAND, NeoviewCard, type HasHass } from '../types';
import { baseCardStyles } from '../styles/base-card.styles';

export type ActionConfig =
    | { action: 'none' }
    | { action: 'more-info' }
    | { action: 'toggle' }
    | { action: 'navigate'; navigation_path: string }
    | {
          action: 'call-service';
          service: string;
          service_data?: Record<string, unknown>;
      }
    | { action: 'url'; url_path: string };

export interface BaseCardConfig extends LovelaceCardConfig {
    title?: string;
    show_title?: boolean;
    seamless?: boolean;
    padding?: number;
    opacity?: number;
    cards?: LovelaceCardConfig[];
}

export abstract class BaseCard extends LitElement implements HasHass, NeoviewCard {
    readonly [NEOVIEW_BRAND] = true as const;

    @property({ attribute: false }) hass: HomeAssistant | undefined;
    @state() protected config?: BaseCardConfig;
    @property({ type: Boolean, reflect: true }) seamless = false;

    protected showHeader: boolean = true;

    protected tapAction: ActionConfig = { action: 'none' };
    protected holdAction: ActionConfig = { action: 'none' };

    private _holdTimer?: ReturnType<typeof setTimeout>;
    private _holdTriggered = false;

    setConfig(config: BaseCardConfig): void {
        if (!config) throw new Error('[BaseCard] Config required');
        this.config = { ...config };
        this.seamless = !!config.seamless;
    }

    getCardSize(): number {
        const childCount = this.config?.cards?.length ?? 0;
        return childCount > 0 ? Math.max(1, Math.ceil(childCount / 2)) : 3;
    }

    protected override updated(changedProps: PropertyValues): void {
        super.updated(changedProps);
        if (changedProps.has('hass') && this.hass) {
            const hass = this.hass;
            this.shadowRoot?.querySelectorAll('*').forEach((el) => {
                if (isNeoviewCard(el)) {
                    el.hass = hass;
                }
            });
        }
    }

    private _executeAction(action: ActionConfig): void {
        if (!this.hass || !action || action.action === 'none') return;
        const entity = (this.config as any)?.entity;

        switch (action.action) {
            case 'more-info':
                this.dispatchEvent(
                    new CustomEvent('hass-more-info', {
                        bubbles: true,
                        composed: true,
                        detail: { entityId: entity },
                    }),
                );
                break;
            case 'toggle':
                this.hass.callService('homeassistant', 'toggle', {
                    entity_id: entity,
                });
                break;
            case 'navigate':
                history.pushState(null, '', action.navigation_path);
                this.dispatchEvent(
                    new CustomEvent('location-changed', {
                        bubbles: true,
                        composed: true,
                    }),
                );
                break;
            case 'url':
                window.open(action.url_path, '_blank', 'noopener');
                break;
            case 'call-service': {
                const [domain, service] = action.service.split('.');
                this.hass.callService(domain, service, action.service_data ?? {});
                break;
            }
        }
    }

    private _handlePointerDown(ev: PointerEvent): void {
        ev.stopPropagation();
        this._holdTriggered = false;
        this._holdTimer = setTimeout(() => {
            this._holdTriggered = true;
            this._executeAction(this.holdAction);
        }, 500);
    }

    private _handlePointerUp(ev: PointerEvent): void {
        ev.stopPropagation();
        clearTimeout(this._holdTimer);
    }

    private _handleTap(ev: MouseEvent): void {
        ev.stopPropagation();
        if (this._holdTriggered) return;
        this._executeAction(this.tapAction);
    }

    protected renderEmptyState(
        message = 'Aucun contenu configuré.',
        type: 'info' | 'error' = 'info',
    ): TemplateResult {
        return html`
            <div class="empty-state ${type}">
                <span>${message}</span>
            </div>
        `;
    }

    protected abstract renderContent(): TemplateResult;

    override render(): TemplateResult {
        const displayHeader =
            this.showHeader && (this.config?.show_title ?? true) && !!this.config?.title;

        const hasAction = this.tapAction.action !== 'none' || this.holdAction.action !== 'none';

        const inlineStyles = [
            this.config?.padding != null ? `--card-padding: ${this.config.padding}px` : '',
            this.config?.opacity != null ? `--card-opacity: ${this.config.opacity}` : '',
            hasAction ? 'cursor: pointer' : '',
        ]
            .filter(Boolean)
            .join('; ');

        return html`
            <ha-card
                style=${inlineStyles}
                @click=${hasAction ? this._handleTap : undefined}
                @pointerdown=${hasAction ? this._handlePointerDown : undefined}
                @pointerup=${hasAction ? this._handlePointerUp : undefined}
                @pointercancel=${hasAction ? this._handlePointerUp : undefined}
            >
                ${displayHeader ? html`<div class="card-header">${this.config!.title}</div>` : ''}
                <div class="card-content">${this.renderContent()}</div>
            </ha-card>
        `;
    }

    static override styles: CSSResultGroup = baseCardStyles;
}
