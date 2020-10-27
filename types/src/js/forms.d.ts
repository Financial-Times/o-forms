export default Forms;
declare class Forms {
    /**
     * Get the data attributes from the formElement. If the form is being set up
     * declaratively, this method is used to extract the data attributes from the DOM.
     * @param {HTMLElement} formElement - The message element in the DOM
     */
    static getDataAttributes(formElement: HTMLElement): {};
    /**
     * Initialise form component.
     * @param {(HTMLElement|String)} rootElement - The root element to intialise a form in, or a CSS selector for the root element
     * @param {Object} [options={}] - An options object for configuring the banners
     */
    static init(rootEl: any, opts: any): any;
    /**
    * Class constructor.
    * @param {HTMLElement} [formElement] - The form element in the DOM
    * @param {Object} [options={}] - An options object for configuring the form
    */
    constructor(formElement?: HTMLElement, options?: any);
    form: HTMLElement;
    formInputs: any;
    stateElements: any[];
    opts: any;
    submits: NodeListOf<Element>;
    /**
     * Event Handler
     * @param {Object} event - The event emitted by element/window interactions
     */
    handleEvent(e: any): void;
    summary: Node | ErrorSummary;
    /**
    * Form validation
    * Validates every element in the form and creates input objects for the error summary
    */
    validateFormInputs(): any;
    /**
    * Input state
    * @param {String} [name] - name of the input fields to add state to
    * @param {String} [state] - type of state to apply — one of 'saving', 'saved', 'none'
    * @param {boolean|object} [options] - an object of options display an icon only when true, hiding the status label
    */
    /**
     *
     * @param {String} state - name of the input fields to add state to
     * @param {String} name - type of state to apply — one of 'saving', 'saved', 'none'
     * @param {Object} options - an object of options
     * @param {String} options.iconLabel [null] - customise the label of the state, e.g. the saved state defaults to "Saving" but could be "Sent"
     * @param {Boolean} options.iconOnly [false] - when true display an icon only, hiding the status label
     */
    setState(state: string, name: string, options?: {
        iconLabel: string;
        iconOnly: boolean;
    }): void;
    /**
    * Destroy form instance
    */
    destroy(): void;
}
import ErrorSummary from "./error-summary.js";
