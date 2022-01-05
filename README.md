# Quiz-application
Create a single page client application in which the user can answer, by the server given, quiz-questions. 


# Images:
To DO!!

# Documentation:

1. Add a representative image for the assignment and start with a short description of your solution:

My solution is using fetch to get the data from the server. In the Api.js file, we have the URL and the method.
This exported function will get the data from the server and return the (promised) data.
In the Index.js file, we get the fetched data and pass it to start creating the user interface.
The answers will send back to the server by using fetch but as a POST and with the specific type of header and body.
The Quiz uses Promise to set a timer (setTimeout), the time will be controlled by setInterval; the repetition of the process at a certain time interval.
The results and names will be stored in the Local Storage and will be displayed for the users.

2. Explain how a user can download and start your game:

Download the source code from GitLab, and extract the files. Moving on, by going to the terminal:

1. npm run build
2. npm start

As a result, the index.html will be launched on port 8080.

Prerequisite:
node.js and npm are already installed on your system.

3. Shortly explain the rules of the game, so the user knows how to play it:

The rules of the game are as follows:
As soon as the game has been launched, the game will prompt the user to enter a name.
Then the instructions are easy. You will be given 10 seconds to answer the question.
Some questions have multiple answers, in that case, you must click on the correct answer.
Some questions will require you to write rather than choose them.
As a result, press the button when you have answered the question to be able to answer the rest of the questions. If the player answers all the questions correctly (on time), you will win and a high score list with a victory message will be shown. Then automatically, the game will restart.
If the player answers a question wrong or the time runs out, the player will lose, and the game will finish by showing a high score list. The game will restart automatically again.

4. Explain if you are using any linters to validate the code behind the game???
   Yes, initially when I wanted to start the assignment, there were instructions after installing the snowpack. There are three linters that I have installed.
   
4.1. htmlhint: It is useful when you want to check if there are any errors in the HTML file (index.html).

4.2. stylelint: This linter is considered useful when it comes to checking the CSS file (index.css). As a result, it will help to detect errors and will result in code consistency.

4.3. eslint: Along with other linters that I have installed, eslint has helped me check my Javascript files (index.js and Api.js). It has checked and organized my code. For example, it has removed extra lines, semi-colons. As a result, it has made my implementation more consistent.

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.mjs` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.
