export default State;
declare class State {
    /**
    * Class constructor.
    * @param {RadioNodeList} [inputs] - A NodeList of radio input elements
     * @param {Boolean|Object} opts - an object of options
     * @param {String} options.iconOnly [null] - when true display an icon only, hiding the status label
    */
    constructor(inputs?: RadioNodeList, opts: boolean | any);
    inputs: RadioNodeList;
    parent: any;
    opts: any;
    className: {
        saving: string;
        saved: string;
    };
    /**
    * Create state element
    * @access private
    */
    _generateStateEl(): void;
    stateEl: HTMLSpanElement;
    /**
    * State setter
    * @param {String} state type of state to display
    * @param {String} label customise the label of the state, e.g. the saved state defaults to "Saving" but could be "Sent"
    */
    set(state: string, label: string): void;
    /**
    * Saving state
    * @access private
    */
    _saving(label: any): void;
    /**
    * Saved state
    * @access private
    */
    _saved(label: any): void;
    /**
    * Remove state
    * @access private
    */
    _remove(): void;
    /**
    * Verify input parent
    * @access private
    */
    _verify(): void;
}
