import { LitElement, html, type TemplateResult } from "lit";
import type { LovelaceCardConfig } from "custom-card-helpers";

export class MyTsCard extends LitElement {
  setConfig(_config: LovelaceCardConfig): void {
    // Pour l'instant, on ignore la config, mais la méthode existe
  }

  render(): TemplateResult {
    return html`
      <div class="wrapper">
        <h2>Ma super carte TS</h2>
        <div>Contenu fixe pour le moment.</div>
      </div>
    `;
  }

  static styles = [];
}