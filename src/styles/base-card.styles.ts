import { css } from 'lit';

export const baseCardStyles = css`
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

    .cards-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        color: rgba(255, 255, 255, 0.5);
        font-style: italic;
    }
`;

export const entityCardStyles = css`
    .state {
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-text-color);
    }

    .unit {
        font-size: 1rem;
        color: var(--secondary-text-color);
    }
`;

export const textCardStyles = css`
    .text {
        margin: 0;
        font-size: 1rem;
        color: var(--primary-text-color);
    }
`;

export const containerCardStyle = css`
    .cards-container[data-layout='vertical'] {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .cards-container[data-layout='horizontal'] {
        display: flex;
        flex-direction: row;
        gap: 8px;
        flex-wrap: wrap;
    }

    .cards-container[data-layout='horizontal'] > * {
        flex: 1;
        min-width: 0;
    }

    .cards-container[data-layout='grid'] {
        display: grid;
        grid-template-columns: repeat(var(--grid-columns, 2), 1fr);
        gap: 8px;
    }
`;
