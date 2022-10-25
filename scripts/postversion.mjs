import { $ } from "zx/core";

$.verbose = false;

const { stdout } = await $`cat package.json | jq  -r .version`;

const document = JSON.stringify({ version: stdout.trim() }, null, 2);

await $`echo ${document} > ./static/meta.json`;
await $`git add . && git commit --amend --no-edit`;
