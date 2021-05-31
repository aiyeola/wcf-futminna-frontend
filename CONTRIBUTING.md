# Contributing to this project

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of this. Here are a few guidelines that will help you along the way.

## Your first Pull Request

Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

## Sending a Pull Request

1. Fork the repository.

2. Clone the fork to your local machine and add upstream remote:

```sh
git clone https://github.com/<your username>/wcf-futminna-frontend.git
cd wcf-futminna-frontend
git remote add upstream https://github.com/aiyeola/wcf-futminna-frontend.git
```

3. Synchronize your local `develop` branch with the upstream one:

```sh
git checkout develop
git pull upstream develop
```

4. Install the dependencies with yarn:

```sh
yarn install
```

5. Create a new branch:

```sh
git checkout -b <new branch>
```

6. Make changes, commit and push to your fork

```sh
git push -u origin HEAD
```

7. Go to [the repository](https://github.com/aiyeola/wcf-futminna-frontend.git) and make a Pull Request.
