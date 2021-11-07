const generateSTYLES = () => {
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

const generateHTML = (pageName) => {
    return `
    <div class='par'>
      <p class ='msg'>Get back to work! 
      <br>You can use ${pageName} during your break.
      </p>
    </div>  
    `;
  };

  switch (window.location.hostname) {
    case "www.youtube.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("Youtube");
      break;
    case "www.facebook.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("Facebook");
      break;
    case "www.reddit.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("Reddit");
      break;
    case "discord.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("Discord");
      break;
    case "www.instagram.com":
      document.head.innerHTML = generateSTYLES();
      document.body.innerHTML = generateHTML("Instagram");
      break;
  }