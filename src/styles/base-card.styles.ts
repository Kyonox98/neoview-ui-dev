import { css } from 'lit';

export const baseCardStyles = css`
    :host {
        display: block;
        min-width: 0;
        overflow: hidden;
        container-type: inline-size;
    }

    ha-card {
        background: rgba(15, 15, 20, var(--card-opacity, 0.15));
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.12);
        padding: var(--card-padding, 16px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        min-width: 0;
        overflow: hidden;
    }

    :host([seamless]) ha-card {
        background: transparent;
        border: none;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        padding: 0;
    }

    .card-header {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 6px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card-content {
        font-size: 0.95rem;
        opacity: 0.9;
        min-width: 0;
    }
`;
