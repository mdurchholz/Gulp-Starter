\*\* View this page using a [markdown editor](http://jbt.github.io/markdown-editor/).




# **Gulp Starter**

[**What is gulp?**](https://www.npmjs.com/package/gulp)

Gulp is a toolkit that helps you automate painful or time-consuming tasks in your development work flow. To summarize, gulp is a work flow tool used to compress your javascript and css files on the fly.




## Resources:

You must have the following software installed on your machine

- [Ruby](http://rubyinstaller.org/downloads/)
- [NodeJs](https://nodejs.org/en/)

(Terminal options)

- Windows: [Git Bash](https://git-scm.com/downloads)
- Mac: [iTerm2](https://www.iterm2.com/)




## Initial Setup:

This set of instructions are only if you have never ran `gulp` on you machine before.

1. Make sure **[Ruby](http://rubyinstaller.org/downloads/)** and **[NodeJs](https://nodejs.org/en/)** are installed on your machine.  
`$ ruby -v`  
`$ node -v`  
`$ npm -v`

2. Download the most up to date `/sources` directory in your project excluding the `/node_modules` directory. We will install all these using `npm` in a moment.

3. Open your terminal and navigate to your project's `/sources` directory.  
  `$ cd path/to/sources/`

4. Install all packages listed under dependencies from our sources/package.json. This whill dynamically create your `node_modules` directory.  
`$ npm install`

5. Globally install gulp and gulp-cli to use through a command prompt.  
`$ npm install gulp -g`  
`$ npm install gulp-cli -g`

--

#### `$ npm install package-name`
Run this command to manually install single packages from [www.npmjs.com](https://www.npmjs.com/).

- #### `--save-dev`
  Add this tag to save the installed package to your **devDependencies** inside your package.json file.

- #### `--save`
  The following tag will save the installed package to your **dependencies** inside your package.json file.





## Understanding your sources:

```
/sources
    /_css
        main.scss
    /_scripts
        app.js
    /node_modules
    gulpfile.js
    package.json
```

#### `/_css`
This is where you will put all of your custom made style sheets. This gulp project supports CSS and SASS files.

#### `/_scripts`
This is where you will put all of your custom made javascript files.

#### `/node_modules`
This folder contains all of your projects packages that were installed with NodeJs. Never manually edit the files or directories inside this folder since those changes will not carry over when another developer installs the packages on their local instance.

#### `gulpfile.js`
This file includes all the functionality for the **Gulp Commands** listed out at the bottom of this document and is where you can edit which files are effected by the commands.

#### [`package.json`](https://docs.npmjs.com/files/package.json)
```
{
    "name": "gulp-project",
    "version": "0.1.0",
    "author": "Tester McGee",
    "private": true,
    "devDependencies": {
        "gulp": "*"
    },
    "dependencies": {
        "jquery": "1.12.4",
	}
}

```
This is where you list all of the packages your project relies on.

#### `devDependencies`
Packages your work flow uses for development. (Gulp, BrowserSync, etc...)

#### `dependencies`
Packages your website uses as assets. (jQuery, Bootstrap, etc...)




## Gulp Commands:

Once you have your `node_modules` folder installed, you can begin to run the following commands:

- **gulp** : Runs [watch, connect]
- **gulp js** : Compresses all listed .js files into master.min.js
- **gulp css** : Compresses all listed .scss files into master.min.css
- **gulp move** : Move listed files into an assigned directory
- **gulp build** : Runs [js, css, move]
- **gulp watch** : Watches all listed files and run the assigned command from above on save
- **gulp connect** : Runs [build] and starts local server




## Notes:

>`gulp` and `gulp connect` will currently only work in a static development work flow. This is not setup to work with a wordpress theme. Since the base of a wordpress theme is normally not "index.php", it will throw an error in your localhost instance. `gulp watch` will still watch for your CSS and JS edits and update the master files.
