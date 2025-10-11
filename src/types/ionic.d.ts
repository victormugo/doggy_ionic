// Declaraciones de tipos para resolver conflictos de Ionic
declare global {
  namespace Components {
    interface IonInput {
      autocorrect?: string;
    }
    
    interface IonSearchbar {
      autocorrect?: string;
    }
  }
}
