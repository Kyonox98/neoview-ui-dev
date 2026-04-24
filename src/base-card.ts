import { LitElement, html, css, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

export interface BaseCardSection {
    id: string;
    label: string;
    value: string;
}

export class BaseCard extends LitElement {
    @property({ type: Array })
    sections: BaseCardSection[] = [];

    render(): TemplateResult {
        return html`
            <div class="card">
                ${this.sections.map(
                    (section) => html`
                        <div class="card-section">
                            <div class="section-label">${section.label}</div>
                            <div class="section-value">${section.value}</div>
                        </div>
                    `,
                )}
            </div>
        `;
    }

    static styles = css`
        :host {
            display: block;
        }

        .card {
            background: rgba(15, 15, 20, 0.15);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
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

        .card-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            font-size: 0.95rem;
            opacity: 0.9;
        }

        .card-section:last-child {
            border-bottom: none;
        }

        .section-label {
            opacity: 0.8;
        }

        .section-value {
            font-weight: 600;
        }
    `;
}
