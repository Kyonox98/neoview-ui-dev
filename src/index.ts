import { MyTsCard } from "./card";

customElements.define("my-ts-card", MyTsCard);

declare global {
    interface Window {
        customCards: Array<any>;
    }
}

window.customCards = window.customCards || [];
window.customCards.push({
    type: "my-ts-card",
    name: "My TS Card",
    description: "A base TypeScript card"
});
