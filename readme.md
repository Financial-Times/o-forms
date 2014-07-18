o-ft-forms [![Build Status](https://travis-ci.org/Financial-Times/o-ft-forms.png?branch=master)](https://travis-ci.org/Financial-Times/o-ft-forms)
============
##Overview

This module provides FT-branded styles for commonly used form elements and there corresponding validation states.

---

## Browser Support

Tested and working on:

|  Browsers  | Primary Experience | Core Experience |
|:----------:|:------------------:|:---------------:|
|   Chrome   |                    |                 |
|   Firefox  |                    |                 |
|   Safari   |                    |                 |
|   IE       |                    |                 |



##Usage

####Basic form input structure. 

Each input is made up 3 core elements, it's containing group definded by the class:
     
     '.o-ft-forms-field-group'

labels are defined by:

    '.o-ft-forms__label'
 
and the input definded by:

    '.o-ft-forms__field'
    
So the markup for a basic input looks like this:
    

    `<div class="o-ft-forms-field-group">
        <label class="o-ft-forms__label">Text input disabled</label>
        <input type="text" placeholder="placeholder" class="o-ft-forms__field ">
    </div>`
    
---

###Dependencies

Dependent on [buttons module](https://github.com/Financial-Times/o-ft-buttons).