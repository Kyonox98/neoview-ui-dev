import { css } from 'lit';

export const containerCardStyles = css`
    .cards-container {
        display: flex;
        flex-direction: column;
        gap: var(--cards-gap, 8px);
    }

    .cards-container[data-layout='horizontal'],
    .cards-container[data-layout='grid'] {
        flex-direction: row;
        gap: 0;
    }

    .column {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: var(--cards-gap, 8px);
        padding: 0 var(--cards-gap, 8px);
        min-width: 0;
    }

    .column:first-child {
        padding-left: 0;
    }

    .column:last-child {
        padding-right: 0;
    }

    .column.has-divider {
        border-right: 1px solid rgba(255, 255, 255, 0.08);
    }

    .cards-container[data-layout='vertical'] .divider {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        margin: 4px 0;
    }

    .empty-state {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 0;
        color: rgba(255, 255, 255, 0.5);
        font-style: italic;
    }
`;
