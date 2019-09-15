const passwordValidator = require('password-validator');

// import Handlebars from 'handlebars/dist/cjs/handlebars';
// var helpers = require('handlebars-helpers')({
// 	handlebars: Handlebars
// });

import createBreakpointManager from 'break';
import anchorme from "anchorme"; // ES6 / Typescript style imports

import {deviceSizes} from '../vars/index';


// check to see if the user agent is MS IE or Trident
// getting the index because every version of IE returns a slightly different UA string
const msie = window.navigator.userAgent.indexOf("MSIE ");
let isBrowserIe = false;

// If the client is IE, don't try to load the breakpoint manager. There is
//   a problem with the match-media file in the break package that doesnt work with IE
// if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./) && !!navigator.userAgent.match(/Edge.*rv\\./)) {
if((msie) || (window.navigator.userAgent.indexOf("Edge") > -1 ) || (window.navigator.userAgent.indexOf("Trident") > -1)){
	isBrowserIe = true;
}

if(!isBrowserIe){
	const bm = createBreakpointManager();
	bm.add( 'mobile-xs', `(max-width: ${deviceSizes.mobile})`);
	bm.add( 'mobile', `(min-width: ${deviceSizes.mobile})`);
	bm.add( 'tablet', `(min-width: ${deviceSizes.tablet})`);
	bm.add( 'desktop', `(min-width: ${deviceSizes.desktop})`);
}


export const onWindowResize = ( { event, deviceSize, cb } ) => {
	switch (event) {
		case 'enter':
			bm.on(`enter:${deviceSize}`, cb, true);
			break;
		case 'exit' :
			bm.on( `exit:${deviceSize}`, cb, true);
			break;
		default:
			bm.on(`enter:${deviceSize}`, cb, true);
			bm.on(`exit:${deviceSize}`, cb, true);
			break;
	}
};

// Function used in popover buttons to determine if they should dismiss on any click event
export function watchForDismiss(ele){
	$(document).on("click",function(event){
		let allowedClicks = ".popover-body";

			if($(ele).has($(event.target)).length == 0 && $(allowedClicks).has($(event.target)).length == 0){
				if( !$(event.target).is(ele)){
					$(ele).popover("hide");
				}
			
			}
	})
}

export function initAutoComplete(dataArray){
	$(".autoSuggestArray").autocomplete({
		source:dataArray
	})
}
/*
Get the password validator object, which defines the acceptable format/state a password may be
 */
export function getPasswordValidator(){
	return new passwordValidator().is().min(8).has().uppercase().has().digits();
}

/*
Returns true if the given email is valid
 */

 /* ----------- change return when length is 0 since required check kicks in if the field is required ---------*/
export function emailIsValid(email){
	if(0 < email.length){
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
	}
	return true;
}

export function studentEmailIsValid(studentEmail){
    if(0 < studentEmail.length){
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+\edu))$/.test(studentEmail);
    }
    return true;
}

/*
Returns true if the given phone number is valid
 */
export function phoneNumberIsValid(phone){
	if(0 < phone.length){
		return /^\(*\+*[1-9]{0,3}\)*-*[1-9]{0,3}[-. /]*\(*[2-9]\d{2}\)*[-. /]*\d{3}[-. /]*\d{4} *e*x*t*\.* *\d{0,4}$/i.test(phone);
	}
	return true;
}

/*
Returns true if the given URL is valid
 */
export function urlIsValid(url){
	if(0 < url.length){
		return /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/.test(url);
	}
	return true;
}

export function maxLength(data,length){
		return (data.length<length)?true:false;
}

export function inputIsNumeric(input){
	if(0 < input.length){
		return /^[0-9]+$/.test(input);
	}
	return true;
}

export function inputGraduationYearCheck(input){
    if(0 < input.length){
        return new Date(input + '-01-02').getYear() > new Date().getYear();
    }
    return true;
}

