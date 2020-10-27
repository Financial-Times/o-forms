export default Input;
declare class Input {
    /**
    * Class constructor.
    * @param {HTMLElement} [inputElement] - An input element in the DOM
    */
    constructor(element: any);
    input: any;
    parent: any;
    className: {
        invalid: string;
        valid: string;
    };
    /**
    * Event Handler
    * @param {Object} event - The event emitted by element/window interactions
    */
    handleEvent(e: any): void;
    /**
    * Input validation
    * Conditions for input validation
    */
    validate(): boolean;
    destroy(): void;
}
