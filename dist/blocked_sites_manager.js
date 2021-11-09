"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class BSM_IDS {
}
BSM_IDS.root_element = '.blockedSitesManager';
BSM_IDS.add_button = '#bsm-addButton';
BSM_IDS.clear_button = '#bsm-clearButton';
BSM_IDS.sites_row = '.bsm-siteRow';
// autobind decorator
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class SitesStorageManager {
    static getSavedSites(callbackFn) {
        // @ts-ignore
        chrome.storage.local.get(['blockedSites'], function (result) {
            const sites = result.blockedSites;
            if (sites == null || sites == undefined)
                callbackFn([]);
            else
                callbackFn(sites.split(','));
        });
    }
    static save(toSave) {
        // @ts-ignore
        chrome.storage.local.set({ "blockedSites": toSave });
    }
    static clear() {
        // @ts-ignore
        chrome.storage.local.remove('blockedSites');
    }
}
class BlockedSitesManager {
    constructor() {
        this.root = document.querySelector(BSM_IDS.root_element);
        this.sites_row = document.querySelector(BSM_IDS.sites_row);
        this.blockedSites = [];
        SitesStorageManager.getSavedSites((sites) => {
            this.blockedSites = sites;
            this.renderUI();
        });
        this.attachListeners();
    }
    attachListeners() {
        document.querySelector(BSM_IDS.add_button).addEventListener('click', this.addSite);
        document.querySelector(BSM_IDS.clear_button).addEventListener('click', this.clearAll);
    }
    addSite(event) {
        const siteName = prompt("Enter Site Name (Ex. www.google.com)", 'www.youtube.com');
        // If user have cancelled prompt
        if (siteName == null)
            return;
        // else...
        this.blockedSites.push(siteName);
        SitesStorageManager.save(this.blockedSites.toString());
        this.renderUI();
    }
    clearAll(event) {
        SitesStorageManager.clear();
        this.blockedSites = [];
        this.renderUI();
    }
    renderUI() {
        // Clear any pre-existing data
        this.sites_row.innerHTML = "";
        for (var site of this.blockedSites) {
            this.sites_row.innerHTML += `<h3>${site}</h3>`;
        }
    }
}
__decorate([
    autobind
], BlockedSitesManager.prototype, "addSite", null);
__decorate([
    autobind
], BlockedSitesManager.prototype, "clearAll", null);
new BlockedSitesManager();
