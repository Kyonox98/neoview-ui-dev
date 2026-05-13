import { css, type CSSResultGroup } from 'lit';

export const containerCardEditorStyles: CSSResultGroup = css`
    .cards-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px 0;
    }
    .add-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
    }
    select {
        flex: 1;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid var(--divider-color);
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 0.875rem;
    }
    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        pointer-events: none;
    }
    .card-label {
        flex: 1;
        text-transform: capitalize;
    }
    .delete-btn {
        pointer-events: all;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--error-color);
        padding: 4px;
        border-radius: 4px;
        display: flex;
        align-items: center;
    }
    .delete-btn:hover {
        background: var(--error-color);
        color: white;
    }
`;
