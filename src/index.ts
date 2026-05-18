import { EntityCard } from './cards/entity-card';
import { TextCard } from './cards/text-card';
import { ContainerCard } from './cards/container-card';

import './editors/text-card.editor';
import './editors/entity-card.editor';
import './editors/container-card.editor';

type CustomCardRegistration = {
    type: string;
    name: string;
    description: string;
    preview?: boolean;
};

declare global {
    interface Window {
        customCards: CustomCardRegistration[];
    }
}

const cardRegistry: Array<{
    tag: string;
    element: CustomElementConstructor;
    meta: CustomCardRegistration;
}> = [
    {
        tag: 'neoview-entity-card',
        element: EntityCard,
        meta: {
            type: 'neoview-entity-card',
            name: 'Neoview Entity Card',
            description: "Affiche l'état d'une entité",
            preview: true,
        },
    },
    {
        tag: 'neoview-text-card',
        element: TextCard,
        meta: {
            type: 'neoview-text-card',
            name: 'Neoview Text Card',
            description: 'Affiche un texte libre',
            preview: true,
        },
    },
    {
        tag: 'neoview-container-card',
        element: ContainerCard,
        meta: {
            type: 'neoview-container-card',
            name: 'Neoview Container Card',
            description:
                'Carte conteneur avec layout vertical, horizontal ou grille responsive',
            preview: true,
        },
    },
];

for (const card of cardRegistry) {
    if (!customElements.get(card.tag)) {
        customElements.define(card.tag, card.element);
    }
}

window.customCards = window.customCards || [];
window.customCards.push(...cardRegistry.map((card) => card.meta));

export const NEOVIEW_CARD_TYPES = cardRegistry.map((card) => card.meta.type);
export const NEOVIEW_CARDS = cardRegistry.map((card) => card.meta);
