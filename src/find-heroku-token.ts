export default async function findHerokuToken() {
  let netrc: string;
  try {
    netrc = await Deno.readTextFile(Deno.env.get("HOME") + "/.netrc");
  } catch (err) {
    throw new Error(
      "Could not read from your ~/.netrc file. Please run `heroku login` to create a token, and check permissions on that file are correct.",
    );
  }

  const herokuKeyMatches = netrc.match(
    /api\.heroku\.com[\r\n]\s+login [^\n\r]+[\r\n]\s+password ([^\n\r]+)/,
  );

  if (!herokuKeyMatches || !herokuKeyMatches[1]) {
    throw new Error(
      "No Heroku key found in your ~/.netrc file. Please run `heroku login` to create one",
    );
  }

  return herokuKeyMatches[1];
}
