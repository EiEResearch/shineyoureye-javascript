# How to contribute

We have been making efforts to keep the code readable so that if
you want to contribute, just by reading the code everything
should make sense to you immediately.

However, we thought it would probably be helpful to write down
some of the project's tribal knowledge (every project has some)
as well as some other things that will increase the chance that
your pull request is accepted.

### Tests

Make sure the code you submit with your PR is covered by tests,
and that all the tests pass. We have Travis in place so we won't
merge a PR until Travis is green. We also use Coveralls to make
sure we have a healthy test coverage.

Tests not only help make sure that new changes don't break the
existing code. More importantly; they help you have a well
designed and structured codebase.

### Git etiquette

Mostly described in our coding standards, we would like to call
attention to some points:

* We have a
  [PR template](https://github.com/theyworkforyou/shineyoureye-sinatra/blob/master/.github/PULL_REQUEST_TEMPLATE.md)!
  :smiley:

  * Small PRs are easier to review, and are more likely to be
  merged fast. Sometimes we do "cleaning" PRs before the real
  PR, to fix the code first for the change we want to
  do. "[*Make the change easy, then make the easy change*](https://twitter.com/kentbeck/status/250733358307500032?lang=en)".

* [Commits should have a single responsibility. The description should use verbs in imperative tense and explain the "why"](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

* When you finish your PR, remember to check if the README needs
  updating after your change.

* Finally, be sure that every single commit passes the tests in
  isolation (an example of when this could be useful is if you
  need to do `git bisect` at some point). You can check that
  every commit passes the tests using:

```
git rebase -i --exec 'npm run test' master
```

The rebase will stop if tests fail.