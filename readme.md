# dataclips-cli

A tool for managing [Heroku Dataclips](https://devcenter.heroku.com/articles/dataclips) programmatically.

## Background

Dataclips are a great tool for BI and data analysis tasks on top of Heroku
Postgres, but are limited by their web-only interface. With `dataclips-cli` you
can easily manage these queries as flat files instead, enabling dataclips
updates as part of a CI workflow, tracking revision history, etc.

## Getting Started

Requires [deno](https://deno.land/) and the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli);

First, create a dataclip via [the web
interface](https://data.heroku.com/dataclips). It will have a URL similar to
`https://data.heroku.com/dataclips/vgntjcbwfakfsxhdmrmzmliwftts`.

`vgntjcbwfakfsxhdmrmzmliwftts` is the "slug" of the dataclip.

Queries should be stored as flat `.sql` files, with a little metadata at the
beginning. Here's an example.

```sql
$ cat example.sql
-- clip_slug: vgntjcbwfakfsxhdmrmzmliwftts
-- title: A Test Dataclip

select count(*) from pg_user;
```

## Usage

```
# Update some query files
$ deno run --allow-read --allow-env --allow-net https://deno.land/x/dataclips_cli/index.ts file.sql file2.sql
```

## Authentication

dataclips-cli reads your Heroku API key from `~/.netrc` (where the Heroku CLI
writes it), or uses the environment variable `HEROKU_API_KEY` if available, e.g:

```
$ HEROKU_API_KEY=mykey deno run ... etc
```

## CLI Development / Release Process

Uses [version](https://github.com/dylanpyle/version) for version management
```
$ deno run -A https://deno.land/x/version/index.ts patch
$ git push --follow-tags
```
— will be automatically deployed to https://deno.land/x/dataclips_cli

## Disclaimers

This tool was created by emulating Heroku's browser APIs. It's not officially
supported or endorsed by Heroku, and may break at any time. Community
participation in keeping it running is strongly encouraged.

## License

MIT
