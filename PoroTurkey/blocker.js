const generateSTYLES = () => {
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

const generateHTML = (pageName) => {
    return `
    <div class='par'>
      <h1 class ='msg'>GET OFF OF ${pageName} AND BACK TO WORK</h1>
    </div>  
    `;
  };

  switch (window.location.hostname) {
    case "www.t.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("YOUTUBE");
      break;
    case "www.facebook.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("FACEBOOK");
      break;
    case "www.reddit.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("REDDIT");
      break;
    case "discord.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("DISCORD");
      break;
    case "www.spotify.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("SPOTIFY");
      break;
  }