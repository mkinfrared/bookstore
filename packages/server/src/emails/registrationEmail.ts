export default (link: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Registraion</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: sans-serif; font-size: 32px;">
    <div class="wrapper" style="box-sizing: border-box; max-width: 900px; min-width: 320px; width: 100%; margin: 0 auto; background-color: lemonchiffon; padding: 1rem;">
      <h1 style="box-sizing: border-box; font-size: 1.5em; text-align: center; margin: 1em; text-transform: uppercase;">Confirm your registration</h1>
      <p style="box-sizing: border-box; text-align: justify; line-height: 1em; font-size: 1em;">
        You requested your registration at Bookstore. To confirm your
        registration, please click the button below. If it was not you please
        ignore this email. Thank you!
      </p>
      <div class="confirm" style="box-sizing: border-box; margin: 1em; text-align: center;">
        <a href="${link}" style="box-sizing: border-box; font-size: 1.2em; display: inline-block; text-align: center; margin: 0 auto; text-decoration: none; text-transform: uppercase; background-color: darkred; color: #ffffff; padding: 1rem;">confirm</a>
      </div>
    </div>
  </body>
</html>
`;
