class SiteBlocker {
  constructor(private siteUrl: string) {
    this.siteUrl = siteUrl;
    this.preRun();
  }

  generateSTYLES = () => {
    return `<style>@import url('https://fonts.googleapis.com/css2?family=Dongle&display=swap');
      body {
        background: #98D1DD;
        color: #fff;
        font-family: 'Dongle', sans-serif;
      }
    
      .par{
        height: 98vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
     
      .msg {
        letter-spacing: 7px;
        font-size: 100px;
        line-height: 80%;
      }
       </style>`;
  };

  generateHTML = (pageName: string) => {
    return `
        <div class='par'>
          <h1 class ='msg'>GET OFF OF ${pageName} AND BACK TO WORK</h1>
        </div>  
        `;
  };

  getSavedSites(callbackFn: Function) {
    // @ts-ignore
    chrome.storage.local.get(['blockedSites'], function (result) {
      const sites = result.blockedSites;
      if (sites == null || sites == undefined) callbackFn([]);
      else callbackFn(sites.split(','));
    });
  }

  matchSiteUrl(url: string) {
    if (url == this.siteUrl) return true;
    return false;
  }

  preRun() {
    this.getSavedSites((savedSites: any) => {
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
    document.body.innerHTML = this.generateHTML("YOUTUBE");
    return;
  }
}

new SiteBlocker(window.location.hostname);