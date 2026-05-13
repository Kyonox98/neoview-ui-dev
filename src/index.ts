import { EntityCard } from './cards/entity-card';
import { TextCard } from './cards/text-card';
import { ContainerCard } from './cards/container-card';
import './editors/text-card.editor';
import './editors/entity-card.editor';
import './editors/container-card.editor';

customElements.define('neoview-entity-card', EntityCard);
customElements.define('neoview-text-card', TextCard);
customElements.define('neoview-container-card', ContainerCard);

declare global {
    interface Window {
        customCards: Array<{
            type: string;
            name: string;
            description: string;
            preview?: boolean;
        }>;
    }
}

window.customCards = window.customCards || [];
window.customCards.push(
    {
        type: 'neoview-entity-card',
        name: 'Neoview Entity Card',
        description: "Affiche l'état d'une entité",
        preview: true,
    },
    {
        type: 'neoview-text-card',
        name: 'Neoview Text Card',
        description: 'Affiche un texte libre',
        preview: true,
    },
    {
        type: 'neoview-container-card',
        name: 'Neoview Container Card',
        description:
            'Carte conteneur avec layout vertical, horizontal ou grille responsive',
        preview: true,
    },
);
