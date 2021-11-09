class BSM_IDS {
    static root_element = '.blockedSitesManager';
    static add_button = '#bsm-addButton';
    static clear_button = '#bsm-clearButton';
    static sites_row = '.bsm-siteRow';
}

// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class SitesStorageManager {
    static getSavedSites(callbackFn: Function) {
        // @ts-ignore
        chrome.storage.local.get(['blockedSites'], function (result) {
            const sites = result.blockedSites;
            if (sites == null || sites == undefined) callbackFn([]);
            else callbackFn(sites.split(','));
        });
    }

    static save(toSave: string) {
        // @ts-ignore
        chrome.storage.local.set({ "blockedSites": toSave });
    }

    static clear() {
        // @ts-ignore
        chrome.storage.local.remove('blockedSites');
    }
}

class BlockedSitesManager {
    root: HTMLDivElement;
    sites_row: HTMLDivElement;
    blockedSites: Array<string>;
    constructor() {
        this.root = <HTMLDivElement>document.querySelector(BSM_IDS.root_element)!;
        this.sites_row = <HTMLDivElement>document.querySelector(BSM_IDS.sites_row)!;
        this.blockedSites = [];
        SitesStorageManager.getSavedSites((sites : any)=>{
            this.blockedSites = sites;
            this.renderUI();
        });
        this.attachListeners();
    }

    attachListeners() {
        (<HTMLButtonElement>document.querySelector(BSM_IDS.add_button))!.addEventListener('click', this.addSite);
        (<HTMLButtonElement>document.querySelector(BSM_IDS.clear_button))!.addEventListener('click', this.clearAll);
    }

    @autobind
    addSite(event: Event) {
        const siteName = prompt("Enter Site Name (like google.com)", 'google.com');
        // If user have cancelled prompt
        if (siteName == null) return;
        // else...
        this.blockedSites.push(siteName);
        SitesStorageManager.save(this.blockedSites.toString());
        this.renderUI();
    }

    @autobind
    clearAll(event: Event) {
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
new BlockedSitesManager();