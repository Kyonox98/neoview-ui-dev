import { LitElement, html, css, type TemplateResult } from 'lit';

export class BaseCard extends LitElement {
    render(): TemplateResult {
        return html`
            <div class="card">
                <div class="card-header">
                    <slot name="header">Titre par défaut</slot>
                </div>
                <div class="card-content">
                    <slot>Contenu par défaut</slot>
                </div>
            </div>
        `;
    }

    static styles = css`
        :host {
            display: block;
        }

        .card {
            background: #1e1f23;
            color: #ffffff;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
            box-sizing: border-box;
        }

        .card-header {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 6px;
        }

        .card-content {
            font-size: 0.95rem;
            opacity: 0.9;
        }
    `;
}
