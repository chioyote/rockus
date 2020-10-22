'use strict';

class customizeEachInput{
    constructor(){
        this.functionalities = new InputFunctionalities();
    }

    createSelect(args){
        var allSelectElements = document.getElementsByTagName('select');

        for(var item of allSelectElements){
            if(!item.classList.contains((args[0] != '')? args[0] : '')){
                
                var option = '',
                    selectName = item.getAttribute('name'),
                    ulElement = document.createElement('ul'),
                    wrapElement = document.createElement('div'),
                    inputElement = '',
                    arrowClasses = item.getAttribute('data-arrow-classes') || '',
                    actualClasses = item.getAttribute("class").split(' ');
                    wrapElement.classList.add("CE-select--select",...actualClasses);

                Array.from(item.getElementsByTagName('option')).forEach((el) => {
                  
                    
                    if(el.value ===""){
                        inputElement += `<span class="CE-select--select__selected ${(args[1])? 'CE-select--select__float' : ''}" tabindex="0">
                        <span class="CE-select--label">${el.text}</span>
                        <span class="CE-select--arrow ${arrowClasses}"></span>
                        </span>
                        <input type="hidden" class="CE-select--input" name="${selectName || '' }"/>`;
                    }else{
                        option += `<li data-value="${el.value}" tabindex="0">${el.text}</li>`;
                    }
                });
                ulElement.innerHTML = option;
                wrapElement.innerHTML = inputElement;
                wrapElement.appendChild(ulElement)
                item.parentNode.insertBefore(wrapElement, item.nextSibling);
                item.classList.add('toDelete');
                
                this.functionalities.selectFunctionality(wrapElement)
            }
        }
        this.deleteItem(document.getElementsByClassName('toDelete'));
    }
    createCheck(args){
        var allCheckboxElements = document.querySelectorAll('[type="checkbox"]'),
            allRadioElements =  document.querySelectorAll('[type="radio"]'),
            allCheckElements = [...allCheckboxElements,...allRadioElements];
            
            allCheckElements.forEach(item=>{
                if(!item.classList.contains((args[0] != '')? args[0] : '')){

                    var idElement = item.getAttribute('id'),
                        labelElement = document.querySelector('[for="'+idElement+'"]'),
                        labelText = labelElement.textContent,
                        checkElement = '';
                        item.classList.add('CE--element__d-none');
                        checkElement = `<span class="CE--check__element CE--check__${item.getAttribute('type')}"></span>
                        <span class="CE--check__label">${labelText}</span>`;
                        
                        labelElement.innerHTML = checkElement;
                        labelElement.appendChild(item);
                }
            })
            

    }
    createGeneral(args){
        var allGeneralElements = document.getElementsByClassName(args[0]);

        [...allGeneralElements].forEach(item=>{
            var idElement = item.getAttribute('id'),
            labelElement = document.querySelector('[for="'+idElement+'"]'),
            inputElement = item.cloneNode(true),
            wrapElement = document.createElement('div'),
            actualClasses = item.getAttribute("class").split(' ');
            item.setAttribute("class",'toDelete')
            
            wrapElement.classList.add("CE--general","CE--general__float",...actualClasses);
            wrapElement.appendChild(labelElement);
            wrapElement.appendChild(inputElement);

            item.parentNode.insertBefore(wrapElement, item.nextSibling);
        })

        this.deleteItem(document.getElementsByClassName('toDelete'));
        this.functionalities.floatLabelFunctionality();
    }
    
    deleteItem(items){
        [...items].forEach(item=>{
            item.remove();
        })
    }

}

class InputFunctionalities{
    
    selectFunctionality(element){
        var selectElement = element.getElementsByClassName('CE-select--select__selected'),
            listElement = element.getElementsByTagName('ul');
        selectElement[0].addEventListener('click', (e) => {
            var that = e.target,
                siblingList = element.getElementsByTagName('ul');

                if(!element.classList.contains('CE-select--select__open')){
                    element.classList.add('CE-select--select__open');
                }else{
                    element.classList.remove('CE-select--select__open');
                }
            
        })

        listElement[0].addEventListener('click', (e) => {
            var that = e.target,
                thatValue = '',
                siblingInput = element.getElementsByClassName('CE-select--input');

                if(that.tagName == 'LI'){
                    thatValue = that.getAttribute('data-value');
                    siblingInput[0].setAttribute('value',thatValue);
                    that.classList.add('CE-select--li__selected')
                    console.log('es li', thatValue)
                }
                element.classList.remove('CE-select--select__open');
            
        })
    }
    floatLabelFunctionality(){
        console.log(123)
    }
}

class customizeInputs{
    constructor(args){
        this.select = (args.selects == false)? false:true,
        this.checkbox = (args.checkbox == false)? false:true,
        this.general = (args.general == false)? false:args.general,
        this.exclude = args.exclude || false,
        this.floatLabel = (args.floatLabel == false)? false: args.floatLabel
    }
    customInputs(){
        var allInputsItems = Object.getOwnPropertyNames(this);
        allInputsItems.map(item=>{
            var callFunctionName = `create${(item == 'checkbox' || item == 'radio')? 'Check' :item.charAt(0).toUpperCase() + item.substring(1)}`;
            
            if(this[item] && (item != 'exclude' && item != 'floatLabel')){
                var singleItem = new customizeEachInput();
                singleItem[callFunctionName]([(item == 'general') ? this['general']: this['exclude'],this.floatLabel[item]]);
            }
        })
    }
}

var input = new customizeInputs({
    exclude: 'noSelected',
    general: 'customizeInput',
    floatLabel: {
        'select': true,
        'general': true,
        'textarea' : true,
        'excludeClasses': ['noFloatLabel']
    }
})

input.customInputs();