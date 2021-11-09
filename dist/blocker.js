"use strict";
class SiteBlocker {
    constructor(siteUrl) {
        this.siteUrl = siteUrl;
        this.generateSTYLES = () => {
            return `<style>@import url('https://fonts.googleapis.com/css2?family=Dongle&display=swap');
            body {
                background: #98D1DD;
                font-family: 'Dongle', sans-serif;
              }
            
              .par{
                height: 95vh;
                display: flex;
                  justify-content: center;
                  align-items: center;
              }
             
              .msg {
                letter-spacing: 7px;
                font-size: 100px;
                line-height: 80%;
                text-align: center;
              }
               </style>`;
        };
        this.generateHTML = () => {
            return `
            <div class='par'>
                <p class ='msg'>Get back to work! 
                <br>You can use this site during your break.
                </p>    
            </div>  
          `;
        };
        this.siteUrl = siteUrl;
        this.preRun();
    }
    getSavedSites(callbackFn) {
        // @ts-ignore
        chrome.storage.local.get(['blockedSites'], function (result) {
            const sites = result.blockedSites;
            if (sites == null || sites == undefined)
                callbackFn([]);
            else
                callbackFn(sites.split(','));
        });
    }
    matchSiteUrl(url) {
        if (url == this.siteUrl)
            return true;
        return false;
    }
    preRun() {
        this.getSavedSites((savedSites) => {
            for (var site of savedSites) {
                if (this.matchSiteUrl(site)) {
                    this.preventFromVisiting();
                }
            }
            return false;
        });
    }
    preventFromVisiting() {
        document.head.innerHTML = this.generateSTYLES();
        document.body.innerHTML = this.generateHTML();
        return;
    }
}
new SiteBlocker(window.location.hostname);
