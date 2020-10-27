export default ErrorSummary;
declare class ErrorSummary {
    /**
     * Generate list of anchors
     */
    static createList(inputs: any): HTMLUListElement;
    /**
     * Generate an item for the error summary
     * @param {Object} [input] - The input object to construct an error summary item for
     * @return {Element} - li
     */
    static createItem(input?: any): Element;
    /**
     * Generate anchor element to point at invalid input
     * @param {Object} [input] - The input object to construct an anchor for
     * @return {Element} - a
     */
    static createAnchor(input?: any): Element;
    /**
     * @access private
     * @param {Node} input - The input element which has an error
     * @return {Node}
     */
    static _getItemContent(input: Node): Node;
    /**
    * Class constructor.
    * @param {Array} [elements] - An array of objects, where each object describes an invalid input element
    * @example
    * const example = [
    *	{
    *		id: 'text-input',
    *		valid: false,
    *		error: 'Please fill out this field'
    *		label: 'Input Label',
    *		element: <Element>
    *	}
    *	...
    *	]
    *	new ErrorSummary(example)
    */
    constructor(elements?: any[]);
    elements: any[];
    invalidInputs: any[];
    /**
     * Generate Node to hold list of invalid inputs
     */
    createSummary(): HTMLDivElement;
}
