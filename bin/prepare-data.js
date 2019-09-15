/* eslint-disable linebreak-style */
// !/bin/node

const shell = require('shelljs');

shell.set('-e');

config = {
  PROSE_REPO_URL: 'https://github.com/theyworkforyou/shineyoureye-prose.git',
  PROSE_DIR: 'prose',
  PROSE_COMMITISH: process.argv.slice(2),
};

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

// Make sure we're in the right directory:
// Extract the latest prose.io-generated content:
if (shell.test('-d', config.PROSE_DIR) && shell.find(config.PROSE_DIR)) {
  shell.cd(config.PROSE_DIR);
  shell.exec('git fetch origin && git reset --hard origin/gh-pages');
} else {
  shell.exec(`git clone ${config.PROSE_REPO_URL} ${config.PROSE_DIR}`);
}

// Checkout a specific prose sha for tests
if (config.PROSE_COMMITISH !== undefined && config.PROSE_COMMITISH != null && config.PROSE_COMMITISH.length) {
  if (shell.test('-d', config.PROSE_DIR)) {
    shell.cd(config.PROSE_DIR);
  } else {
    shell.cd('..');
    shell.cd(config.PROSE_DIR);
  }
  shell.exec(`git checkout ${config.PROSE_COMMITISH}`);
}

// Exit to root directory
shell.cd('..');

// Remove old symlinks from the public directory:
shell.find('public').filter(file => shell.test('-L', file)).forEach((file) => {
  shell.rm('-rf', file);
});

// Ensure that the media directory exists, since we need to symlink the
// prose-images directory into media.
shell.mkdir('-p', ['public/media']);

// Symlink the media directories into the right place:
shell.ls('-A', `${config.PROSE_DIR}/media/`).forEach((file) => {
  if (file === 'prose-images') {
    shell.ln('-sf', `../../prose/media/${file}`, `public/media/${file}`);
  } else {
    shell.ln('-sf', `../prose/media/${file}`, `public/${file}`);
  }
});