export function inputHasNoSpecialChars(input){
	if(0 < input.length){
		return /^[a-zA-Z0-9 _.,&@'():/-]*$/.test(input);
	}
	return true;
}

export function inputIsZipCode(input){
		if(0 < input.length){
        		return /^[0-9]{5}(?:-[0-9]{4})?$/.test(input);
        	}
        	return true;
}

export function inputRequired(input){
	if(input){
        return input.length > 0;
	}
    return false;
}

/*
Set the state classes for one form input element
@param $element: outer div of form element, which should contain 'form-global'
@param state: the new form state. Either 'normal', 'success', or 'error'
@param componentName: the form component name. For example: Text Input -> 'text-input'
 */
export function setFormState($element, state, componentName){
	// Remove all state classes found in the form input element
	$element.removeClass(function (index, classNames) {
		let currentClasses = classNames.split(" ");
		let classesToRemove = [];
		$.each(currentClasses, function (index, className) {
			if (/.*\--normal$/.test(className) || /.*\--success$/.test(className) || /.*\--error$/.test(className)) {
				classesToRemove.push(className);
			}
		});
		
		return classesToRemove.join(" ");
	});
	//set aria states
	if(state == "error"){
		$element.find("input,textarea").attr("aria-invalid",true);
	} else {
		$element.find("input,textarea").removeAttr("aria-invalid");
	}
	// Add the state class to the form input element. For example: "form-global--normal form-text-input--normal"
	$element.addClass("form-global--" + state + " form-" + componentName + "--" + state )
}

/*
Set the form message text
@param $element: outer div of form element, which should contain 'form-global'
@param message: text that should appear in place of the message
 */
export function setFormMessage($element, message){
	// TODO AUTHORABLE AEM FORM MESSAGE
	$element.find('.form-global__field-message').text(message);
}

/*
Globally shows & hides the loading spinner
@param show: boolean variable. true: show the loading spinner if not shown; false: hide the loading spinner if not hidden
 */
export function toggleSpinner(show){
	if(show){
		if(!$('#spinner').length){
			// If spinner is not already on page, inject it
			$("body").append('<div class="spinner spinner__load" id="spinner">\
				<div class="spinner__load-widget">\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-1"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-2"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-3"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-4"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-5"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-6"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-7"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-8"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-9"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-10"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-11"></div>\
					<div class="spinner__load-widget-arm spinner__load-widget-arm-12"></div>\
				</div>\
			</div>');
		}
	}else{
		if($('#spinner').length){
			//	If spinner is on page, remove it
			$("#spinner").remove();
		}
	}
}

export function formValidationListeners(){
	$(document).ready(function(){

		let REQUIRED_ERROR = "Field is required";
		let EMAIL_ERROR = "Email is invalid";
        let STUDENT_EMAIL_ERROR = "A valid student email ending in '.edu' is required.";
		let PHONE_ERROR = "Phone number is invalid";
		let URL_ERROR = "URL is invalid";
		let MAX_LENGTH_ERROR = "Field Exceeds Maximum Characters Allowed";
		let ZIP_CODE_ERROR = "Enter a valid 5 digit Zip Code";
		let NUMERIC_ERROR = "Field should contain only numbers";
        let GRADUATION_YEAR_ERROR = "Graduation year should be in future";
		let SPECIAL_CHARS_ERROR = "No special characters allowed.";

		let FIELD_VALIDATIONS = [
            {
                type: 'required',
                checkFunction: inputRequired,
                errorMessage: REQUIRED_ERROR
            },
            {
                type: 'email',
                checkFunction: emailIsValid,
                errorMessage: EMAIL_ERROR
            },
            {
                type: 'student-email',
                checkFunction: studentEmailIsValid,
                errorMessage: STUDENT_EMAIL_ERROR
            },
            {
                type: 'phone',
                checkFunction: phoneNumberIsValid,
                errorMessage: PHONE_ERROR
            },
            {
                type: 'url',
                checkFunction: urlIsValid,
                errorMessage: URL_ERROR
            },
            {
                type: 'maxlength',
                checkFunction: maxLength,
                errorMessage: MAX_LENGTH_ERROR
            },
            {
                type: 'zipcode',
                checkFunction: inputIsZipCode,
                errorMessage: ZIP_CODE_ERROR
            },
            {
                type: 'numeric',
                checkFunction: inputIsNumeric,
                errorMessage: NUMERIC_ERROR
            },
            {
                type: 'graduation-year',
                checkFunction: inputGraduationYearCheck,
                errorMessage: GRADUATION_YEAR_ERROR
            },
			{
				type: 'no-special',
				checkFunction: inputHasNoSpecialChars,
				errorMessage: SPECIAL_CHARS_ERROR
			}
		];
		let validateField = function($input) {
		    if(!$input.attr("readonly")){
                let validationMethods = $input.data('form-validation').split(" ");
                let $formFieldContainer = $input.closest('.form-global');
                if(formHasValueCheck($input)){
                    let errorCount = 0;
                    let fieldValidationIndex = 0;
                    while (fieldValidationIndex < FIELD_VALIDATIONS.length) {
                        let validationMethod = FIELD_VALIDATIONS[fieldValidationIndex];
                        if (validationMethods.indexOf(validationMethod.type) >= 0) {
                            if("maxlength" === validationMethod.type){
                                let maxCharacters = $input.data("form-max-length");
                                if(!validationMethod.checkFunction($input.val(),parseInt(maxCharacters))){
                                    setFormState($formFieldContainer, 'error', $input.data("field-type"));
                                    setFormMessage($formFieldContainer, validationMethod.errorMessage);
                                    errorCount++;
                                }
                            } else if(!validationMethod.checkFunction($input.val())){
                                setFormState($formFieldContainer, 'error', $input.data("field-type"));
                                setFormMessage($formFieldContainer, validationMethod.errorMessage);
                                errorCount++;
                            }
                        }
                        fieldValidationIndex++;
                    }
                    if (errorCount == 0) {
                        formResetState($input, $input.data("field-type"));
                    }
                }
            }
		}

		/*
		@param formValidationType: type of validation for example: email, password, phone, etc.
		 */
        $(document).on("keydown", "input[data-form-validation],textarea[data-form-validation],select[data-form-validation]",function() {
            if(!$(this).attr("readonly")){
                formResetState($(this), $(this).data("field-type"));
            }
        });
        $(document).on("blur", "input[data-form-validation],textarea[data-form-validation],select[data-form-validation]",function() {
            let $input = $(this);
            validateField($input);
        });
        $(document).on('validateFields', 'form', function() {
            let $form = $(this);
            $form.find("input[data-form-validation],textarea[data-form-validation],select[data-form-validation]").each(function() {
                let $input = $(this);
                validateField($input);
            });
        });

		// PASSWORD VALIDATION
		const PASSWORD_REQUIREMENTS_MESSAGE = "Password should contain a minimum of 8 characters, at least 1 uppercase letter, and at least 1 digit";
		const PASSWORD_ERROR_MESSAGES_PREFIX = "Password should contain ";
		const PASSWORD_ERROR_MESSAGES =
			{
				min:"a minimum of 8 characters",
				uppercase:"at least 1 uppercase letter",
				digits:"at least 1 digit"
			};
		let PASSWORD_CURRENT_ERROR_MESSAGE = PASSWORD_REQUIREMENTS_MESSAGE;
		$("input[data-form-validation='password']").on("keydown",function() {
			formResetState($(this), 'text-input');
		});
		$("input[data-form-validation='password']").on("blur",function() {
			let $formFieldContainer = $(this).closest('.form-global');
			if(formHasValueCheck($(this))){
				let passwordFormat = getPasswordValidator();
				let passwordIsValid = false;
				let passwordValue = $(this).val();
				passwordIsValid = passwordFormat.validate(passwordValue);
				if(!passwordIsValid){
					let errorList = passwordFormat.validate(passwordValue, { list: true });
					PASSWORD_CURRENT_ERROR_MESSAGE = PASSWORD_ERROR_MESSAGES_PREFIX;
					$.each(errorList, function (index, value) {
						if(errorList.length == 1){
							PASSWORD_CURRENT_ERROR_MESSAGE = PASSWORD_CURRENT_ERROR_MESSAGE + PASSWORD_ERROR_MESSAGES[value]
						} else if(index == errorList.length-1){
							PASSWORD_CURRENT_ERROR_MESSAGE = PASSWORD_CURRENT_ERROR_MESSAGE.slice(0,-1);
							PASSWORD_CURRENT_ERROR_MESSAGE = PASSWORD_CURRENT_ERROR_MESSAGE +" and "+ PASSWORD_ERROR_MESSAGES[value];
						} else {
							PASSWORD_CURRENT_ERROR_MESSAGE = PASSWORD_CURRENT_ERROR_MESSAGE + PASSWORD_ERROR_MESSAGES[value]+", ";
						}
					});
					setFormState($formFieldContainer, 'error', 'text-input');
					setFormMessage($formFieldContainer, PASSWORD_CURRENT_ERROR_MESSAGE);
				} else {
					formResetState($(this), 'text-input');
				}
			}
		});

		// Reset the form to a vanilla/normal state
		let formResetState = function($this, componentName){
			let $formFieldContainer = $this.closest('.form-global');
			setFormState($formFieldContainer, 'normal', componentName);
			setFormMessage($formFieldContainer, "");
		};

		// Return true if form has value, false and set error state otherwise
		let formHasValueCheck = function($this){
			let $formFieldContainer = $this.closest('.form-global');
			if($this.attr("required")){
				if (0 < $this.val().length){
					return true;
				}else {
					// let $formFieldContainer = $(this).closest('.form-global');
					setFormState($formFieldContainer, 'error', $this.data("field-type"));
					setFormMessage($formFieldContainer, REQUIRED_ERROR);
					return false;
				}
			} else {
				return true;
			}
		};
	});
}

/* Form Mode switch readonly -> edit 
- Set form-mode to edit
- toggle control links(Edit Profile)
- Unset readonly properties for all form elements (except those with data-read-only set which are to be permanently readonly)
- for dropdowns, unset disabled status
- unset readonly conditions for clone
	-- Remove No Records message(if empty)
	-- Show Add link
- show button group
*/
export function switchToEdit($form){

	$form.data("form-mode","edit");
	$(".form-group-global__mode-control--view").hide();
	$(".form-group-global__mode-control--edit").show();

	// Check to see if an autofill value is populated
	let autofillValueExists = autofillIsPopulated($form);
	autofillValueExists ? $form.find('.autoCompleteTarget').addClass("autoCompleteTarget--selected") : '';

	$form.find("input,select,textarea").each(function(){
		// If field doesn't belong to an autofill field that is populated, switch to edit
		if(!(autofillValueExists && fieldNameIsAutofill($(this).attr('name')))){
			switchFormElementToEdit($(this));
		}else{
			// Ignore converting the autofill field to 'Edit'
		}
	});
	if($form.find(".cloneable-content").length>0){
		$form.find(".cloneable-content").each(function(){
			$(this).closest("fieldset").show();
			$(this).find(".cloneable-content__no-records").remove();
			$(this).removeClass("cloneable-content__remove-padding");
			$(this).find(".cloneable-content__link").show();
		});
	}
	$(".form-group-global__btn-group").show();
}
// Switches one form element (input, select, or textarea) to edit mode
export function switchFormElementToEdit($formElement){
	// Do not convert permanent readonly elements with the 'data-read-only' attributes
	if($formElement.data("read-only")==undefined){
		$formElement.attr("readonly") ? $formElement.attr("readonly",false) : "";
		$formElement.attr("disabled") ? $formElement.attr("disabled",false) : "";
		$formElement.removeAttr("tabindex","-1");
		$formElement.removeClass("form-global__field-readonly form-text-area-input__field-readonly");
		$formElement.closest('label').removeClass('form-global__disabled');
		$formElement.siblings('.form-global__disabled-custom-element').removeClass('form-global__disabled-custom-element');
		$formElement.is('select') ? $formElement.parent().removeClass("form-dropdown__custom-readonly") : "";
		$formElement.parent().hasClass("autoCompleteTarget") ? $formElement.parent().addClass("autoCompleteTarget--selected") : "";
	}
}

// Switches an entire form to read only
export function switchToReadOnly($form){

	$form.data("form-mode","readonly");
	$(".form-group-global__mode-control--view").show();
	$(".form-group-global__mode-control--edit").hide();
	$form.find("input,select,textarea").each(function(){
		switchFormElementToReadOnly($(this));
	});
	// NOTE We shouldn't need to convert cloneable-content to read only

	$(".form-group-global__btn-group").hide();
}
// Switches one form element (input, select, or textarea) to read only
export function switchFormElementToReadOnly($formElement){
	// Don't worry about 'data-read-only' items, because they don't need converted
	if($formElement.data("read-only")==undefined){
		!$formElement.attr("readonly") ? $formElement.attr("readonly",true) : "";
		!$formElement.attr("disabled") ? $formElement.attr("disabled",true) : "";
		$formElement.attr("tabindex","-1");
		$formElement.addClass("form-global__field-readonly form-text-area-input__field-readonly");
		// TODO Not using form-global__disabled for now, since form elements don't seem to be using this by default and Dropdown's is on a span
		// $formElement.closest('label').addClass('form-global__disabled');
		$formElement.siblings('.form-checkbox-input__custom-element, .form-radio-input__custom-element').addClass('form-global__disabled-custom-element');
		$formElement.is('select') ? $formElement.parent().addClass("form-dropdown__custom-readonly") : "";
	}
}

// Given a form element, returns true if the autofill value is present, false otherwise
export function autofillIsPopulated($form){
	let $autofill = $form.find('.autoCompleteTarget');
	return 0 < $autofill.length && 0 < $autofill.find('input').prop('value').length;
}

// Given a field 'name', returns true if it is part of the autofill's fields, false otherwise
export function fieldNameIsAutofill(name){
	const autofillNameValues = [
		'Business_Name__c',
		'Account_Organization_Type__c',
		'AccountBillingStreet',
		'AccountBillingCity',
		'AccountBillingCountry',
		'AccountBillingPostalCode',
		'AccountBillingState',
		'AccountWebsite'];
	return autofillNameValues.includes(name);
}

// Displays popover with a given message and optional class name
export function displayPopover(clickedButton, popoverContent, popoverVariant, popoverShouldTimeout){
	if (clickedButton.data('has-popover')) {
		clickedButton.popover('dispose');
	}
	if(popoverShouldTimeout){
		clickedButton.addClass("popover--timeout");
	}else{
		clickedButton.removeClass("popover--timeout");
	}
	clickedButton.data('has-popover', true);
	clickedButton.popover({
		content: popoverContent,
		placement: "top",
		template:'<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-body popover-body--' + popoverVariant + '"></div></div>'
	});
	clickedButton.popover('show');
}

// Returns true if the given link matches the current page, false otherwise
export function linkMatchesCurrentPage($link){
	//omit the .html part, to check if the link portion is part of the location link,any child href, will have a portion of the parent link
	//check if link is part for secondary nav
	if($link.closest(".secondary-nav__list").length > 0){
		//check if link is a parent
		if($link.attr("href")!=undefined){
			let navLinkEnd = $link.attr("href").split('/');	
			let curHref = location.href.split("/")
			curHref = curHref[curHref.length - 1];
			navLinkEnd = navLinkEnd[navLinkEnd.length - 1];
			if(curHref == navLinkEnd){
				return true;
			} else {
				//fallback for wcmmode
				curHref = curHref.split("?wcmmode=disabled");
				curHref = curHref[0];
				if(curHref == navLinkEnd){
					return true;
				}
				return false;
			}
		} else {
			return false;
		}
	} else {
		if($link.attr("href")!=undefined){
			let navLinkEnd = $link.attr("href").split('.')[0]; 
			if(location.href.includes(navLinkEnd)){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}

// After changing the filter of items, this function goes through and shows/hides the time phrases based on if content below them is shown
export function updateTimePhrases($filterTarget){
	$filterTarget.find(".my-favorites-page--time-phrase").each(function(){
		let $timePhrase = $(this);
		let showTimePhrase = false;
		$timePhrase.nextAll().each(function(){
			let $currentSibling = $(this);
			// If current sibling is not another time phrase
			if(!$currentSibling.hasClass("my-favorites-page--time-phrase")){
				// If current sibling is not hidden
				if(!$currentSibling.is(":hidden")  && !$currentSibling.hasClass("my-favorites-page__body-saved-items--no-items")){
					// Show the time phrase and exit loop
					$timePhrase.show();
					showTimePhrase = true;
					return false;
				}else{
					// Keep searching the other siblings to see if any are visible
				}
			}else{
				// If we've got to this point and hit another time phrase, hide the current time phrase and exit loop
				$timePhrase.hide();
				return false;
			}
		});
		if(!showTimePhrase){
			// If we've gone through all hidden siblings, and didn't hit another time phrase, hide the current time phrase
			$timePhrase.hide();
		}
	});
}

// Returns true if there are no saved items being displayed, false otherwise
export function noSavedItemsDisplayed($rootElement){
	let noSavedItems = true;
	$rootElement.closest(".my-favorites-page__body-saved-items--timeline-items-wrapper").find("div[data-filter-tag]").each(function(){
		if($(this).css("display")!="none"){
			noSavedItems = false;
		}
	});
	return noSavedItems;
}

// Returns a Unique ID
export function getUniqueID(){
	return Math.random().toString(36).substr(2, 9);
}

// export function getHandlebars(){
// 	return Handlebars;
// }

//pdf icon handler -- needs to be moved to appropriate js file
export function iconHandler(){
	$(document).ready(function(){
		$("a[href]").each(function(){
			if($(this).attr("href").includes(".pdf")){
				$(this).append("<span class='file__icon'><i class='far fa-file-pdf'></i></span>")
			}
		})
	});
}

// Given an element, this function scrolls to it and focuses on it
export function scrollToEle($ele){
	$('body,html').animate({
		scrollTop : $ele.offset().top
	}, 500);
	$ele.focus();
}

//* Returns value of query parameter or false if the query Parameter doesn't exist */
export function getQueryParameterValue( queryParameter ){
	var results = new RegExp('[\?&]' + queryParameter + '=([^&#]*)')
		.exec(window.location.search);

	return (results !== null) ? results[1] || 0 : "";
}

// Manually generate anchor hyperlinks for Communities
export function generateAnchorLinks(){
	$(".scf p, .scf-activity-content, .scf-comment-msg, .scf-group-header__description").each(function(){
		$(this).html(anchorme($(this).html().replace(/&nbsp;/g, ' '), { truncate:[10,40] }));
	});
}

export function rePaintSaved(saved){
    $('.save-elem__btn').each(function(){
        var path = $(this).attr('data-target-url');

		// // Checking for .html in data url path
		if (path.indexOf('.html') != -1) {
			path = path.replace('.html', '');
		}

        if (typeof saved !== "undefined" && saved !== null ){
            if (path in saved) {
                $(this).addClass('save-elem__btn--is-saved');
                $(this).find("i").removeClass("far fa-bookmark");
                $(this).find("i").addClass("fas fa-bookmark");
            }
            else {
                $(this).addClass('save-elem__btn--not-saved');
                $(this).find("i").removeClass("fas fa-bookmark");
                $(this).find("i").addClass("far fa-bookmark");
            }
        } else {
            $(this).addClass('save-elem__btn--not-saved');
            $(this).find("i").removeClass("fas fa-bookmark");
            $(this).find("i").addClass("far fa-bookmark");
        }
    })
}

// If data-href is not prepopulated on $this, fallback and assign to window.location.href
export function hrefFallback($this) {
	if (!$this.attr('data-href')) {
		$this.attr('data-href', window.location.href);
	}
}
//Group By utility function
export function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
	(rv[x[key]] = rv[x[key]] || []).push(x);
	return rv;
  }, {});
};


