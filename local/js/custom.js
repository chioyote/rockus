$(document).ready(function() {
    $('input').change(function(){
        validateForm();
    })
    if($('#birthday').length > 0){

        $('#birthday').datepicker({
            maxDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
            autoClose: true,
            onSelect: function(formattedDate, date, inst){
                validateForm();
            }
        })
    }
    footerElement();
    chageTitle();
});

chageTitle = function(){
    if($('[data-section-change="error"]').length > 0) $('[data-section-container="true"]').empty();
    $('[data-section-change="error"]').removeClass('d-none').detach().appendTo('[data-section-container="true"]');
}
footerElement = function(){
    $('footer').detach().appendTo('#cqcanvas');
}
validateForm = function(){
    var form = $('form').not('[novalidate]');

    form.each(function(){
        var that = $(this),
            fieldsToValidate = that.find("[required='true']"),
            groupsToValidate = that.find(".requiredGroup"),
            isValid = [],
            alertText = "<span class='GC-form__field--error'>Campo obligatorio</span>";
            
            groupsToValidate.each(function(){
                 if($(this).find('input:checked').length > 0){
                    isValid.push(1);
                    $('.GC-form__field--error').remove();
                }else{
                    isValid.push(0);
                    
                }
            })
            // if(groupsToValidate.find('input:checked').length > 0){
            //     isValid.push(1);
            //     $('.GC-form__field--error').remove();
            // }else{
            //     groupsToValidate.append(alertText)
            //     isValid.push(0);
                
            // }
            
            if(fieldsToValidate.val() != ''){
                isValid.push(1);
                fieldsToValidate.parent('div').find('.GC-form__field--error').remove();
            }else{
                fieldsToValidate.parent('div').append(alertText)
                isValid.push(0);
                
            }
            console.log(isValid,'isValid');
        that.find('button')[isValid.indexOf(0) == -1 ? "removeAttr" : "prop"]('disabled','disabled');
  
    })
}