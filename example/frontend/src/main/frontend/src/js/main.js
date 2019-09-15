import jquery from "jquery";

window.$ = window.jQuery = jquery;

import 'bootstrap';

import "../scss/example-index.scss"

//TODO: Only include this in styleguide build
import "../scss/example-overrides.scss";

import sassVars from '../vars'
import * as patterns from './patterns';

import { formValidationListeners } from './utils';
import * as utils from './utils';
window.utils = utils;

import 'fullcalendar';

formValidationListeners();
utils.formValidationListeners();
utils.iconHandler();

patterns.header();
patterns.secondaryNav();
patterns.floatingMenu();
patterns.video();
patterns.imageGallery();
patterns.accordion();
patterns.carousel();
patterns.share();
patterns.saveMessage();
patterns.textSize();
patterns.facebookShareIcon();
patterns.linkedinShareIcon();
patterns.forgotPassword();
patterns.ranges();
patterns.changePassword();
patterns.alertsGlobal();
patterns.searchResultsOptOut();
patterns.checkboxes();
patterns.forgotUsername();
patterns.signIn();
patterns.signUp();
patterns.progressbar();
patterns.memberHeroBanner();
patterns.topicSelection();
patterns.cloneableContent();
patterns.globalForm();
patterns.myFavorites();
patterns.popovers();
patterns.collectionsAddButton();
patterns.optionsMoreButton();
patterns.collectionNewCollection();
patterns.collectionsRemoveButton();
patterns.collectionPage();
patterns.commerceSteps();
patterns.commerceCart();
patterns.collectionsCarouselHTLVariant();
patterns.myFavoritesPage();
patterns.filterSavedItems();
patterns.collectionUnsave();
patterns.organizations();
patterns.utilityNavigation();
patterns.summaryElem();
patterns.myChapters();
patterns.eventCTA();
patterns.calendarFilter();
patterns.calendarFilterMenu();
patterns.searchFilter();
patterns.searchFilterMenu();
patterns.revenueCycleScore();
patterns.myPreferences();
patterns.iframeReload();
patterns.modalHandler();
patterns.organizationNameTextInput();
patterns.scrollToTop();
patterns.dynamicSearch();
patterns.communitiesHyperlinks();
patterns.communitiesLike();
patterns.messageSelect();
patterns.renewalSelection();
patterns.initMemberDirectory();
patterns.enterpriseCommerceSteps();
patterns.memberCommunityProfile();
patterns.communitiesNotificationsSettings();
patterns.newMessage();
patterns.takeoverAd();
patterns.chaptersSearch();
patterns.myDevelopment();
patterns.myTransactions();
patterns.brgSearchFilterMenu();
patterns.brgListing();
patterns.myFoundersPoint();